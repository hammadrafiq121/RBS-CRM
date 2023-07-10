import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./database/dbConfig.js";
import customerRoutes from "./routes/customerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const PORT = process.env.PORT;
const user = process.env.DATABASE_USERNAME;
const pass = process.env.DATABASE_PASSWORD;
Connection(user, pass);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// User Routes
app.use("/", userRoutes);
// Customer Routes
app.use("/", customerRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
