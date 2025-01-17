import getNextDay, { getDayStringFromMidnight } from './getNextDay';
import getTimeOfDayFromISO from './getTimeOfDay';
import { getDailyAvailability } from './getListOfAvailabilities';
import { getAppointments, getSchedule } from '../controllers/helpers';

export const getAvailabilityAfterTimeOfDay = (
  time: string,
  availabilities: { startAt: string; endAt: string }[]
) => {
  const firstAvailability = availabilities[0];
  if (firstAvailability && firstAvailability.startAt >= time)
    return firstAvailability;

  const nearestAvailability = availabilities.find((availability, index) => {
    if (availability.endAt > time && availability.startAt < time) {
      return (
        availabilities[index + 1] && availabilities[index + 1].startAt > time
      );
    }
  });

  const nextAvailability = nearestAvailability
    ? availabilities[availabilities.indexOf(nearestAvailability) + 1]
    : null;

  return nextAvailability;
};

const getFirstAvailability = async (dateStr: string) => {
  const schedule = await getSchedule();

  let date = new Date(dateStr);
  let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  let iterationCount = 0;
  const maxIterations = 7; // max no. of days to check for availability(a week)

  // loop through a week max to find next availability
  while (iterationCount < maxIterations) {
    const midnightDayString = getDayStringFromMidnight(date.toISOString());
    const appointments = await getAppointments(midnightDayString);
    const dayOfWeekSchedule = schedule.find((sch) => sch.day === dayOfWeek);

    if (dayOfWeekSchedule) {
      // if timeOfDay is within schedule for first day,
      // set it as is else if next day set to beginning of schedule
      const timeOfDay =
        iterationCount > 0
          ? dayOfWeekSchedule.start
          : getTimeOfDayFromISO(dateStr);

      if (timeOfDay > dayOfWeekSchedule.end) {
        iterationCount++;
        const [nextDayDate, nextDayOfWeek] = getNextDay(date);
        date = nextDayDate;
        dayOfWeek = nextDayOfWeek;
        continue;
      }
      const result = getDailyAvailability(
        date.toISOString(),
        dayOfWeekSchedule,
        appointments
      );

      return {
        date: date.toISOString(),
        availability: getAvailabilityAfterTimeOfDay(
          timeOfDay,
          result.availabilities
        ),
      };
    }

    iterationCount++;

    const [nextDayDate, nextDayOfWeek] = getNextDay(date);
    date = nextDayDate;
    dayOfWeek = nextDayOfWeek;
  }

  return {};
};

export default getFirstAvailability;
