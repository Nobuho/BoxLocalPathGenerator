# BOX Local Path generator

Takenaka BOX において、Web で開いた BOX ページから、ローカルでのフォルダパスを生成する TamperMonkey スクリプトです。
BOX のリンクを URL で共有することがあると思うのですが、Web でそれを開いた際に、ローカルフォルダの BOX Drive で開きなおしたいというシチュエーションがあるかと思います。
そんな時に便利な Edge, Chrome の拡張を作りました。Tampermonkey というブラウザ拡張を使っています。少し導入が難しいかもですが、できるだけわかりやすく説明してます。

# DEMO

![howtouse](https://private-user-images.githubusercontent.com/47544810/291158532-9df09867-e94a-4c56-84ed-e0d70d878e67.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI4NzcyNzcsIm5iZiI6MTcwMjg3Njk3NywicGF0aCI6Ii80NzU0NDgxMC8yOTExNTg1MzItOWRmMDk4NjctZTk0YS00YzU2LTg0ZWQtZTBkNzBkODc4ZTY3LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjE4VDA1MjI1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ0YTBlZjc5ZDE2NTAzMGJmNjQ1OGM3Njk2NjliMjAyZDM2ZWZlYzMzNDcxNGVmZGM5NjU1NjVkZTg5NDU2OWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.sS332IKW3-7knJ5Pu_8QJuW8RKDaT-rq8D9350CsBvQ)

# 必要環境

- ブラウザ：Edge / Chrome
- ブラウザ拡張：Tampermonkey
- BOX drive (BOX のローカル機能)

# インストール

Tampermonkey（https://chrome.google.com/webstore/detail/tampermonkey/dhdgf...）を導入する
Tampermonkey→「新規スクリプトを追加」をクリック
新規スクリプト作成画面が出るので、全て消去
この投稿コメントに添付の「ver2.0_box_local_path.js.txt」の内容を全コピー、ペースト
Ctrl + s で保存して閉じる
ブラウザ再起動
完了！

# 使い方

1. BOX のフォルダをブラウザで開く
2. 検索ボックス右のフォルダアイコン（📁）をクリック
3. パスがコピーされているので、エクスプローラーのパス欄に張り付ける
4. ※📁 アイコンが出ない！ってときがたまにあるかもしれないですが、その際はリロードしてください。

# Author

- 作成者：田中伸穂
- 所属：設計本部
