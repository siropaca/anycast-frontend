import { describe, expect, it } from 'vitest';
import { toOptionalField } from '@/libs/api/optionalField';

describe('optionalField', () => {
  describe('toOptionalField()', () => {
    it('string を渡すとそのまま返す', () => {
      const result = toOptionalField('abc');

      expect(result).toBe('abc');
    });

    it('空文字を渡すとそのまま返す', () => {
      const result = toOptionalField('');

      expect(result).toBe('');
    });

    it('null を渡すと null を返す', () => {
      const result = toOptionalField(null);

      expect(result).toBeNull();
    });

    it('undefined を渡すと undefined を返す', () => {
      const result = toOptionalField(undefined);

      expect(result).toBeUndefined();
    });
  });
});
