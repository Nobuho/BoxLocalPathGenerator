// ==UserScript==
// @name        box_local_path
// @description box url to local path
// @author       Nobuho Tanaka
// @version      3.7.0
// @match        https://takenaka.ent.box.com/folder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=box.com
// @resource     toastr.min.css https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

// /////////////////////////////////////////////////////////////////////////////////////////////////

const newCSS = GM_getResourceText("toastr.min.css");
GM_addStyle(newCSS);

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time)); //timeはミリ秒

async function path_copy() {
  let b = "file://C:/Takenaka/Box/";
  const c = document.querySelector(
    "button.ItemListBreadcrumbOverflow-menuButton"
  );
  if (c) {
    c.click();
    await sleep(10); // クリック後に10ミリ秒の遅延を追加
    b += [
      ...document.querySelectorAll(
        "a[data-resin-target='openfolder'].menu-item"
      ),
    ]
      .map((a) => a.innerText)
      .filter((a) => "\u3059\u3079\u3066\u306e\u30d5\u30a1\u30a4\u30eb" !== a)
      .join("/");
    if (!b.endsWith("/")) b += "/";
  }
  b += [...document.querySelectorAll(".ItemListBreadcrumb-listItem")]
    .map((a) => a.innerText)
    .filter(
      (a) =>
        "" !== a && "\u3059\u3079\u3066\u306e\u30d5\u30a1\u30a4\u30eb" !== a
    )
    .join("/");
  document.body.click();
  console.log(b);
  GM_setClipboard(b);

  // show toast message

  toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: "1000",
  };
  toastr.success("Boxローカルパスをコピーしました");
}

function add_text() {
  const target_elm = document.querySelector(
    ".header-search.prevent-item-deselection.HeaderSearch--isNewQuickSearch"
  );

  if (target_elm) {
    console.log("found!!");
    // クリック用アイコンの追加
    let folder_icon = document.createElement("a"); // 新しい要素を"タグ名"で作成し、変数folder_icon に代入
    let str_icon = document.createTextNode("📂 Click or Alt+S"); // テキストノードを代入
    folder_icon.href = "javascript:void(0);"; // ダミーのリンクを作成
    folder_icon.style.marginLeft = "8px";
    folder_icon.style.lineHeight = "40px";
    folder_icon.style.textDecoration = "None"; //下線消す
    folder_icon.appendChild(str_icon); // テキストノードを追加
    folder_icon.setAttribute("id", "copy_local_link");
    folder_icon.classList.add("add-link");

    // ターゲット要素の横に追加
    target_elm.insertAdjacentElement("afterend", folder_icon);
    // クリックのローカルパスのコピー
    document.getElementById("copy_local_link").onclick = function () {
      path_copy();
    };
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////

document.body.addEventListener("keydown", function (e) {
  if (e.altKey && e.key === "s") {
    path_copy();
  }
});

// /////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", (event) => {
  console.log("ページが完全に読み込まれました");
  setTimeout(() => {
    // ここに遅延させて実行したい処理を記述
    add_text();
  }, 3000); // nミリ秒遅延
});
