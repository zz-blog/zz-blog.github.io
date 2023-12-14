import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3daba8ea.js";const d=JSON.parse('{"title":"k8s 批量设置label","description":"","frontmatter":{},"headers":[],"relativePath":"doc/编程语言/Shell/工具脚本/k8s/批量设置label.md","filePath":"packages/doc/src/编程语言/Shell/工具脚本/k8s/批量设置label.md","lastUpdated":1702570157000}'),e={name:"doc/编程语言/Shell/工具脚本/k8s/批量设置label.md"},p=l(`<h1 id="k8s-批量设置label" tabindex="-1">k8s 批量设置label <a class="header-anchor" href="#k8s-批量设置label" aria-label="Permalink to &quot;k8s 批量设置label&quot;">​</a></h1><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">k8sSetLables.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="color:#9ECBFF;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">labels=&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">beta.kubernetes.io/arch=amd64</span></span>
<span class="line"><span style="color:#9ECBFF;">beta.kubernetes.io/os=linux</span></span>
<span class="line"><span style="color:#9ECBFF;">deploy=app</span></span>
<span class="line"><span style="color:#9ECBFF;">kubernetes.io/arch=amd64</span></span>
<span class="line"><span style="color:#9ECBFF;">kubernetes.io/hostname=k8s-node07</span></span>
<span class="line"><span style="color:#9ECBFF;">kubernetes.io/os=linux</span></span>
<span class="line"><span style="color:#9ECBFF;">node-role.kubernetes.io/node=</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">for label in  \${</span><span style="color:#E1E4E8;">labels</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">do</span></span>
<span class="line"><span style="color:#9ECBFF;">  kubectl label nodes k8s-node07  \${</span><span style="color:#E1E4E8;">label</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">echo -e &quot; set label success \\n&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">k8sSetLables.sh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="color:#032F62;"> </span></span>
<span class="line"><span style="color:#032F62;">labels=&quot;</span></span>
<span class="line"><span style="color:#032F62;">beta.kubernetes.io/arch=amd64</span></span>
<span class="line"><span style="color:#032F62;">beta.kubernetes.io/os=linux</span></span>
<span class="line"><span style="color:#032F62;">deploy=app</span></span>
<span class="line"><span style="color:#032F62;">kubernetes.io/arch=amd64</span></span>
<span class="line"><span style="color:#032F62;">kubernetes.io/hostname=k8s-node07</span></span>
<span class="line"><span style="color:#032F62;">kubernetes.io/os=linux</span></span>
<span class="line"><span style="color:#032F62;">node-role.kubernetes.io/node=</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">for label in  \${</span><span style="color:#24292E;">labels</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">do</span></span>
<span class="line"><span style="color:#032F62;">  kubectl label nodes k8s-node07  \${</span><span style="color:#24292E;">label</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">echo -e &quot; set label success \\n&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,2),o=[p];function c(r,t,i,b,F,u){return n(),a("div",null,o)}const E=s(e,[["render",c]]);export{d as __pageData,E as default};
