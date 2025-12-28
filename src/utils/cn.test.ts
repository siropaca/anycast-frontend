import { cn } from '@/utils/cn';

describe('cn', () => {
  it('単一のクラス名を返す', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('複数のクラス名を結合する', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('競合する Tailwind クラスを後者で上書きする', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('falsy な値を無視する', () => {
    expect(cn('px-2', false && 'py-4')).toBe('px-2');
    expect(cn('px-2', null, undefined, 'py-4')).toBe('px-2 py-4');
  });

  it('条件付きクラスを処理する', () => {
    const isActive = true;
    const isDisabled = false;

    expect(
      cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled'),
    ).toBe('btn btn-active');
  });

  it('オブジェクト形式のクラスを処理する', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe(
      'text-red-500',
    );
  });

  it('配列形式のクラスを処理する', () => {
    expect(cn(['px-2', 'py-4'])).toBe('px-2 py-4');
  });

  it('空の入力で空文字列を返す', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('複雑な組み合わせを処理する', () => {
    expect(
      cn(
        'base-class',
        ['array-class'],
        { 'object-class': true },
        false && 'ignored',
      ),
    ).toBe('base-class array-class object-class');
  });
});
