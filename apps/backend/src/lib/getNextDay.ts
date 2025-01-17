const getNextDay = (date: Date): [Date, string] => {
  const nextDate = new Date(date);
  nextDate.setDate(date.getUTCDate() + 1);
  nextDate.setUTCHours(0, 0, 0, 0);

  const dayOfWeek = nextDate.toLocaleDateString('en-US', { weekday: 'long' });

  return [nextDate as Date, dayOfWeek as string];
};

export const getDayStringFromMidnight = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setUTCHours(0, 0, 0, 0);

  return date.toISOString();
};

export default getNextDay;
