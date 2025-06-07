// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import scheduleRoutes from "./routes/scheduleRoutes.js"; // Import rute jadwal
import swaggerUi from "swagger-ui-express"; // Jika Anda memutuskan untuk menggunakan Swagger UI
import swaggerDocument from "./swagger/swagger-output.json" assert { type: "json" }; // Spesifikasi Swagger Anda

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute API Anda
app.use("/api/users", userRoutes); // Rute user seperti register, login
app.use("/api/schedules", scheduleRoutes); // Rute untuk manajemen jadwal

// Jika Anda menggunakan Swagger UI:
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route dasar (opsional)
app.get("/", (req, res) => {
  res.send("Welcome to the Daily Schedule API!");
});

// Middleware penanganan error global (opsional tapi direkomendasikan)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Penulisan Salah!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
