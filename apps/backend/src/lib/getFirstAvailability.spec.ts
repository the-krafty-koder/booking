import getFirstAvailability, {
  getAvailabilityAfterTimeOfDay,
} from './getFirstAvailability';
import * as helpers from '../controllers/helpers';

jest.mock('../controllers/helpers');
describe('getFirstAvailability', () => {
  jest.spyOn(helpers, 'getSchedule').mockImplementation(() =>
    Promise.resolve([
      {
        id: 1,
        day: 'Monday',
        start: '09:30',
        end: '20:00',
      },
      {
        id: 1,
        day: 'Tuesday',
        start: '09:30',
        end: '20:00',
      },
    ])
  );

  jest.spyOn(helpers, 'getAppointments').mockImplementation((day) => {
    switch (day) {
      case '2025-01-13T00:00:00.000Z':
        return Promise.resolve([
          {
            id: 1,
            date: '2025-01-13',
            start: '12:00:00',
            end: '16:00:00',
          },
        ]);
      case '2025-01-14T00:00:00.000Z':
        return Promise.resolve([
          {
            id: 2,
            date: '2025-01-14',
            start: '09:00:00',
            end: '11:00:00',
          },
          {
            id: 3,
            date: '2025-01-14',
            start: '18:00:00',
            end: '20:00:00',
          },
        ]);
      default:
        return Promise.resolve([]);
    }
  });

  it('returns next availability when given list of availabilities', () => {
    const nearest = getAvailabilityAfterTimeOfDay('10:30', [
      { startAt: '09:30', endAt: '12:00' },
      { startAt: '16:00', endAt: '20:00' },
    ]);

    expect(nearest).toStrictEqual({
      startAt: '16:00',
      endAt: '20:00',
    });
  });

  it('returns first availability in same day when given a date within schedule', async () => {
    const date = new Date('2025-01-13T10:30:00.000Z');

    const availability = await getFirstAvailability(date.toISOString());

    expect(availability).toStrictEqual({
      date: '2025-01-13T10:30:00.000Z',
      availability: { startAt: '16:00:00', endAt: '20:00' },
    });
  });

  it('returns first availability in next day when given date past schedule', async () => {
    const date = new Date('2025-01-13T20:30:00.000Z');

    const availability = await getFirstAvailability(date.toISOString());

    expect(availability).toStrictEqual({
      date: '2025-01-14T00:00:00.000Z',
      availability: { startAt: '11:00:00', endAt: '18:00:00' },
    });
  });

  it('returns first availability after schedule is passed', async () => {
    const date = new Date('2025-01-16T20:30:00.000Z');

    const availability = await getFirstAvailability(date.toISOString());

    expect(availability).toStrictEqual({
      date: '2025-01-20T00:00:00.000Z',
      availability: { startAt: '09:30', endAt: '20:00' },
    });
  });
});
