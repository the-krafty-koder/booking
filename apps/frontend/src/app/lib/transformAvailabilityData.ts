import { DailyAvailabilities } from '../types';

const transformAvailabilitiesData = (
  weekAvailabilities: DailyAvailabilities[]
) => {
  let result = {};

  weekAvailabilities.map((day) => {
    const dayData = day.availabilities.map((availability) => {
      const regex = /T(\d{2}):(\d{2}):\d{2}/;
      const [, hourStart, minuteStart] = availability.date.match(regex)!;
      const [, hourEnd, minuteEnd] = availability.endDate.match(regex)!;

      return `${hourStart}.${minuteStart}-${hourEnd}.${minuteEnd}`;
    });

    const dayDate = new Date(day.date);

    const dayNumber = dayDate.getDate();
    const month = dayDate.toLocaleDateString('en-US', { month: 'short' });
    const weekday = dayDate.toLocaleDateString('en-US', { weekday: 'short' });

    result = Object.assign(result, {
      [`${weekday} ${month} ${dayNumber}`]: dayData,
    });
  });
  return result;
};

export default transformAvailabilitiesData;
