import { Request, Response } from 'express';
import getDb from '../db/getDb';
import { appointments } from '../db/schema';

const getAllAppointments = async (req: Request, res: Response) => {
  const db = getDb(process.env.DATABASE_URL);
  const allAppointments = await db.select().from(appointments);
  return res.json(allAppointments);
};

export default getAllAppointments;
