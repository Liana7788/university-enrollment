import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/http-error";
import { fail } from "../utils/api-response";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json(fail(err.message, err.code, err.details));
  }

  // Prisma errors (generic)
  if (err && typeof err === "object" && typeof err.code === "string") {
    if (err.code === "P2002") {
      return res.status(409).json(fail("Unique constraint violation", "CONFLICT", err.meta));
    }
    if (err.code === "P2025") {
      return res.status(404).json(fail("Record not found", "NOT_FOUND"));
    }
  }

  console.error(err);
  return res.status(500).json(fail("Internal Server Error", "INTERNAL_SERVER_ERROR"));
}