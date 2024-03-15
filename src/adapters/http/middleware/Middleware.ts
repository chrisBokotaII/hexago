import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class Middleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //@ts-expect-error
    req["currentUser"] = decoded;

    next();
  }
  static async errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
