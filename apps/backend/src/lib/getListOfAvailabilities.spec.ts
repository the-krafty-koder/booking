import {
  getDailyAvailability,
  getAvailabilitiesWithinRange,
  listDaysInRange,
} from './getListOfAvailabilities';
import * as helpers from '../controllers/helpers';

jest.mock('../controllers/helpers');

describe('getListOfAvailabilities', () => {
  it('lists days in a given range', () => {
    const start = '2025-01-01';
    const end = '2025-01-05';

    const daysInRange = listDaysInRange(start, end);
    expect(daysInRange).toEqual([
      '2025-01-01T00:00:00.000Z',
      '2025-01-02T00:00:00.000Z',
      '2025-01-03T00:00:00.000Z',
      '2025-01-04T00:00:00.000Z',
      '2025-01-05T00:00:00.000Z',
    ]);
  });

  it('correctly returns list of daily availabilities', () => {
    const dailyAvailability = getDailyAvailability(
      '2025-01-16T00:00:00.000Z',
      { day: 'Thursday', start: '09:30', end: '20:00' },
      [{ date: '2025-01-16T00:00:00.000Z', start: '12:00', end: '16:00' }]
    );
    expect(dailyAvailability).toEqual({
      date: '2025-01-16T00:00:00.000Z',
      availabilities: [
        { startAt: '09:30', endAt: '12:00' },
        { startAt: '16:00', endAt: '20:00' },
      ],
    });
  });

  it('correctly returns list of availabilities within range', async () => {
    jest.spyOn(helpers, 'getAppointments').mockImplementationOnce(() =>
      Promise.resolve([
        {
          date: '2025-01-13T00:00:00.000Z',
          start: '12:00',
          end: '16:00',
          id: 1,
        },
      ])
    );

    const availabilities = await getAvailabilitiesWithinRange(
      ['2025-01-13T00:00:00.000Z', '2025-01-14T00:00:00.000Z'],
      [{ day: 'Monday', start: '09:30', end: '20:00' }]
    );
    expect(availabilities).toStrictEqual([
      {
        date: '2025-01-13T00:00:00.000Z',
        availabilities: [
          { startAt: '09:30', endAt: '12:00' },
          { startAt: '16:00', endAt: '20:00' },
        ],
      },
    ]);
  });
});
