import { Request, Response } from 'express';
import getDb from '../db/getDb';
import { schedule } from '../db/schema';

const createSchedule = async (req: Request, res: Response) => {
  const db = getDb(process.env.DATABASE_URL);

  const { day, start, end } = req.body;

  if (!day || !start || !end) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: day, start, end' });
  }

  try {
    const createdSchedule = await db
      .insert(schedule)
      .values({ day, start, end })
      .returning();
    res.status(201).json(createdSchedule);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default createSchedule;
