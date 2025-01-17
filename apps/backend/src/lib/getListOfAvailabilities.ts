import type { Schedule, Appointment } from '../types';
import { getAppointments, getSchedule } from '../controllers/helpers';

export const listDaysInRange = (
  startDate: string,
  endDate: string
): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days: string[] = [];
  const current = new Date(start);

  while (current <= end) {
    days.push(current.toISOString());
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const getDailyAvailability = (
  dateStr: string,
  schedule: Schedule,
  appointments: Appointment[]
) => {
  const availabilities = [];

  if (appointments.length === 0) {
    availabilities.push({
      startAt: schedule.start,
      endAt: schedule.end,
    });
  }

  //availability before start of appointments
  const firstAppointment = appointments[0] || null;
  const lastAppointment = appointments[appointments.length - 1] || null;

  if (firstAppointment && firstAppointment.start > schedule.start) {
    availabilities.push({
      startAt: schedule.start,
      endAt: firstAppointment.start,
    });
  }
  // find availabilities in between appointments
  appointments.map((appointment, index) => {
    if (index + 1 !== appointments.length) {
      availabilities.push({
        startAt: appointment.end,
        endAt: appointments[index + 1].start,
      });
    }
  });
  //availability at end of appointments
  if (lastAppointment && lastAppointment.end < schedule.end) {
    availabilities.push({
      startAt: lastAppointment.end,
      endAt: schedule.end,
    });
  }

  return { date: dateStr, availabilities };
};

export const getAvailabilitiesWithinRange = async (
  dates: string[],
  schedule: Schedule[]
) => {
  const result = [];
  for (const dateStr of dates) {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfWeekSchedule = schedule.find((sch) => sch.day === dayOfWeek);

    if (dayOfWeekSchedule) {
      const appointments = await getAppointments(dateStr);
      const dailyAvailability = getDailyAvailability(
        dateStr,
        dayOfWeekSchedule,
        appointments
      );

      result.push(dailyAvailability);
    }
  }
  return result;
};

const getListOfAvailabilities = async (from: string, to: string) => {
  const daysInRange = listDaysInRange(from, to);
  const schedule = await getSchedule();

  const availabilities = await getAvailabilitiesWithinRange(
    daysInRange,
    schedule
  );
  return availabilities;
};

export default getListOfAvailabilities;
