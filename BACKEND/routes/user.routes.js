import express from "express";
import {
  login,
  signup,
  logout,
  allUsers,
} from "../controllers/user.controllers.js";
import secureRoute from "../middlewares/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile",secureRoute, allUsers);


export default router;
