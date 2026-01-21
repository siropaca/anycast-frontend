import {
  moveLineDown,
  moveLineUp,
} from '@/features/studio/episodes/utils/reorderScriptLines';

describe('reorderScriptLines', () => {
  describe('moveLineUp()', () => {
    const lineIds = ['a', 'b', 'c', 'd'];

    it('指定した要素を1つ上に移動する', () => {
      expect(moveLineUp(lineIds, 'b')).toEqual(['b', 'a', 'c', 'd']);
      expect(moveLineUp(lineIds, 'c')).toEqual(['a', 'c', 'b', 'd']);
      expect(moveLineUp(lineIds, 'd')).toEqual(['a', 'b', 'd', 'c']);
    });

    it('先頭の要素は移動できず null を返す', () => {
      expect(moveLineUp(lineIds, 'a')).toBeNull();
    });

    it('存在しない ID は移動できず null を返す', () => {
      expect(moveLineUp(lineIds, 'x')).toBeNull();
    });

    it('元の配列を変更しない', () => {
      const original = ['a', 'b', 'c'];
      moveLineUp(original, 'b');
      expect(original).toEqual(['a', 'b', 'c']);
    });

    it('空の配列では null を返す', () => {
      expect(moveLineUp([], 'a')).toBeNull();
    });
  });

  describe('moveLineDown()', () => {
    const lineIds = ['a', 'b', 'c', 'd'];

    it('指定した要素を1つ下に移動する', () => {
      expect(moveLineDown(lineIds, 'a')).toEqual(['b', 'a', 'c', 'd']);
      expect(moveLineDown(lineIds, 'b')).toEqual(['a', 'c', 'b', 'd']);
      expect(moveLineDown(lineIds, 'c')).toEqual(['a', 'b', 'd', 'c']);
    });

    it('末尾の要素は移動できず null を返す', () => {
      expect(moveLineDown(lineIds, 'd')).toBeNull();
    });

    it('存在しない ID は移動できず null を返す', () => {
      expect(moveLineDown(lineIds, 'x')).toBeNull();
    });

    it('元の配列を変更しない', () => {
      const original = ['a', 'b', 'c'];
      moveLineDown(original, 'b');
      expect(original).toEqual(['a', 'b', 'c']);
    });

    it('空の配列では null を返す', () => {
      expect(moveLineDown([], 'a')).toBeNull();
    });
  });
});
