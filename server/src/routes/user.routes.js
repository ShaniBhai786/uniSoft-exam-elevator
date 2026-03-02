import { Router } from "express";
import { getUsers, registerUser, userLogin } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields(
        [
            {
                name: "avatar", maxCount: 1 
            }
        ]
    ),
    registerUser
)
 router.route("/login").post(userLogin)
 router.route("/get-institutes").get(getUsers)
export default router