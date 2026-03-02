import { Router } from "express"
import { login, logout, registerInstitute } from "../controllers/institute.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { Institute } from "../modals/institute.modals.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "profile", maxCount: 1 
        }
    ]), 
    registerInstitute
) 

router.route("/login").post(login)
router.route("/logout").post(verifyJWT ,logout)

router.get("/data", async (req, res) => {
  try {
    const institutes = await Institute.find().select("-password -refreshToken");
    res.status(200).json({
      success: true,
      data: institutes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export default router