# 実装パターン・規約集

## 最重要ルール（全タスク共通）

1. import のパスは `@` エイリアスを使用する（相対パス禁止）
2. バレルファイル（index.ts）は作成しない
3. 1 ファイルにつき 1 コンポーネントのみ定義する
4. コンポーネントの props は `interface Props` で定義する
5. コミット前に `pnpm check` を実行する

## 禁止事項

- バレルファイル（index.ts）を作成しない
- `any` や `as` での型回避は原則禁止
- `useCallback` / `useMemo` はパフォーマンスチューニングが必要になるまで使用しない
- src/components/ のコンポーネントでカラートークン（`red-500` 等）を直接使用しない（global.css にセマンティックトークンとして定義してから使用）
- テスト失敗時にテストコードを先に修正しない（実装側の修正を優先）
- 非 export のヘルパーコンポーネントも同じファイルに同居させない（別ファイルに分離）
- Zustand の `useXxxStore` をコンポーネント内で直接呼び出さない（カスタムフックでラップ）

## ファイル命名規約

| 種類 | 命名 | 例 |
|------|------|-----|
| コンポーネント | PascalCase.tsx | TrackInfo.tsx |
| フック | camelCase.ts | useAudioPlayer.ts |
| ユーティリティ | camelCase.ts | formatTime.ts |
| スキーマ（Zod） | camelCase.ts | channel.ts |
| ストア | camelCase.ts | playerStore.ts |
| 型定義 | camelCase.ts | job.ts |
| 定数 | camelCase.ts | messages.ts |
| テスト | *.test.ts | formatTime.test.ts |
| Stories | *.stories.tsx | Avatar.stories.tsx |

## コーディング規約

- TypeScript を使用し、型安全性を重視する
- Biome の設定に従ってフォーマットする
- バレルファイル（index.ts）は作成しない
- import のパスは相対パスではなく `@` エイリアスを使用する
- 名前付き関数は `function` 宣言を使い、コールバック引数にはアロー関数を使う
- オブジェクトの型定義には `type` より `interface` を優先する
- `null` より `undefined` を積極的に使用する
- カスタムフックの返り値の型は明示的に定義せず、TypeScript の推論に任せる
- Zustand の `useXxxStore` はコンポーネント内で直接呼び出さず、必ずカスタムフックでラップして使用する
- キーボードイベントは `useKey` フック (`@/hooks/useKey`) を使用する

## JSDoc

- 基本的に関数には JSDoc を記載する
- React コンポーネントには JSDoc を記載しない
- 説明文と `@param` の間には空行を入れる
- 使用するタグ: `@param`, `@returns`, `@throws`, `@example`（必要に応じて）
- `@example` にはコードブロック（` ``` `）や import 文は不要、呼び出しと返却値のみ記載

```typescript
/**
 * 2つの数値を加算する
 *
 * @param a - 1つ目の数値
 * @param b - 2つ目の数値
 * @returns 加算結果
 *
 * @example
 * add(1, 2) // => 3
 */
function add(a: number, b: number): number {
  return a + b;
}
```

## React

- コンポーネントは関数コンポーネント + hooks を使用
- `use client` / `use server` ディレクティブを適切に使い分ける
- 最新の hooks・API・手法を積極的に採用する（例: `use`、`useActionState`、`useOptimistic`、Server Components など）
- `useCallback` / `useMemo` はパフォーマンスチューニングが必要になるまで使用しない
- コンポーネントの props は必ず `interface Props` で定義してから使用する
- src/components/ 配下のコンポーネントはできるだけ Presentational Component にする
- src/components/ のサブディレクトリはカテゴリ別に分類する（`dataDisplay`, `inputs`, `navigation`, `surface`, `feedback`, `utils`）
- ローディング状態には `XxxSkeleton` コンポーネントを作成する（例: `AvatarSkeleton`, `ButtonSkeleton`）
- Skeleton コンポーネントは実際のレイアウトにできるだけ近づける（ラベル、ボタンなど構成要素を省略しない）
- 1ファイルにつき1コンポーネントのみ定義する（非exportのヘルパーコンポーネントも別ファイルに分離する）
- クリック可能な要素には必ず `cursor-pointer` を付与する
- `className` の結合や条件式を使う場合は `cn()` を使用する（src/utils/cn.ts）
- コンポーネントでカラートークン（`red-500`、`gray-400` など）を直接使用しない。必ず global.css にセマンティックトークンとして定義してから使用する
- **UI 構築時は必ず src/styles/globals.css の `@theme inline` ブロックで定義済みのカラートークンを確認してから実装を開始する。** 存在しないトークン（例: `text-text-secondary`）を使用しないこと

### Props の定義

- 定義順序: 必須プロパティ → オプショナルプロパティ → 空行 → 関数
- コンポーネント内のハンドラー関数は `function` 宣言で定義する（アロー関数ではなく）

```typescript
interface Props {
  id: string;
  title: string;
  description?: string;
  isDisabled?: boolean;

