import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const instituteModal = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true, 
    },
    contact: {
        type: Number,
        required: true,
    },
    profile:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    about: {
        type: String,
        required: true,
    },
    masterUser: {
        type: String,
        required: true,
    },
    userRole:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true})


instituteModal.pre("save", async function(next){
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
    next() 
})

instituteModal.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

instituteModal.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            address: this.address,
            contact: this.contact,
            masterUser: this.masterUser,
            profile: this.profile,
            about: this.about,
            userRole: this.userRole,
        },
        process.env.ACCESS_TOKEN_SCRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
instituteModal.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SCRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        }
    )
}

export const Institute = mongoose.model("Institute", instituteModal)