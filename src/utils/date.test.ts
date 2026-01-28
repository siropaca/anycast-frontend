import { formatTime } from '@/utils/date';

describe('formatTime', () => {
  describe('formatTime()', () => {
    it('0ミリ秒を 0:00 に変換する', () => {
      expect(formatTime(0)).toBe('0:00');
    });

    it('秒数が1桁の場合は0埋めする', () => {
      expect(formatTime(5000)).toBe('0:05');
    });

    it('1分23秒を 1:23 に変換する', () => {
      expect(formatTime(83000)).toBe('1:23');
    });

    it('4分56秒を 4:56 に変換する', () => {
      expect(formatTime(296000)).toBe('4:56');
    });

    it('12分34秒を 12:34 に変換する', () => {
      expect(formatTime(754000)).toBe('12:34');
    });

    it('端数のミリ秒は切り捨てる', () => {
      expect(formatTime(83999)).toBe('1:23');
    });
  });
});
