# Electron Sample - config
electron-storeを利用し閉じる直前のウィンドウの位置とサイズをローカルのファイルへ記録、次回起動する際に復元するサンプルです。

## 解説ページ
* [[Electron] 設定情報をローカルファイルに簡単保存 – electron-store](https://blog.katsubemakito.net/nodejs/electron/electron-store)

## 準備
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-config.git
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-config
$ npm install
```

## 実行方法
以下でプレビューを行います。
```shellsession
$ npm start
```

ビルドは以下の通り。各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```
