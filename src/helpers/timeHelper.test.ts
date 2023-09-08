import { getCurrentDayTimestamp, getMonthFromDate, getYearFromDate } from './timeHelper';

describe('time helper tests', () => {
  describe('getCurrentDayTimestamp', () => {
    test('default', () => {
      const currentDay = getCurrentDayTimestamp();
      const currentDate = new Date(currentDay);
      expect(currentDate.getUTCMilliseconds()).toEqual(0);
      expect(currentDate.getUTCSeconds()).toEqual(0);
      expect(currentDate.getUTCMinutes()).toEqual(0);
      expect(currentDate.getUTCHours()).toEqual(0);
      expect(currentDate.getUTCDay()).toBeGreaterThanOrEqual(0);
      expect(currentDate.getUTCMonth()).toBeGreaterThanOrEqual(0);
      expect(currentDate.getUTCFullYear()).toBeGreaterThanOrEqual(0);
    });
  });
  describe('getYearFromDate', () => {
    test('valid date', () => {
      const givenDate = new Date('Janurary 1, 2022 00:00:00');
      const year = getYearFromDate(givenDate.getTime());
      expect(year).toEqual(2022);
    });
    test('invalid value - returns default fallback', () => {
      const year = getYearFromDate(parseInt('not a number'));
      expect(year).toEqual(0);
    });
    test('invalid value - returns specific fallback', () => {
      const year = getYearFromDate(parseInt('not a number'), 2000);
      expect(year).toEqual(2000);
    });
  });
  describe('getMonthFromDate', () => {
    test('valid date', () => {
      const givenDate = new Date('Janurary 1, 2022 00:00:00');
      const month = getMonthFromDate(givenDate.getTime());
      expect(month).toEqual(0);
    });
    test('invalid value - returns default fallback', () => {
      const year = getMonthFromDate(parseInt('not a number'));
      expect(year).toEqual(0);
    });
    test('invalid value - returns specific fallback', () => {
      const year = getMonthFromDate(parseInt('not a number'), 6);
      expect(year).toEqual(6);
    });
  });
});