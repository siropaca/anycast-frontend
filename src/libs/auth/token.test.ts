import { getTokenExpiry, isTokenExpiringSoon } from '@/libs/auth/token';

/**
 * テスト用の JWT トークンを生成する
 *
 * @param payload - JWT ペイロード
 * @returns 署名なしの JWT 文字列
 */
function createTestJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.test-signature`;
}

describe('token', () => {
  describe('getTokenExpiry()', () => {
    it('JWT の exp クレームを返す', () => {
      const token = createTestJwt({ exp: 1700000000 });
      expect(getTokenExpiry(token)).toBe(1700000000);
    });

    it('exp クレームがない場合は undefined を返す', () => {
      const token = createTestJwt({ sub: 'user-1' });
      expect(getTokenExpiry(token)).toBeUndefined();
    });

    it('不正な JWT 文字列の場合は undefined を返す', () => {
      expect(getTokenExpiry('not-a-jwt')).toBeUndefined();
    });

    it('空文字列の場合は undefined を返す', () => {
      expect(getTokenExpiry('')).toBeUndefined();
    });

    it('ペイロードが不正な JSON の場合は undefined を返す', () => {
      const header = btoa(JSON.stringify({ alg: 'HS256' }));
      const token = `${header}.not-valid-base64-json.signature`;
      expect(getTokenExpiry(token)).toBeUndefined();
    });
  });

  describe('isTokenExpiringSoon()', () => {
    it('有効期限が十分に先の場合は false を返す', () => {
      const futureExp = Math.floor(Date.now() / 1000) + 3600; // 1 時間後
      const token = createTestJwt({ exp: futureExp });
      expect(isTokenExpiringSoon(token)).toBe(false);
    });

    it('有効期限が 5 分以内の場合は true を返す', () => {
      const soonExp = Math.floor(Date.now() / 1000) + 200; // 200 秒後
      const token = createTestJwt({ exp: soonExp });
      expect(isTokenExpiringSoon(token)).toBe(true);
    });

    it('有効期限が既に切れている場合は true を返す', () => {
      const pastExp = Math.floor(Date.now() / 1000) - 100;
      const token = createTestJwt({ exp: pastExp });
      expect(isTokenExpiringSoon(token)).toBe(true);
    });

    it('bufferSeconds を指定した場合はそのバッファで判定する', () => {
      const exp = Math.floor(Date.now() / 1000) + 200;
      const token = createTestJwt({ exp });

      // 200 秒後 → バッファ 60 秒なら期限切れではない
      expect(isTokenExpiringSoon(token, 60)).toBe(false);

      // 200 秒後 → バッファ 300 秒なら期限切れ
      expect(isTokenExpiringSoon(token, 300)).toBe(true);
    });

    it('exp クレームがない場合は true を返す', () => {
      const token = createTestJwt({ sub: 'user-1' });
      expect(isTokenExpiringSoon(token)).toBe(true);
    });

    it('不正なトークンの場合は true を返す', () => {
      expect(isTokenExpiringSoon('invalid')).toBe(true);
    });
  });
});
