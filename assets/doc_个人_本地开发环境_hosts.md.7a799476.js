import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3daba8ea.js";const E=JSON.parse('{"title":"添加hosts","description":"","frontmatter":{"order":1},"headers":[],"relativePath":"doc/个人/本地开发环境/hosts.md","filePath":"packages/doc/src/个人/本地开发环境/hosts.md","lastUpdated":1702570157000}'),p={name:"doc/个人/本地开发环境/hosts.md"},e=l(`<h1 id="添加hosts" tabindex="-1">添加hosts <a class="header-anchor" href="#添加hosts" aria-label="Permalink to &quot;添加hosts&quot;">​</a></h1><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/hosts</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;"># ZZ HOSTS START</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.4 k8s-master</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.5 k8s-node1</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.6 k8s-node2</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.10 k8s-nfs</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.11 k8s-harbor</span></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.12 devops-gitlab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">192.168.200.253 zzenv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;"># ZZ HOSTS END</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/hosts</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;"># ZZ HOSTS START</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">192.168.200.4 k8s-master</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.5 k8s-node1</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.6 k8s-node2</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.10 k8s-nfs</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.11 k8s-harbor</span></span>
<span class="line"><span style="color:#032F62;">192.168.200.12 devops-gitlab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">192.168.200.253 zzenv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;"># ZZ HOSTS END</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,2),o=[e];function c(t,r,i,d,F,b){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{E as __pageData,h as default};
