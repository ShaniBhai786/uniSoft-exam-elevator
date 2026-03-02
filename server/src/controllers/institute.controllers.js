import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js" 
import {Institute} from "../modals/institute.modals.js"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js"

const generateAccessAndRefreshToken = async (instituteId) => {
    try { 
        const institute = await Institute.findById(instituteId)
        const accessToken = institute.generateAccessToken()
        const refreshToken = institute.generateRefreshToken()

        institute.refreshToken = refreshToken
        await institute.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Error generating tokens")
    }
}

const registerInstitute = asyncHandler(async (req, res) => {
    const {name, email, password, contact, address, about, masterUser, userRole } = req.body;
    if ([name, email, password, contact, address, about, masterUser, userRole].some((field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are mandatory !!!")
    }

    const existingInstitute = await Institute.findOne({
        $or: [{name},{email}]
    })
    if (existingInstitute) {
        throw new ApiError(401, "Institute Already Registered")
    }

    const localFilePath = req.files?.profile[0]?.path;
    if (!localFilePath) {
        throw new ApiError(400, "Profile is mandatory !!!")
    }

    const cloudinaryUpload = await uploadOnCloudinary(localFilePath)
    if (!cloudinaryUpload) {
        throw new ApiError(403, "Error uploading file on Cloudinary")
    }

    const institute = await Institute.create({
        name,
        email,
        password,
        contact,
        profile: cloudinaryUpload.url,
        address,
        about,
        masterUser,
        userRole,
    })

    const newInstitute = await Institute.findById(institute._id).select("-password -refreshToken")
    if (!newInstitute) {
        throw new ApiError(500, "Error Registering institute Server Error")
    }

    return res.status(201).json(
        new ApiResponse(200, "Institute Registered Successfully", newInstitute)
    )
})

const login = asyncHandler(async (req, res) => {
    const {email, password, name} = req.body;

    if ([email, password, name].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required !!!")
    }

    const institute = await Institute.findOne({
        $or: [{email}, {name}]
    })
    if (!institute) {
        throw new ApiError(404, "Institute not found")
    }

    const isPasswordMatched = await institute.isPasswordCorrect(password)
    if (!isPasswordMatched) {
        throw new ApiError(401, "Invalid Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(institute._id)

    const loggedInInstitute = await Institute.findById(institute._id).select("-password -refreshToken")
    if (!loggedInInstitute) {
        throw new ApiError(500, "Error logging in institute Server Error")
    }

    const options = {
        httpOnly: true,
        secure: false,
    }
    
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "Institute logged in successfully", {
            institute: loggedInInstitute, accessToken, refreshToken
        })
    )
})

const logout = asyncHandler(async (req, res) => {
    await Institute.findByIdAndUpdate(
        req.institute._id,
        {
            $set: {refreshToken: null},
        },
        {new: true, runValidators: false}
    )
   
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, "Institute logged out successfully")
    )
})

export {registerInstitute, login, logout}