import express from "express";
import { authToken } from "../middlewares/auth.js";
import { paymentGateway } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout-payment", authToken, paymentGateway);

export default router;