import asynchandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../modals/users.modals.js"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { Institute } from "../modals/institute.modals.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
  
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false})
  
    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, "Internal Server Error While Generating Tokens", error)
  }
}
const registerUser = asynchandler(async (req, res) => {
    const { username, password, email, FullName, dob, contact, userStatus, institute } = req.body;
    if ([username, password, email, FullName, dob, contact, userStatus, institute].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{username, email}]
    })
    if (existingUser) {
        throw new ApiError(401, "User with this email or username is already exist")
    }

    const localFilePath = await req.files?.avatar?.[0]?.path;
    if (!localFilePath) {
        throw new ApiError(402, "Avatar is required")
    }

    const cloudinaryUpload = await uploadOnCloudinary(localFilePath)
    if (!cloudinaryUpload) {
        throw new ApiError(402, "Cloudinary upload failed!")
    }

    const user = await User.create(
        {
            username, 
            password, 
            email, 
            FullName, 
            dob, 
            contact, 
            userStatus, 
            institute, 
            avatar: cloudinaryUpload.url
        }
    )

    const userCreated = await User.findById(user._id).select("-password -refreshToken")
    if (!userCreated) {
        throw new ApiError(500, "Error creating user!!") 
    }
    res.send(new ApiResponse(200, "user Registered Sucessfully"))
})

const userLogin = asynchandler( async (req, res) => {
  const {email, password, username} = req.body

  const user = await User.findOne({
    $or: [{username, email}]
  })
  if (!user) {
    throw new ApiError(404, "user with this username or email does not exist")
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Credentials !!!")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  if (!loggedInUser) {
    throw new ApiError(403, "ERROR Something Went Wrong! Server Not Connected")
  }

  const options = {
    httpOnly: true,
    secure: true
  }

  res.status(200)
  .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "User logged in successfully", {
            institute: loggedInUser, accessToken, refreshToken
        }) 
    )
})

const getUsers = asynchandler(async (req, res) => {
  const institute = await Institute.find().select("-password -refreshToken");
  res.status(200).json(
    new ApiResponse(200, "users list", institute)
  );
})

export{registerUser, userLogin, getUsers}