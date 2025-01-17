import { Request, Response } from 'express';
import getFirstAvailability from '../lib/getFirstAvailability';

const getFirstAvailabilityAfterDate = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'date parameter is required' });
  }

  const availability = await getFirstAvailability(date as string);

  return res.json(availability);
};

export default getFirstAvailabilityAfterDate;
