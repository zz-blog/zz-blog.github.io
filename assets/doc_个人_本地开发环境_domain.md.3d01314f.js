import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.3daba8ea.js";const F=JSON.parse('{"title":"添加域名","description":"","frontmatter":{"order":2},"headers":[],"relativePath":"doc/个人/本地开发环境/domain.md","filePath":"packages/doc/src/个人/本地开发环境/domain.md","lastUpdated":1702458087000}'),p={name:"doc/个人/本地开发环境/domain.md"},e=l(`<h1 id="添加域名" tabindex="-1">添加域名 <a class="header-anchor" href="#添加域名" aria-label="Permalink to &quot;添加域名&quot;">​</a></h1><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/hosts</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;"># ZZ DOMAIN START</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.252 zz.harbor.com</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.5 k8s.web.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;"># ZZ DOMAIN END</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/hosts</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;"># ZZ DOMAIN START</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.252 zz.harbor.com</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.5 k8s.web.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;"># ZZ DOMAIN END</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,2),o=[e];function c(t,r,i,d,E,m){return a(),n("div",null,o)}const b=s(p,[["render",c]]);export{F as __pageData,b as default};
