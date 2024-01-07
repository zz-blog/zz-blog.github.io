import{_ as n,o as e,c as l,k as s,a as p,t,Q as o}from"./chunks/framework.3daba8ea.js";const h=JSON.parse('{"title":"stages","description":"","frontmatter":{"title":"stages"},"headers":[],"relativePath":"doc/DevOps/Jenkins/基础/stages.md","filePath":"packages/doc/src/DevOps/Jenkins/基础/stages.md","lastUpdated":1704107537000}'),r={name:"doc/DevOps/Jenkins/基础/stages.md"},c={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),E=o(`<ul><li><a href="https://www.jenkins.io/doc/book/pipeline/syntax/#stages" target="_blank" rel="noreferrer">stages</a></li></ul><div class="language-groovy vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
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
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,2);function d(a,y,b,m,_,g){return e(),l("div",null,[s("h1",c,[p(t(a.$frontmatter.title)+" ",1),i]),E])}const f=n(r,[["render",d]]);export{h as __pageData,f as default};
