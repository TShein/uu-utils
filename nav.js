/* Shared sidebar + theme + toast for all tools */
(function(){
  var PAGES = [
    {id:"index",    icon:"🏠", label:"首页", href:"index.html"},
    {id:"json",     icon:"{ }",label:"JSON", href:"json-formatter.html"},
    {id:"timestamp",icon:"⏱", label:"Timestamp", href:"timestamp.html"},
    {id:"cron",     icon:"🕐", label:"Cron", href:"cron.html"},
    {id:"password", icon:"🔑", label:"Password", href:"password.html"},
    {id:"regex",    icon:"⚡", label:"Regex", href:"regex.html"},
    {id:"diff",     icon:"≠", label:"Diff", href:"diff.html"},
    {id:"color",    icon:"🎨", label:"Color", href:"color.html"},
  ];

  var brandNames = {
    json:"{ } JSON", timestamp:"Timestamp", cron:"Cron",
    password:"Password", regex:"Regex", diff:"Diff", color:"Color"
  };
  var brandSubs = {
    json:"格式化 & 树形预览", timestamp:"Unix 时间戳转换", cron:"定时任务表达式",
    password:"随机密码生成", regex:"正则测试 & 生成", diff:"文本差异比对", color:"颜色空间转换"
  };

  function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* render sidebar into #sidebar element */
  window.initSidebar = function(activeId) {
    var name = brandNames[activeId] || "uu-utils";
    var sub  = brandSubs[activeId] || "";
    var html = '<div class="sidebar-brand"><div class="name">'+esc(name)+'</div>';
    if (sub) html += '<div class="sub">'+esc(sub)+'</div>';
    html += '</div><nav class="sidebar-nav">';
    PAGES.forEach(function(p){
      var cls = p.id === activeId ? ' class="active"' : '';
      html += '<a href="'+p.href+'"'+cls+'><span class="icon">'+p.icon+'</span> '+p.label+'</a>';
    });
    html += '</nav><div class="sidebar-bottom"><button onclick="toggleTheme()" class="theme-btn" id="themeBtn">🌙 深色模式</button></div>';
    var sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.innerHTML = html;
  };

  /* theme */
  var saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  function updateThemeBtn() {
    var btn = document.getElementById("themeBtn");
    if (!btn) return;
    btn.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "☀️ 浅色模式" : "🌙 深色模式";
  }
  updateThemeBtn();
  window.toggleTheme = function() {
    var n = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", n);
    localStorage.setItem("theme", n);
    updateThemeBtn();
    /* dispatch event so pages can react */
    window.dispatchEvent(new CustomEvent("themechange", {detail:{theme:n}}));
  };

  /* toast */
  var tmr;
  window.showToast = function(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    clearTimeout(tmr);
    el.textContent = msg; el.classList.add("show");
    tmr = setTimeout(function(){ el.classList.remove("show"); }, 1500);
  };
  window.copyText = function(text) {
    navigator.clipboard.writeText(text).then(function(){ showToast("已复制"); });
  };
})();
