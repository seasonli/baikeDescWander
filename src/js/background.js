chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", message, false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var descHTMLFragment = printDescFragment(xhr.responseText, sendResponse);
      sendResponse(descHTMLFragment);
    }
  }
  xhr.send();
});

chrome.contextMenus.create({
  type: 'normal',
  id: 'url',
  title: 'get Description',
  contexts: ['selection'],
  onclick: requestData
});

function getDesc(str) {
  var descHTML = str.match(/<div class="card-summary-content">.*?<\/div>/g)[0].replace(/<div.*?>/g, '').replace(/<\/div>/, '');
  return descHTML;
}

function getDescFragment(str) {
  var length = 0,
    descHTMLFragment = '';
  var tag = false;
  for (var i = 0; i < str.length; i++) {
    // 在标签内
    var letter = str[i];
    if (tag) {
      // 闭合标签
      if (letter == '>') {
        tag = false;
      }
    }
    // 不在标签内
    else {
      // 打开标签
      if (letter == '<') {
        tag = true;
      } else {
        if (str.charCodeAt(i) > 255) {
          length += 2;
        } else {
          length += 1;
        }
      }
    }
    if (length >= 120) {
      break;
    }
    descHTMLFragment += letter;
  }
  return descHTMLFragment;
}

function printDescFragment(responseText, sendResponse) {
  var descHTML = getDesc(responseText);
  var descHTMLFragment = getDescFragment(descHTML);
  return descHTMLFragment;
}