import { Request, Response, NextFunction } from "express";

const verifyApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers["x-api-key"] as string | undefined;

  if (!apiKey || apiKey !== process.env.AUTH_API_KEY) {
    res.status(401).json({ error: "Not authorized to access this route" });
    return;
  }

  next();
};

export { verifyApiKey };
