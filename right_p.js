//保存用の許可
// メッセージ受信時のイベントリスナー
window.addEventListener("message", (event) => {
    // 受信したメッセージデータ
    const messageData = event.data;
  
    // オリジンの検証//ローカルファイルのためNGを食らっている
    if (event.origin === "file:///C:/Users/Aoi%20YANAGI/1-sotsuron/basic2.html") {
      // CORSを許可するアクションの処理
      if (messageData.action === "ALLOW_CORS") {
        // CORSを許可する処理を実行する
        document.domain = "file:///C:/Users/Aoi%20YANAGI/1-sotsuron/basic2.html";
      }
    }
  });
  