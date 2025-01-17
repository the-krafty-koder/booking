import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const dateSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message:
      "Invalid 'date' date format. Must be an ISO 8601 date, eg '2025-01-14T00:00:00.000Z'.",
  }),
});

export const validateDateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    dateSchema.parse(req.query);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
};

export default validateDateMiddleware;
