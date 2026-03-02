import asynchandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
// import {User} from "../modals/users.modals.js"
import ApiError from "../utils/ApiError.js";
import { Institute } from "../modals/institute.modals.js";

export const verifyJWT = asynchandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Un-authorized Request") 
        } 
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SCRET)
        const institute = await Institute.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!institute) {
            throw new ApiError(401, "Invalid AccessToken")
        }
        
        req.institute = institute;
        next() 
    } catch (error) {
        throw new ApiError(401, error?.message || "Something Went wrong while logging out")
    }
})