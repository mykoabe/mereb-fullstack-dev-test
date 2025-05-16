import { Request, Response, NextFunction } from "express";
const tryCatchHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export default tryCatchHandler;
