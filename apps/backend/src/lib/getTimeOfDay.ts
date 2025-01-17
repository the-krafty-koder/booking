const getTimeOfDayFromISO = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Format the time to always have two digits for hours and minutes
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  return formattedTime;
};

export default getTimeOfDayFromISO;