  onClick: () => void;
  onSubmit: (data: FormData) => void;
}
```

### カスタムフックの設計

- カスタムフックには**宣言的な操作関数**を定義し、イベントハンドラーはコンポーネント側に置く
- 宣言的な操作関数の例: `reset()`, `submit()`, `openFilePicker()`, `selectFile(file)`
- イベントハンドラー（`handleXxx`）はコンポーネント側で定義し、イベントオブジェクトから値を抽出してフックの操作関数を呼び出す
- ブラウザ API（`window.confirm`, `window.alert` など）はフックではなくコンポーネント側で呼び出す
- フックは状態（例: `isDirty`）を提供し、コンポーネントがその状態を使って確認ダイアログを表示する

```typescript
// カスタムフック - 宣言的な操作を提供
function useUploadModal() {
  const [file, setFile] = useState<File | null>(null);

  function reset() { setFile(null); }
  function selectFile(file: File) { setFile(file); }
  function submit() { /* 送信処理 */ }

  return { file, reset, selectFile, submit };
}

// コンポーネント - イベントを操作に変換
function UploadModal() {
  const { file, reset, selectFile, submit } = useUploadModal();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) selectFile(file);
  }

  return <input type="file" onChange={handleFileChange} />;
}
```

## Next.js

- page.tsx には必ず `export const metadata` を定義する
- 認証必須ページ（(studio), (settings) など）には `robots: { index: false }` を付与する
- src/app/ 配下にはページ（page.tsx, layout.tsx など）のみ配置し、コンポーネントやフックは src/features/ に配置する

## Storybook

- src/components/ 配下の共有コンポーネントには *.stories.tsx を作成する
- feature 固有のコンポーネントには Stories は不要
- Stories ファイルはコンポーネントと同じディレクトリに配置する

## TanStack Query

- `invalidateQueries` などのキャッシュ操作はコンポーネントではなくカスタムフック内で行う
- ミューテーションの `onSuccess` でキャッシュを無効化する
- コンポーネントでは `mutate` + `onSuccess` コールバックを使用し、`mutateAsync` + try-catch は避ける

## ページネーション付き API のカスタムフック

ページネーション付きの API をカスタムフックにする際は、以下をフック内で管理する：

- `currentPage` の状態（`useState`）
- `limit`（デフォルト値として定数で定義）
- `offset` の計算（`(currentPage - 1) * limit`）
- `totalPages` の計算（`Math.ceil(pagination.total / limit)`）

```typescript
const DEFAULT_LIMIT = 20;

export function useMyList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetListSuspense({
    limit: DEFAULT_LIMIT,
    offset: (currentPage - 1) * DEFAULT_LIMIT,
  });

  const response = unwrapResponse(data, { data: [], pagination: DEFAULT_PAGINATION });
  const totalPages = Math.ceil(response.pagination.total / DEFAULT_LIMIT);

  return {
    items: response.data,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
```

## ページパスの管理

- ページのパスとタイトルは src/libs/pages/index.ts の `Pages` オブジェクトで一元管理する
- 動的ルート（[id] など）を持つページは、パラメータ型を定義して `path()` と `page.tsx` の両方で使用する

```typescript
// src/libs/pages/studioPages.ts
export interface ChannelParams {
  id: string;
}

export const studioPages = {
  channel: {
    path: (params: ChannelParams) => `/studio/channels/${params.id}`,
    title: 'チャンネル詳細',
  },
} as const;

// src/app/(studio)/studio/channels/[id]/page.tsx
interface Props {
  params: Promise<ChannelParams>;
}
```

## 実装上の注意事項

- 必要な API が存在せずワークアラウンド的な実装になりそうな場合は、実装に着手する前にユーザーに確認する（バックエンドへの API 追加依頼で解決できる可能性があるため）
- TanStack Query でデータフェッチを管理する
- API クライアントは src/libs/api/ に配置する
- カスタムフックは src/features/*/hooks/ に配置する
- データ取得のカスタムフックはコンポーネントごとに作成する（Suspense との組み合わせを考慮）
- データ取得の実装時は orval 生成の型（src/libs/api/generated/schemas/）を必ず確認する
- HTTP ステータスコードはマジックナンバーではなく `http-status-codes` の `StatusCodes` を使用する

## アイコン

- `@phosphor-icons/react` のアイコンは `Icon` サフィックス付きでインポートする（例: `PlusIcon`, `HeartIcon`）

## ファイル・ディレクトリ管理

- 新しいディレクトリを作成する際、空のままでも Git で管理する必要がある場合は .gitkeep を追加する

## 環境変数

- 環境変数を追加・変更した際は .env.example も更新する

## パッケージ管理

- 依存パッケージを追加・削除した後は整合性を確認する
- 新しいパッケージを追加する際は、そのパッケージが広く使われているか確認する

## React Hook Form

- `showCounter` 付きの Input / Textarea で RHF の `register` を使う場合、`value={watch('fieldName')}` を併せて渡す（`register` だけでは `value` が props に反映されず、カウンターが動作しない）

## エラー対処

| エラー | 対処 |
|--------|------|
| `pnpm check` 失敗 | `pnpm check:fix` で自動修正を試み、残りを手動修正 |
| `pnpm typecheck` 失敗 | 型エラーを解消してから進める。`any` や `as` での回避は原則禁止 |
| テスト失敗 | テストコードではなく実装側の修正を優先する。テスト側を修正する場合はユーザーに確認を取る |
| `pnpm gen:api` 失敗 | openapi.json が最新か確認する。バックエンドの起動状態も確認 |
