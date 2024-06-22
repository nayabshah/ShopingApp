import express from "express";
import productRouter from "./routes/productRoute.js";
import path from "path";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDb();

app.use(express.json());
const __dirname = path.resolve();
app.use("/api/v1/product", productRouter);
console.log(__dirname);
// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set NODE_ENV to production"));
}

app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
