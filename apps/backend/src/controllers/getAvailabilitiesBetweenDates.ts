import { Request, Response } from 'express';
import getListOfAvailabilities from '../lib/getListOfAvailabilities';

const getAvailabilitiesBetweenDates = async (req: Request, res: Response) => {
  const { from = null, to = null } = req.query;

  if (!from || !to) {
    return res
      .status(400)
      .json({ error: "'from' and 'to' dates are required" });
  }

  const availabilities = await getListOfAvailabilities(
    from as string,
    to as string
  );
  return res.json(availabilities);
};

export default getAvailabilitiesBetweenDates;
