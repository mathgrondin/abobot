import { asyncSafetyWrap, safetyWrap } from './safetyWrap';

describe('safetyWrap', () => {
  describe('asyncSafetyWrap', () => {
    test('valid callback', () => {
      const callback = () => true;
      const result = safetyWrap(callback);
      expect(result).toBe(true);
    });
    test('callback raising an exception', () => {
      const callback = () => {
        throw new Error('Error');
      };
      const result = safetyWrap(callback);
      expect(result).toBe(undefined);
    });
    test('callback raising an exception returns fallback value', () => {
      const callback = () => {
        throw new Error('Error');
      };
      const fallback = 'I\'m the backup';
      const result = safetyWrap(callback, fallback);
      expect(result).toEqual(fallback);
    });
  });
  describe('asyncSafetyWrap', () => {
    test('valid callback', async () => {
      const callback = async () => Promise.resolve().then(() => true);
      const result = await asyncSafetyWrap(callback);
      expect(result).toBe(true);
    });
    test('callback raising an exception', async () => {
      const callback = () => Promise.resolve().then(() => {
        throw new Error('Error');
      });
      const result = await asyncSafetyWrap(callback);
      expect(result).toBe(undefined);
    });
    test('callback raising an exception returns fallback value', async () => {
      const callback = () => Promise.resolve().then(() => {
        throw new Error('Error');
      });
      const fallback = 'I\'m the backup';
      const result = await asyncSafetyWrap(callback, fallback);
      expect(result).toEqual(fallback);
    });
  });
});