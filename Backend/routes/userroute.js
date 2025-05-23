import express from "express";
const router = express.Router();
import { register, login } from "../controllers/usercontroller.js";
import autmiddleware from "../middlewares/authmiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.get("/protected", autmiddleware, (req, res) => {
  res.json({ message: "This Private Data", user: req.user });
});

export default router;
