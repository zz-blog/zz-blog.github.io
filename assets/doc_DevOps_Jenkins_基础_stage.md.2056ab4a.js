import{_ as n,o as e,c as l,k as s,a as p,t,Q as o}from"./chunks/framework.3daba8ea.js";const u=JSON.parse('{"title":"stage","description":"","frontmatter":{"title":"stage"},"headers":[],"relativePath":"doc/DevOps/Jenkins/基础/stage.md","filePath":"packages/doc/src/DevOps/Jenkins/基础/stage.md","lastUpdated":1704107537000}'),r={name:"doc/DevOps/Jenkins/基础/stage.md"},c={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),E=o(`<ul><li><a href="https://www.jenkins.io/doc/book/pipeline/syntax/#stage" target="_blank" rel="noreferrer">stage</a></li></ul><h2 id="stage" tabindex="-1">stage <a class="header-anchor" href="#stage" aria-label="Permalink to &quot;stage&quot;">​</a></h2><p>内部包含一个或者多个steps</p><div class="language-groovy vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,4);function d(a,y,b,g,m,_){return e(),l("div",null,[s("h1",c,[p(t(a.$frontmatter.title)+" ",1),i]),E])}const f=n(r,[["render",d]]);export{u as __pageData,f as default};
