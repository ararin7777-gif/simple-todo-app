<img width="1160" height="1232" alt="image" src="https://github.com/user-attachments/assets/56b74028-7725-4c3d-9133-b8aadcf5ef54" /># シンプルToDoアプリ

Next.js (App Router) + TypeScript + Tailwind CSS で作られた、シンプルでおしゃれなToDoアプリです。

## 機能

- タスクの追加
- タスクの完了チェック
- タスクの削除

タスクはUpstash Redis（クラウド上のデータベース）に保存されるため、PC・スマホなどどの端末からアクセスしても同じ一覧が表示されます。

## 公開URL

https://simple-todo-app-vert-six.vercel.app

## 技術構成

- フロントエンド: Next.js / React / TypeScript / Tailwind CSS
- データ保存: Upstash Redis（`/api/todos` のAPIルート経由でアクセス）
- ホスティング: Vercel
- ソースコード管理: GitHub

## 開発

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

Upstash Redisに接続するため、プロジェクト直下に `.env.local` を作成し、以下の環境変数を設定してください。

```
KV_REST_API_URL=xxxxx
KV_REST_API_TOKEN=xxxxx
```

値はVercelダッシュボードの `Storage → 該当のUpstashデータベース → Quickstart → .env.local タブ` からコピーできます。Vercel CLIでログイン済みであれば、以下のコマンドでも取得できます。

```bash
vercel env pull .env.local
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](https://simple-todo-app-vert-six.vercel.app) を開いて確認できます。

## ビルド

```bash
npm run build
npm run start
```

## Vercelへのデプロイ

1. このリポジトリをGitHubへpush
2. [Vercel](https://vercel.com/new) でインポート
3. Vercelダッシュボードの「Storage」タブから「Upstash for Redis」を作成し、このプロジェクトに接続（環境変数が自動設定されます）
4. デプロイ完了後、発行されたURLからアクセス可能

以降はGitHubの `main` ブランチにpushするたびに、自動で再デプロイされます。
