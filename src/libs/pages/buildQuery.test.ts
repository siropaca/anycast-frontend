import { buildQuery } from '@/libs/pages/buildQuery';

describe('buildQuery', () => {
  it('パラメータがない場合は空文字を返す', () => {
    expect(buildQuery()).toBe('');
    expect(buildQuery({})).toBe('');
  });

  it('単一のパラメータをクエリストリングに変換する', () => {
    expect(buildQuery({ page: 1 })).toBe('?page=1');
    expect(buildQuery({ sort: 'desc' })).toBe('?sort=desc');
  });

  it('複数のパラメータをクエリストリングに変換する', () => {
    expect(buildQuery({ page: 1, sort: 'desc' })).toBe('?page=1&sort=desc');
  });

  it('boolean 値を文字列に変換する', () => {
    expect(buildQuery({ active: true })).toBe('?active=true');
    expect(buildQuery({ active: false })).toBe('?active=false');
  });

  it('undefined と null の値を無視する', () => {
    expect(buildQuery({ page: 1, sort: undefined })).toBe('?page=1');
    expect(buildQuery({ page: 1, sort: null })).toBe('?page=1');
  });

  it('すべての値が undefined/null の場合は空文字を返す', () => {
    expect(buildQuery({ page: undefined, sort: null })).toBe('');
  });

  it('特殊文字をエンコードする', () => {
    expect(buildQuery({ redirect: '/dashboard' })).toBe(
      '?redirect=%2Fdashboard',
    );
    expect(buildQuery({ q: 'hello world' })).toBe('?q=hello+world');
  });
});
