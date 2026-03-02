import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    FullName: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    institute: {
        type: String,
        required: true,
        trim: true
    },
    userStatus: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            FullName: this.FullName,
            email: this.email,
            contact: this.contact,
            userStatus: this.userStatus,
            dob: this.dob
        },
        process.env.ACCESS_TOKEN_SCRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SCRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema)