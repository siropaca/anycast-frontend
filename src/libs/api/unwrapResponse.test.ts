import { StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { unwrapResponse } from './unwrapResponse';

describe('unwrapResponse', () => {
  describe('成功レスポンス（status: OK）', () => {
    it('data.data を返す', () => {
      const response = {
        status: StatusCodes.OK,
        data: { data: [{ id: '1', name: 'Channel 1' }] },
      };

      const result = unwrapResponse(response, []);

      expect(result).toEqual([{ id: '1', name: 'Channel 1' }]);
    });

    it('data.data が undefined の場合はデフォルト値を返す', () => {
      const response = {
        status: StatusCodes.OK,
        data: { data: undefined },
      };

      const result = unwrapResponse(response, []);

      expect(result).toEqual([]);
    });
  });

  describe('成功レスポンス（status: CREATED）', () => {
    it('data.data を返す', () => {
      const response = {
        status: StatusCodes.CREATED,
        data: { data: { id: '1', name: 'New Item' } },
      };

      const result = unwrapResponse(response, null);

      expect(result).toEqual({ id: '1', name: 'New Item' });
    });
  });

  describe('エラーレスポンス', () => {
    it('status: BAD_REQUEST の場合はデフォルト値を返す', () => {
      const response = {
        status: StatusCodes.BAD_REQUEST,
        data: { error: 'Bad Request' },
      };

      const result = unwrapResponse(response, []);

      expect(result).toEqual([]);
    });

    it('status: UNAUTHORIZED の場合はデフォルト値を返す', () => {
      const response = {
        status: StatusCodes.UNAUTHORIZED,
        data: { error: 'Unauthorized' },
      };

      const result = unwrapResponse(response, []);

      expect(result).toEqual([]);
    });

    it('status: INTERNAL_SERVER_ERROR の場合はデフォルト値を返す', () => {
      const response = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: { error: 'Internal Server Error' },
      };

      const result = unwrapResponse(response, []);

      expect(result).toEqual([]);
    });
  });

  describe('undefined レスポンス', () => {
    it('response が undefined の場合はデフォルト値を返す', () => {
      const result = unwrapResponse(undefined, []);

      expect(result).toEqual([]);
    });
  });

  describe('様々なデフォルト値', () => {
    it('デフォルト値として空配列を使用', () => {
      const result = unwrapResponse(undefined, []);

      expect(result).toEqual([]);
    });

    it('デフォルト値として null を使用', () => {
      const result = unwrapResponse(undefined, null);

      expect(result).toBeNull();
    });

    it('デフォルト値としてオブジェクトを使用', () => {
      const defaultValue = { id: '', name: '' };

      const result = unwrapResponse(undefined, defaultValue);

      expect(result).toEqual({ id: '', name: '' });
    });
  });
});
