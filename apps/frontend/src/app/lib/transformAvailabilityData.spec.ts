import transformAvailabilitiesData from './transformAvailabilityData';

describe('transformAvailabilitiesData', () => {
  const weekAvailabilities = [
    {
      date: '2025-01-14T23:00:00.000Z',
      availabilities: [
        {
          date: '2025-01-15T08:00:00.000Z',
          endDate: '2025-01-15T08:30:00.000Z',
          calendarIds: ['61379ba159d4940022b6c928'],
          organizationId: '61379ba159d4940022b6c921',
        },
      ],
    },
    {
      date: '2025-01-15T23:00:00.000Z',
      availabilities: [
        {
          date: '2025-01-16T09:00:00.000Z',
          endDate: '2025-01-16T09:30:00.000Z',
          calendarIds: ['61379ba159d4940022b6c928'],
          organizationId: '61379ba159d4940022b6c921',
        },
      ],
    },
  ];

  it('tests if transformAvailabilitiesData returns availabilities object ', () => {
    const transformedData = transformAvailabilitiesData(weekAvailabilities);
    expect(transformedData).toStrictEqual({
      'Wed Jan 15': ['08.00-08.30'],
      'Thu Jan 16': ['09.00-09.30'],
    });
  });
});
