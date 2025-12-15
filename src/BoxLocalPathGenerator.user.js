// ==UserScript==
// @name        box_local_path
// @description box url to local path
// @author       Nobuho Tanaka
// @version      4.0.0
// @match        https://takenaka.ent.box.com/folder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=box.com
// @resource     toastr.min.css https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  console.log("BoxDrive Path Copier: Tampermonkey script loaded");

  // toastr.cssを読み込み
  const newCSS = GM_getResourceText("toastr.min.css");
  GM_addStyle(newCSS);

  // sleep関数
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // 設定管理オブジェクト
  const settingsManager = {
    BASE_URL: window.location.hostname,
    boxSettings: {
      boxPath: GM_getValue("boxPath", "C:/Takenaka/Box/"),
    },
  };

  // 指定されたロジックを使用してパスを生成・コピーする関数
  async function generateAndCopyBoxDrivePath() {
    let path = "file://" + settingsManager.boxSettings.boxPath;

    const dotButton = document.querySelectorAll(
      ".ItemListBreadcrumb > button"
    )[0];
    const menuItems = document.querySelectorAll(
      "a[data-resin-target='openfolder'].menu-item"
    );

    if (dotButton && menuItems.length === 0) {
      console.log("Clicking dot button to reveal menu items...");
      dotButton.click();

      // MutationObserverでメニューアイテムの出現を待つ
      new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          const items = document.querySelectorAll(
            "a[data-resin-target='openfolder'].menu-item"
          );
          if (items.length > 0) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // タイムアウト設定（5秒後に強制実行）
        setTimeout(() => {
          observer.disconnect();
          console.log("Timeout: proceeding without menu items");
          resolve();
        }, 5000);
      }).then(async () => {
        await buildAndCopyPath();
      });
    } else {
      console.log("Proceeding directly to build path");
      await buildAndCopyPath();
    }

    async function buildAndCopyPath() {
      // メニューアイテムからパスを構築
      const menuItems = document.querySelectorAll(
        "a[data-resin-target='openfolder'].menu-item"
      );
      console.log("Menu items for path:", menuItems.length);

      const excludeValues = [
        decodeURI("すべてのファイル"),
        "All Files",
        decodeURI("ファイル"),
        "Files",
      ];

      const menuPaths = [...menuItems]
        .map((e) => e.innerText.trim())
        .filter((v) => v !== "")
        .filter((v, index) => {
          if (index == 0) {
            return !excludeValues.includes(v);
          } else {
            return v;
          }
        });

      console.log("Filtered menu paths:", menuPaths);

      if (menuPaths.length > 0) {
        path += menuPaths.join("/");
        if (!path.endsWith("/")) path += "/";
      }

      // パンくずリストからパスを追加
      const breadcrumbItems = document.querySelectorAll(
        ".ItemListBreadcrumb-listItem"
      );
      console.log("Breadcrumb items:", breadcrumbItems.length);

      const breadcrumbPaths = [...breadcrumbItems]
        .map((v) => v.innerText.trim())
        .filter((v) => v !== "")
        .filter((v, index) => {
          if (menuPaths.length == 0 && index == 0) {
            return !excludeValues.includes(v);
          } else {
            return v;
          }
        });

      console.log("Filtered breadcrumb paths:", breadcrumbPaths);

      if (breadcrumbPaths.length > 0) {
        path += breadcrumbPaths.join("/");
      }

      // "/ファイル"を削除（参考スクリプトと同様）
      path = path.replace("/ファイル", "");

      console.log("Final generated path:", path);

      // クリップボードにコピー
      await copyToClipboard(path);

      // メニューを閉じる
      document.body.click();

      // toastr通知を表示
      showToastrNotification("BoxDriveパスをコピーしました");
    }
  }

  // クリップボードにコピーする関数（GM_setClipboard使用）
  async function copyToClipboard(text) {
    console.log("Copying to clipboard:", text);

    try {
      // GM_setClipboardを使用
      GM_setClipboard(text);
      console.log("クリップボード コピー成功 (GM_setClipboard)");
      return true;
    } catch (error) {
      console.error("GM_setClipboard failed:", error);
    }

    // フォールバック方法1: navigator.clipboard
    try {
      window.focus();
      document.body.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      await navigator.clipboard.writeText(text);
      console.log("クリップボード コピー成功 (navigator.clipboard)");
      return true;
    } catch (error) {
      console.error("navigator.clipboard failed:", error);
    }

    // フォールバック方法2: document.execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (successful) {
        console.log("クリップボード コピー成功 (document.execCommand)");
        return true;
      } else {
        console.error("document.execCommand failed");
        return false;
      }
    } catch (error) {
      console.error("document.execCommand error:", error);
      return false;
    }
  }

  // toastr通知を表示する関数
  function showToastrNotification(message, type = "success") {
    toastr.options = {
      positionClass: "toast-bottom-right",
      timeOut: "1000",
    };

    if (type === "success") {
      toastr.success(message);
    } else {
      toastr.error(message);
    }
  }

  // デバッグ用: 要素の存在確認
  function debugElements() {
    console.log("=== Element Debug ===");

    // ドットボタンの確認
    const dotButtons = document.querySelectorAll(
      ".ItemListBreadcrumb > button"
    );
    console.log("Dot buttons found:", dotButtons.length);
    dotButtons.forEach((btn, index) => {
      console.log(`Dot button ${index}:`, {
        className: btn.className,
        textContent: btn.textContent?.trim(),
        visible: btn.offsetWidth > 0 && btn.offsetHeight > 0,
      });
    });

    // メニューアイテムの確認
    const menuItems = document.querySelectorAll(
      "a[data-resin-target='openfolder'].menu-item"
    );
    console.log("Menu items found:", menuItems.length);
    menuItems.forEach((item, index) => {
      console.log(`Menu item ${index}:`, {
        text: item.innerText?.trim(),
        href: item.href,
        visible: item.offsetWidth > 0 && item.offsetHeight > 0,
      });
    });

    // パンくずリストアイテムの確認
    const breadcrumbItems = document.querySelectorAll(
      ".ItemListBreadcrumb-listItem"
    );
    console.log("Breadcrumb items found:", breadcrumbItems.length);
    breadcrumbItems.forEach((item, index) => {
      console.log(`Breadcrumb item ${index}:`, {
        text: item.innerText?.trim(),
        className: item.className,
        visible: item.offsetWidth > 0 && item.offsetHeight > 0,
      });
    });

    // ItemListBreadcrumb全体の確認
    const breadcrumbContainer = document.querySelector(".ItemListBreadcrumb");
    if (breadcrumbContainer) {
      console.log("ItemListBreadcrumb container found");
      console.log(
        "Container HTML:",
        breadcrumbContainer.outerHTML.substring(0, 500)
      );
    } else {
      console.log("ItemListBreadcrumb container not found");
    }
  }

  // メイン実行関数
  async function executeBoxDrivePathCopy() {
    console.log("=== Main Execution ===");

    try {
      // 指定されたロジックを実行
      await generateAndCopyBoxDrivePath();
    } catch (error) {
      console.error("Error in path generation:", error);
      showToastrNotification("パス生成でエラーが発生しました", "error");
    }
  }

  // UIアイコンを作成する関数（参考スクリプトのスタイルを適用）
  function createCopyIcon() {
    const target_elm = document.querySelector(
      ".header-search.prevent-item-deselection.HeaderSearch--isNewQuickSearch"
    );

    if (target_elm) {
      console.log("Target element found for icon placement");

      // 既存のアイコンを削除
      const existingIcon = document.getElementById("boxdrive_copy_local_link");
      if (existingIcon) {
        existingIcon.remove();
      }

      // クリック用アイコンの追加
      let folder_icon = document.createElement("a");
      let str_icon = document.createTextNode("📂 Click or Alt+S");
      folder_icon.href = "javascript:void(0);";
      folder_icon.style.marginLeft = "8px";
      folder_icon.style.lineHeight = "40px";
      folder_icon.style.textDecoration = "None";
      folder_icon.appendChild(str_icon);
      folder_icon.setAttribute("id", "boxdrive_copy_local_link");
      folder_icon.classList.add("add-link");

      // ターゲット要素の横に追加
      target_elm.insertAdjacentElement("afterend", folder_icon);

      // クリックイベントを追加
      document.getElementById(
        "boxdrive_copy_local_link"
      ).onclick = function () {
        executeBoxDrivePathCopy();
      };

      console.log("BoxDrive copy icon placed");
      return true;
    }
    return false;
  }

  // 青いボタンを作成する関数（フォールバック用）
  function createCopyButton() {
    const button = document.createElement("button");
    button.id = "boxdrive-copy-button";
    button.innerHTML = "BoxDrive<br>パスをコピー";
    button.title = "BoxDriveパスをクリップボードにコピー";
    button.className = `boxdrive-copy-btn`;

    // ボタンのスタイルを追加
    button.style.cssText = `
            background: #0061d5;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            line-height: 1.2;
            margin-left: 10px;
        `;

    button.addEventListener("click", executeBoxDrivePathCopy);

    return button;
  }

  // UIを配置する関数
  function addCopyUI() {
    // まずアイコンの配置を試行
    if (createCopyIcon()) {
      return;
    }

    // アイコンの配置に失敗した場合、ボタンを配置
    const existingButton = document.getElementById("boxdrive-copy-button");
    if (existingButton) {
      existingButton.remove();
    }

    var div;
    if (window.location.href.includes("/folder/")) {
      div = document.querySelector(".action-bar-title");
    }

    if (div) {
      const button = createCopyButton();
      div.insertAdjacentElement("afterend", button);
      console.log("BoxDrive copy button placed");
    }
  }

  // キーボードショートカット（Alt+B）
  document.body.addEventListener("keydown", function (e) {
    if (e.altKey && e.key === "s") {
      executeBoxDrivePathCopy();
    }
  });

  // 初期化
  function initializeExtension() {
    setTimeout(() => {
      addCopyUI();
    }, 3000); // 参考スクリプトと同じ3秒の遅延
  }

  // ページ読み込み完了時に実行
  window.addEventListener("load", (event) => {
    console.log("ページが完全に読み込まれました");
    initializeExtension();
  });

  // URL変更を監視
  let currentUrl = window.location.href;
  const urlObserver = new MutationObserver(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      setTimeout(addCopyUI, 1500);
    }
  });

  urlObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("Tampermonkey script setup complete");
})();
