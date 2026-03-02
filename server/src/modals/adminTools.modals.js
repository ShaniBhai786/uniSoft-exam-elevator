import mongoose from "mongoose";

const adminToolsSchema = new mongoose.Schema({
    feeStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: true
    },
    studentFee: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    user: {
        type: String,
        enum: ["student", "teacher"],
        // required: true,
    }
},{timestamps: true})

export const adminTools = mongoose.model("adminTools", adminToolsSchema)