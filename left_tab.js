function showTab(tabId) {
    // すべてのタブの表示を非アクティブに設定
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // クリックされたタブをアクティブに設定
    var tab = document.getElementById(tabId);
    tab.classList.add('active');

    // 対応するコンテンツを表示
    var contents = document.getElementsByClassName('tab-content');
    for (var j = 0; j < contents.length; j++) {
      contents[j].style.display = 'none';
    }

    var selectedContent = document.getElementById(tabId + '-content');
    selectedContent.style.display = 'block';
}

// ページの読み込みが完了したときに初期設定を行う
window.onload = function () {
    // 最初のタブをアクティブにする
    showTab('tab1');
};



//勝利判定
const radios = document.querySelectorAll('.radio');
const calculateButton1 = document.getElementById('calculateButton1');
const calculateButton2 = document.getElementById('calculateButton2');
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

const itemStates = {
  item1: [false, false, false],
  item1_2: [false, false, false],
  item2: [false, false, false],
  item2_2: [false, false, false],
};

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const item = radio.getAttribute('data-item');
    const stage = parseInt(radio.getAttribute('data-stage')) - 1;

    itemStates[item][stage] = radio.checked;

    if (item === 'item1' || item === 'item1_2') {
      calculateButton1.disabled = !checkIfBothItemsComplete(itemStates.item1, itemStates.item1_2);
    }
    if (item === 'item2' || item === 'item2_2') {
      calculateButton2.disabled = !checkIfBothItemsComplete(itemStates.item2, itemStates.item2_2);
    }
  });
});

function checkIfBothItemsComplete(item1States, item2States) {
  const allItem1Complete = item1States.some(state => state);
  const allItem2Complete = item2States.some(state => state);
  return (allItem1Complete && allItem2Complete);
}

calculateButton1.addEventListener('click', () => {
  const resultText = calculateResult1(itemStates.item1, itemStates.item1_2);
  result1.textContent = `論の強さ(AD): ${resultText}`;
});

calculateButton2.addEventListener('click', () => {
  const resultText = calculateResult2(itemStates.item2, itemStates.item2_2);
  result2.textContent = `論の強さ(DA): ${resultText}`;
});

function calculateResult1() {
  if (itemStates.item1[0] && itemStates.item1_2[0]) {
    return '◎';
  } 
  else if (itemStates.item1[2] && itemStates.item1_2[2]) {
    return '×';
  } 
  else if (
    (itemStates.item1[2] && !itemStates.item1_2[2]) ||
    (!itemStates.item1[2] && itemStates.item1_2[2])
  ) {
    return '△';
  } 
  else {
    return '○';
  }
}

function calculateResult2() {
  if (itemStates.item2[0] && itemStates.item2_2[0]) {
    return '◎';
  } 
  else if (itemStates.item2[2] && itemStates.item2_2[2]) {
    return '×';
  } 
  else if (
    (itemStates.item2[2] && !itemStates.item2_2[2]) ||
    (!itemStates.item2[2] && itemStates.item2_2[2])
  ) {
    return '△';
  } 
  else {
    return '○';
  }
}