import express from "express";
import { register, login } from "../controllers/userController.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/uservalidator.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);



export default router;
