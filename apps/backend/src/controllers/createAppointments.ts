import getDb from '../db/getDb';
import { appointments } from '../db/schema';

const createAppointment = async (req, res) => {
  const db = getDb(process.env.DATABASE_URL);
  const { date, start, end } = req.body;

  if (!date || !start || !end) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: date, start, end' });
  }

  try {
    const appointment = await db
      .insert(appointments)
      .values({ date: date, start, end })
      .returning();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default createAppointment;
