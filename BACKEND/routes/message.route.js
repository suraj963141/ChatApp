import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;
