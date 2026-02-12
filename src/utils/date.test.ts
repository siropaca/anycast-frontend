import {
  formatDateJP,
  formatDateTime,
  formatDuration,
  formatElapsedTime,
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

  describe('formatDateTime()', () => {
    it('日付を「M/D HH:mm」形式に変換する', () => {
      expect(formatDateTime(new Date('2024-03-15T14:05:00'))).toBe(
        '3/15 14:05',
      );
    });

    it('時・分が1桁の場合は0埋めする', () => {
      expect(formatDateTime(new Date('2024-01-01T03:07:00'))).toBe('1/1 03:07');
    });

    it('0時0分を正しく変換する', () => {
      expect(formatDateTime(new Date('2024-06-30T00:00:00'))).toBe(
        '6/30 00:00',
      );
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

  describe('formatElapsedTime()', () => {
    it('0ミリ秒を「0秒」に変換する', () => {
      expect(formatElapsedTime(0)).toBe('0秒');
    });

    it('60秒未満は秒のみで表示する', () => {
      expect(formatElapsedTime(5000)).toBe('5秒');
      expect(formatElapsedTime(59000)).toBe('59秒');
    });

    it('60秒以上は「X分Y秒」形式で表示する', () => {
      expect(formatElapsedTime(60000)).toBe('1分0秒');
      expect(formatElapsedTime(83000)).toBe('1分23秒');
      expect(formatElapsedTime(754000)).toBe('12分34秒');
    });

    it('端数のミリ秒は切り捨てる', () => {
      expect(formatElapsedTime(5999)).toBe('5秒');
      expect(formatElapsedTime(83999)).toBe('1分23秒');
    });
  });
});
