/**
 * 轻量探测 window.cc：确认是 Cocos 页面后通知 content script 注入完整桥。
 * 独立文件注入（非内联），以兼容 script-src 'self' 的严格 CSP 页面。
 */
(function () {
  try {
    function ok() {
      try {
        return typeof cc !== 'undefined' && cc && cc.director;
      } catch (e) {
        return false;
      }
    }
    function emit() {
      window.postMessage({ source: 'CC_NODE_INSPECTOR_PAGE', type: 'CC_PROBE_OK' }, '*');
    }
    if (ok()) {
      emit();
      return;
    }
    var n = 0;
    var t = setInterval(function () {
      if (ok()) {
        clearInterval(t);
        emit();
      } else if (++n > 120) {
        clearInterval(t);
      }
    }, 250);
  } catch (e) {}
})();
