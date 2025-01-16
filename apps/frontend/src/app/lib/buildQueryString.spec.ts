import buildQueryString from './buildQueryString';

describe('buildQueryString', () => {
  it('test if function returns correct string', () => {
    const url = buildQueryString(
      'https://staging-api.rosa.be/api/patient-booking/availabilities',
      {
        key: 'antoine-staging-pairet',
        entityType: 'hp',
        date: new Date('2024-12-31T21:00:00.000Z').toISOString(),
        site: '61379ba159d4940022b6c926',
        motive: '61eea367ddf6c500149ae2cc',
        skip_initial_empty_days: true,
        'is-new-patient': true,
      }
    );
    expect(url.toString()).toEqual(
      'https://staging-api.rosa.be/api/patient-booking/availabilities?key=antoine-staging-pairet&entityType=hp&date=2024-12-31T21%3A00%3A00.000Z&site=61379ba159d4940022b6c926&motive=61eea367ddf6c500149ae2cc&skip_initial_empty_days=true&is-new-patient=true'
    );
  });
});
