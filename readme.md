# BOX Local Path generator

Takenaka BOX において、Webで開いたBOXページから、ローカルでのフォルダパスを生成するTamperMonkeyスクリプトです。
BOXのリンクをURLで共有することがあると思うのですが、Webでそれを開いた際に、ローカルフォルダのBOX Driveで開きなおしたいというシチュエーションがあるかと思います。
そんな時に便利なEdge, Chromeの拡張を作りました。Tampermonkeyというブラウザ拡張を使っています。少し導入が難しいかもですが、できるだけわかりやすく説明してます。

# DEMO

"hoge"の魅力が直感的に伝えわるデモ動画や図解を載せる

# 必要環境

* ブラウザ：Edge / Chrome
* ブラウザ拡張：Tampermonkey 
* BOX drive (BOXのローカル機能)

# インストール

Tampermonkey（https://chrome.google.com/webstore/detail/tampermonkey/dhdgf...）を導入する
Tampermonkey→「新規スクリプトを追加」をクリック
新規スクリプト作成画面が出るので、全て消去
この投稿コメントに添付の「ver2.0_box_local_path.js.txt」の内容を全コピー、ペースト
Ctrl + s で保存して閉じる
ブラウザ再起動
完了！

# 使い方

BOXのフォルダをブラウザで開く
検索ボックス右のフォルダアイコン（📁）をクリック
パスがコピーされているので、エクスプローラーのパス欄に張り付ける
※📁アイコンが出ない！ってときがたまにあるかもしれないですが、その際はリロードしてください。

# Author

* 作成者：田中伸穂
* 所属：設計本部