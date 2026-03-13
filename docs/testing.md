# テストガイド

## 基本方針

- 外部依存がないユニットテストは、実装時に必ず作成する
- テストフレームワークは Vitest を使用する

## テスト実行

| コマンド | 説明 |
|----------|------|
| `pnpm test` | テストを実行 |
| `pnpm test:watch` | テストをウォッチモードで実行 |

## テスト対象

### 必須（外部依存がないもの）

| 対象 | 例 |
|------|-----|
| ユーティリティ関数 | `src/utils/`, `src/features/*/utils/` |
| Zod スキーマ | `src/features/*/schemas/` |
| Zustand ストア | `src/stores/` |
| ページパス定義 | `src/libs/pages/` |
| ライブラリヘルパー | `src/libs/api/` の純粋関数 |

### 不要（外部依存があるもの）

- React コンポーネント（Testing Library でのテストは必要に応じて）
- カスタムフック（React の hooks に依存）
- API クライアント（orval 生成コード）
- Server Components / Server Actions

「外部依存」の判断基準: React、ブラウザ API（DOM, fetch, localStorage 等）、API 通信、ファイルシステムに依存しているかどうか。

## テストファイルの配置

テストファイルはテスト対象と**同じディレクトリ**に配置する（`__tests__/` ディレクトリは使わない）。

```
src/utils/
├── cn.ts
├── cn.test.ts      # ← 同じディレクトリ
├── date.ts
└── date.test.ts
```

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

## モック方針

- 外部モジュールのモックは最小限にする
- テスト対象の関数が純粋関数であれば、モックは不要
- Zustand ストアのテストでは `act` を使わず、直接 `getState()` / `setState()` で操作する
