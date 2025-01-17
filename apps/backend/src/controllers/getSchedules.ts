import { Request, Response } from 'express';
import getDb from '../db/getDb';
import { schedule } from '../db/schema';

const getAllSchedules = async (req: Request, res: Response) => {
  const db = getDb(process.env.DATABASE_URL);
  const allSchedules = await db.select().from(schedule);
  return res.json(allSchedules);
};

export default getAllSchedules;
