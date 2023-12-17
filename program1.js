//説明用ポップアップ
let currentPage = 1;

// タイトルの配列
const pageTitles = ['英語ディベートとは？', '勝敗はどう考える？', '「フローシート」にメモしよう！'];

function openPopup() {
  document.getElementById('popup-container').style.display = 'block';
  showPage(currentPage);
}

function closePopup() {
  document.getElementById('popup-container').style.display = 'none';
  currentPage = 1;
}

function nextPage() {
  if (currentPage < 3) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

function showPage(page) {
  const pageTitle = document.getElementById('page-title');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const page1Content = document.getElementById('page1-content');
  const page2Content = document.getElementById('page2-content');
  const page3Content = document.getElementById('page3-content');

  // タイトルを配列から取得
  pageTitle.textContent = pageTitles[page - 1];

  switch (page) {
    case 1:
      page1Content.style.display = 'block';
      page2Content.style.display = 'none';
      page3Content.style.display = 'none';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-block';
      break;
    case 2:
      page1Content.style.display = 'none';
      page2Content.style.display = 'block';
      page3Content.style.display = 'none';
      prevBtn.style.display = 'inline-block';
      nextBtn.style.display = 'inline-block';
      break;
    case 3:
      page1Content.style.display = 'none';
      page2Content.style.display = 'none';
      page3Content.style.display = 'block';
      prevBtn.style.display = 'inline-block';
      nextBtn.style.display = 'none';
      break;
  }
}

//保存用の許可
const targetWindow = document.getElementById("right-flow").contentWindow;
// メッセージデータ
const messageData = {
  action: "ALLOW_CORS",
};
// メッセージ送信
targetWindow.postMessage(messageData, "file:///C:/Users/Aoi%20YANAGI/1-sotsuron/right.html");


//保存
window.onload = function() {
  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.addEventListener('click', saveIframeContent);
  } else {
    console.error('Save button not found.');
  }
};

function saveIframeContent() {
  const iframe = document.getElementById('right-flow');
  if (iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeContent = iframeDoc.documentElement.outerHTML;

    const blob = new Blob([iframeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowsheet_content.html';
    a.click();
  } else {
    console.error('Iframe element not found.');
  }
}

//作成例
function openNewWindow() {
  // 新しいウィンドウを開く際の設定
  var windowFeatures = 'width=500,height=400,location=no,menubar=no,toolbar=no';

  // 新しいウィンドウを開く
  var newWindow = window.open('about:blank', '_blank', windowFeatures);

  // 新しいウィンドウに表示する外部HTMLファイルの指定
  var externalHTMLFile = 'flowsheet_ex.html';

  // 新しいウィンドウに外部HTMLファイルを読み込む
  newWindow.document.location = externalHTMLFile;
}