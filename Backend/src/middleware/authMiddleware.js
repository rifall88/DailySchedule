import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message: "Akses ditolak: Token tidak ditemukan atau format salah.",
        });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token tidak valid." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token kadaluarsa." });
    }
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat autentikasi." });
  }
};
