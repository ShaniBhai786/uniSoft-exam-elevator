import express from "express"
import cors from "cors"
import login from "./routes/institute.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const PORT = process.env.port || 3000

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static("public"))

// import routes 

import instituteRouter from "./routes/institute.routes.js"
 
app.use("/api/v1/institute", instituteRouter)
app.use("/api/v1/auth", login)
    connectDB()
    
import userRouter from "./routes/user.routes.js"

app.use("/api/v2/institutes", userRouter) 

    app.listen(PORT, () => {
    console.log(`server is listening on the port ${PORT}`)
})