// ==UserScript==
// @name        box_local_path
// @description box url to local path
// @author       Nobuho Tanaka
// @version      3.6.3
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

function path_copy() {
  let b = "file://C:/Takenaka/Box/";
  const c = document.querySelector(
    "button.ItemListBreadcrumbOverflow-menuButton"
  );
  c &&
    (c.click(),
    (b += [
      ...document.querySelectorAll(
        "a[data-resin-target='openfolder'].menu-item"
      ),
    ]
      .map((a) => a.innerText)
      .filter((a) => "\u3059\u3079\u3066\u306e\u30d5\u30a1\u30a4\u30eb" !== a)
      .join("/")),
    b.endsWith("/") || (b += "/"));
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
  e.preventDefault();
}

// /////////////////////////////////////////////////////////////////////////////////////////////////

document.body.addEventListener("keydown", function (e) {
  if (e.altKey && e.key === "s") {
    path_copy();
  }
});

// /////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", function () {
  "use strict";

  // 検索窓の横を挿入対象に
  let target_elm = document.getElementsByClassName("header-search")[0];

  // クリック用アイコンの追加
  let folder_icon = document.createElement("a"); //新しい要素を"タグ名"で作成し、変数folder_icon に代入
  let str_icon = document.createTextNode("📂 Click or Alt+S"); //テキストノードを代入
  folder_icon.href = "javascript:void(0);"; //ダミーのリンクを作成
  folder_icon.style.textDecoration = "None"; //始めは表示しない
  folder_icon.style.marginLeft = "8px";
  folder_icon.style.lineHeight = "40px";
  folder_icon.appendChild(str_icon); //テキストノードを追加
  folder_icon.setAttribute("id", "copy_local_link");
  folder_icon.classList.add("add-link");
  target_elm.parentNode.insertBefore(
    folder_icon,
    target_elm.nextElementSibling
  );

  // クリックのローカルパスのコピー
  document.getElementById("copy_local_link").onclick = function () {
    path_copy();
  };
});
