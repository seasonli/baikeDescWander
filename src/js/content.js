var newsWrapper = document.querySelector('#newsWrapper');
newsWrapper.onkeyup = function(e) {
  e.stopPropagation();
  var urlElem = e.target;
  var urlWrapperElem = e.target.parentNode.parentNode.parentNode;
  var descWrapperElem = urlWrapperElem.parentNode.querySelector('[_jattr="desc"]');
  var descElem = descWrapperElem.querySelector('textarea');
  var urlWrapperElemAttr = urlWrapperElem.attributes;
  for (var i in urlWrapperElemAttr) {
    if (urlWrapperElemAttr[i].name == '_jattr' && urlWrapperElemAttr[i].value == 'url') {
      chrome.runtime.sendMessage(urlElem.value, function(res) {
        descElem.value = res;
      })
    }
  }
}