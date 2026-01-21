import { trimFullWidth } from '@/utils/trimFullWidth';

describe('trimFullWidth', () => {
  describe('trimFullWidth()', () => {
    it('半角スペースを削除する', () => {
      expect(trimFullWidth('  hello  ')).toBe('hello');
    });

    it('全角スペースを削除する', () => {
      expect(trimFullWidth('　hello　')).toBe('hello');
    });

    it('タブを削除する', () => {
      expect(trimFullWidth('\thello\t')).toBe('hello');
    });

    it('改行を削除する', () => {
      expect(trimFullWidth('\nhello\n')).toBe('hello');
    });

    it('混合した空白文字を削除する', () => {
      expect(trimFullWidth(' \t　\nhello \t　\n')).toBe('hello');
    });

    it('文字列中間の空白は保持する', () => {
      expect(trimFullWidth('  hello world  ')).toBe('hello world');
      expect(trimFullWidth('　hello　world　')).toBe('hello　world');
    });

    it('空白のみの文字列は空文字列を返す', () => {
      expect(trimFullWidth('   ')).toBe('');
      expect(trimFullWidth('　　　')).toBe('');
      expect(trimFullWidth(' \t　\n')).toBe('');
    });

    it('空文字列は空文字列を返す', () => {
      expect(trimFullWidth('')).toBe('');
    });

    it('空白がない文字列はそのまま返す', () => {
      expect(trimFullWidth('hello')).toBe('hello');
    });
  });
});
