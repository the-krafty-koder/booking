import getTimeOfDayFromISO from './getTimeOfDay';

describe('getTimeOfDay', () => {
  it('check if time of day is correctly returned ', () => {
    const timeOfDay = getTimeOfDayFromISO('2025-01-16T20:30:00.000Z');
    expect(timeOfDay).toBe('20:30');
  });
});
