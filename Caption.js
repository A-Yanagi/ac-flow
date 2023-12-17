//動画字幕
  //IFrame Player API の読み込み
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // ローカルファイルの読み込み（場所を移動）
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'data_1.json.js';
  firstScriptTag.parentNode.insertBefore(script, firstScriptTag);


  // YouTubeの埋め込み
  function onYouTubeIframeAPIReady() {
    player = new YT.Player(
        'video', // 埋め込む場所の指定
          { width: 320, // プレーヤーの幅
            height: 200, // プレーヤーの高さ
            videoId: 'W34iWqkaiU0', // YouTubeのID 
            events: {
                'onReady': function(event) {
                    startCaptionDisplay();
                  },
                  'onStateChange': function(event) {
                    if (event.data == YT.PlayerState.PAUSED) {
                      stopCaptionDisplay();
                    } else if (event.data == YT.PlayerState.PLAYING) {
                      startCaptionDisplay();
                    }
                  }
            }
          }
    );
  };

  // document.addEventListener("DOMContentLoaded", function () {
      // var script = document.createElement('script');  
      // script.type = 'text/javascript';
      // script.src = 'data_1.json.js';
      const videoElement = document.getElementById("video");
      let jsonData = [];
      let interval;

      //ローカルファイルの読み込みのため
      script.onload = function () {
        jsonData = window.DEBATE; 
        console.log(jsonData,"ohoho")
      }

      // Create a caption element 
      const captionElement = document.getElementById("caption");

      function displayCaption() {
          const CurrentTime = player.getCurrentTime();

          for (let i = 0; i < jsonData.length; i++) {
              const captionData = jsonData[i];
              if (CurrentTime > captionData.time) {
                  captionElement.textContent = `Caption: ${captionData.caption}`;
              } else {
                  break; // 時間がCurrentTimeよりも大きくなったらループ終了
              }
          }
      }

      function startCaptionDisplay() {
          interval = setInterval(displayCaption, 200); // 0.2秒ごとに実行
      }

      function stopCaptionDisplay() {
          clearInterval(interval);
      }

