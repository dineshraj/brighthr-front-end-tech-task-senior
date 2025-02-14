import calculateEndDate from '../../src/helpers/calculateEndDate';

describe('calculateEndDate', () => {
  it.only('returns the correct end date', () => {
    const startDate = '2022-05-28T04:39:06.470Z';
    const days = 9;
    const expectedEndDate = '2022-06-06T04:39:06.470Z';
    const calculatedEndDate = calculateEndDate(startDate, days);

    expect(calculatedEndDate.toISOString()).toBe(expectedEndDate);
  });
});