import { v2 as cloudinary} from "cloudinary"
import fs from "fs"
import ApiError from "../utils/ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        throw new ApiError("File Path is required")
    }
    if (!fs.existsSync(localFilePath)) {
        throw new ApiError("File not found on server")
    }
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        fs.unlinkSync(localFilePath); // Remove file from server after upload
        console.log("file is uploaded on cloudinary", response.url)
        return response;
    } catch (error) {
        throw new ApiError(error.message || "Cloudinary upload failed");
    }
} 

export { uploadOnCloudinary }