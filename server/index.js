import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import imagenRoutes from "./routes/imagenRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imagen", imagenRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server is running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
