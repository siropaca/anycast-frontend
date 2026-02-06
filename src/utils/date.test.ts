import {
  formatDateJP,
  formatDuration,
  formatTime,
  formatYearMonth,
} from '@/utils/date';

describe('date', () => {
  describe('formatYearMonth()', () => {
    it('日付を「YYYY年M月」形式に変換する', () => {
      expect(formatYearMonth(new Date('2024-01-15'))).toBe('2024年1月');
    });

    it('12月を正しく変換する', () => {
      expect(formatYearMonth(new Date('2023-12-31'))).toBe('2023年12月');
    });
  });

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

  describe('formatDateJP()', () => {
    it('日付を「M月D日」形式に変換する', () => {
      expect(formatDateJP(new Date('2024-03-15'))).toBe('3月15日');
    });

    it('1月1日を正しく変換する', () => {
      expect(formatDateJP(new Date('2024-01-01'))).toBe('1月1日');
    });

    it('12月31日を正しく変換する', () => {
      expect(formatDateJP(new Date('2024-12-31'))).toBe('12月31日');
    });
  });

  describe('formatDuration()', () => {
    it('0ミリ秒を「0分0秒」に変換する', () => {
      expect(formatDuration(0)).toBe('0分0秒');
    });

    it('1分23秒を正しく変換する', () => {
      expect(formatDuration(83000)).toBe('1分23秒');
    });

    it('5秒を「0分5秒」に変換する', () => {
      expect(formatDuration(5000)).toBe('0分5秒');
    });

    it('12分34秒を正しく変換する', () => {
      expect(formatDuration(754000)).toBe('12分34秒');
    });

    it('端数のミリ秒は切り捨てる', () => {
      expect(formatDuration(83999)).toBe('1分23秒');
    });
  });
});
