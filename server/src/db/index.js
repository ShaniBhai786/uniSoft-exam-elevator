import mongoose from "mongoose"
import { db_name } from "../constants/constant.js"
import dotenv from "dotenv"

dotenv.config()
export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)    
        if (connectionInstance) {
            console.log(connectionInstance.connection.host)
            console.log("MongoDB connected !!!")
        }    
    } catch (error) {
        console.log("mongoDB connection error", error)
    }
} 