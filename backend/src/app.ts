import cors from "cors";
import express, { Request, Response } from "express";
import { errorHandler, urlNotFound } from "./middleware/errorHandler";

// Routes
import uploadRoutes from "./routes/upload.route";
import path from "path";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(cors({ origin: "*" }));

app.use(
  "/outputs",
  express.static(path.join(__dirname, "..", "public", "outputs"))
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome" });
});

// App routes
app.use("/api/v1", uploadRoutes);

// Error handling middleware
app.use(errorHandler);
app.use(urlNotFound);

export default app;
