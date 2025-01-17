import { eq } from 'drizzle-orm';
import getDb from '../db/getDb';
import { appointments, schedule } from '../db/schema';

export const getSchedule = async () => {
  const db = getDb(process.env.DATABASE_URL);
  return await db.select().from(schedule);
};

export const getAppointments = async (appointmentDate: string) => {
  const db = getDb(process.env.DATABASE_URL);
  const specificAppointments = await db
    .select()
    .from(appointments)
    .where(eq(appointments.date, appointmentDate));
  return specificAppointments;
};
