# シンプルToDoアプリ

Next.js (App Router) + TypeScript + Tailwind CSS で作られた、シンプルでおしゃれなToDoアプリです。

## 機能

- タスクの追加
- タスクの完了チェック
- タスクの削除

タスクはブラウザの `localStorage` に保存されるため、サーバーやデータベースなしで動作します。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。

## ビルド

```bash
npm run build
npm run start
```

## Vercelへのデプロイ

このリポジトリをGitHubにpushし、[Vercel](https://vercel.com/new) でインポートするだけでデプロイできます。追加の環境変数や設定は不要です。
