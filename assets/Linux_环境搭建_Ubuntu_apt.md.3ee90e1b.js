import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.6d94f49f.js";const h=JSON.parse('{"title":"apt 常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"Linux/环境搭建/Ubuntu/apt.md","filePath":"Linux/环境搭建/Ubuntu/apt.md","lastUpdated":1701153374000}'),l={name:"Linux/环境搭建/Ubuntu/apt.md"},e=p(`<h1 id="apt-常用命令" tabindex="-1">apt 常用命令 <a class="header-anchor" href="#apt-常用命令" aria-label="Permalink to &quot;apt 常用命令&quot;">​</a></h1><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 查看包详情</span></span>
<span class="line"><span style="color:#B392F0;">apt-cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">show</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">包名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 已安装的包</span></span>
<span class="line"><span style="color:#B392F0;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--installed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看损坏的依赖</span></span>
<span class="line"><span style="color:#B392F0;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">check</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看包详情</span></span>
<span class="line"><span style="color:#6F42C1;">apt-cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">show</span><span style="color:#24292E;"> </span><span style="color:#032F62;">包名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 已安装的包</span></span>
<span class="line"><span style="color:#6F42C1;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--installed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看损坏的依赖</span></span>
<span class="line"><span style="color:#6F42C1;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">check</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,2),t=[e];function o(c,r,i,d,y,u){return a(),n("div",null,t)}const _=s(l,[["render",o]]);export{h as __pageData,_ as default};
