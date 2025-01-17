import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const dateRangeSchema = z.object({
  from: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message:
      "Invalid 'from' date format. Must be an ISO 8601 date '2025-01-14T00:00:00.000Z'.",
  }),
  to: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message:
      "Invalid 'to' date format. Must be an ISO 8601 date eg '2025-01-14T00:00:00.000Z'",
  }),
});

export const validateDateRangeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    dateRangeSchema.parse(req.query);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
};

export default validateDateRangeMiddleware;
