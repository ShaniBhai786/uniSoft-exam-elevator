import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    institute: {
        type: mongoose.Types.ObjectId,
        ref: "Institute",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    feeStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: true,
    },
    month: {
        type: String,
        required: true,
    }
},{timesestamps: true})

export const Fee = mongoose.model("Fee", feeSchema)