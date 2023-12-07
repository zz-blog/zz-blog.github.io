import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6d94f49f.js";const b=JSON.parse('{"title":"while","description":null,"frontmatter":{"lang":"zh-CN","title":"while","description":null},"headers":[],"relativePath":"Linux/Shell/知识点/控制结构/while.md","filePath":"Linux/Shell/知识点/控制结构/while.md","lastUpdated":1700319152000}'),p={name:"Linux/Shell/知识点/控制结构/while.md"},e=l(`<h1 id="while" tabindex="-1">while <a class="header-anchor" href="#while" aria-label="Permalink to &quot;while&quot;">​</a></h1><ul><li>while 循环用于不断执行一系列命令，也用于从输入文件中读取数据。其语法格式为：</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">condition</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">command</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">condition</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">command</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li>示例：</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"><span style="color:#E1E4E8;">int</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">while(( $int</span><span style="color:#F97583;">&lt;=</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> ))</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> $int</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;int++&quot;</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292E;">int</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">while(( $int</span><span style="color:#D73A49;">&lt;=</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> ))</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $int</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">let</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;int++&quot;</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>以上实例使用了 Bash let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量，具体可查阅：<a href="https://www.runoob.com/linux/linux-comm-let.html" target="_blank" rel="noreferrer">Bash let 命令</a></p><ul><li>while循环可用于读取键盘信息。下面的例子中，输入信息被设置为变量FILM，按&quot;Ctrl-D&quot;结束循环。</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;按下 &lt;CTRL-D&gt; 退出&#39;</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;输入你最喜欢的网站名: &#39;</span></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">read</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">FILM</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;是的！</span><span style="color:#E1E4E8;">$FILM</span><span style="color:#9ECBFF;"> 是一个好网站&quot;</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;按下 &lt;CTRL-D&gt; 退出&#39;</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;输入你最喜欢的网站名: &#39;</span></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">read</span><span style="color:#24292E;"> </span><span style="color:#032F62;">FILM</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;是的！</span><span style="color:#24292E;">$FILM</span><span style="color:#032F62;"> 是一个好网站&quot;</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>无限循环语法格式：</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">:</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">command</span></span>
<span class="line"><span style="color:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">或者</span></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">command</span></span>
<span class="line"><span style="color:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">或者</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (( ; ; ))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">:</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">command</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">或者</span></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">command</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">或者</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (( ; ; ))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,10),o=[e];function c(r,t,i,y,d,u){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{b as __pageData,h as default};
