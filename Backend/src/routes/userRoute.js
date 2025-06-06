import express from "express";
import { register, login } from "../controllers/userController.js";
import { validateRegister, validateLogin } from "../validators/userValidator.js";
// import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Contoh rute yang dilindungi (jika ada rute user yang hanya bisa diakses oleh user yang login)
// router.get("/profile", authenticate, (req, res) => {
//   // req.user akan berisi payload token yang sudah didecode (id, email)
//   res.json({
//     message: `Halo, ${req.user.email}! Ini adalah profil Anda.`,
//     userId: req.user.id,
//   });
// });

export default router;