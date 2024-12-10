# BOX Local Path generator

- BOX において、Web で開いた BOX ページから、ローカルでのフォルダパスを生成する TamperMonkey スクリプトです。
- BOX のリンクURLをWeb で開いた際に、ローカルフォルダの BOX Drive で開きなおしたい時に便利な Edge, Chrome の拡張を作りました。

# 必要環境

- ブラウザ：Edge or Chrome
- ブラウザ拡張：[Tampermonkey](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjlj4WJopiDAxVS_mEKHSTbBkkQFnoECBIQAQ&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Ftampermonkey%2Fdhdgffkkebhmkfjojejmpbldmpobfkfo%3Fhl%3Dja&usg=AOvVaw3EwS7u8bUn9a0-2pzZ_sbo&opi=89978449)
- BOX drive (BOX のローカル機能)

# インストール

1. Edgeの拡張機能[Tampermonkey](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjlj4WJopiDAxVS_mEKHSTbBkkQFnoECBIQAQ&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Ftampermonkey%2Fdhdgffkkebhmkfjojejmpbldmpobfkfo%3Fhl%3Dja&usg=AOvVaw3EwS7u8bUn9a0-2pzZ_sbo&opi=89978449)をインストールする
1. [こちらのリンク](https://github.com/Nobuho/BoxLocalPathGenerator/raw/master/src/BoxLocalPathGenerator.user.js)をクリックするとTampermonkeyスクリプトのインストール画面が表示される
1. 「インストール」をクリック
2. 拡張機能 ＞ Tampermonkeyのサブメニュー ＞ 拡張機能の管理 を開き、以下の設定をONにする
![image 93](https://github.com/user-attachments/assets/bca2a3ca-8b3c-464f-8538-2b95221fff58)
1. 完了！

※スクリプトインストール時の画面（再インストールになっていますが同じです）
![install](https://private-user-images.githubusercontent.com/47544810/291160725-a8e8ba8f-4384-42ee-a4e5-40907c15ab37.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI4Nzc5NzIsIm5iZiI6MTcwMjg3NzY3MiwicGF0aCI6Ii80NzU0NDgxMC8yOTExNjA3MjUtYThlOGJhOGYtNDM4NC00MmVlLWE0ZTUtNDA5MDdjMTVhYjM3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjE4VDA1MzQzMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM5N2ZhNjMzZDE4NWQ3YTEwZWZiMzY0MzM1ZDU1MTZlNzk5ZDhiZDRhYzBmNzdmNTk5NWIwYzdhZjQ2ZDc2OGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.cUrTf_s__6DRAQKGHg0UqG6cOIIfsOGSVGBM5Kw4_WY)

# 使い方

1. BOX のフォルダをブラウザで開く
2. 検索ボックス右のフォルダアイコン（📁）をクリック
3. パスがコピーされているので、エクスプローラーのパス欄に張り付ける

# 困ったときは
- BOXで直接ファイルにリンクした後に、フォルダに戻ると📁アイコンが出ないです。その時は画面のリロードして下さい。
- 📁アイコンが出ない！ってときがたまにあるかもしれないですが、その際はリロードしてください。

# Author

- 作成者：田中伸穂
