# テストガイド

## 基本方針

- 外部依存がないユニットテストは、実装時に必ず作成する

## テスト実行

| コマンド | 説明 |
|----------|------|
| `pnpm test` | テストを実行 |
| `pnpm test:watch` | テストをウォッチモードで実行 |

## 命名規約

- import のパスは `@` エイリアスを使用する
- ルートの `describe` でファイル名を囲む
- 関数のテストは `()` をつける（例: `describe('myFunction()', () => {`）
- オブジェクトやスキーマのテストは `()` 不要

```typescript
import { myFunction } from '@/utils/myFunction';

describe('myFunction', () => {
  describe('myFunction()', () => {
    it('...', () => {
      // テストケース
    });
  });
});
```
