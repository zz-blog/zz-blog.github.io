import{_ as a,c as e,m as s,a as p,t as l,a5 as i,o as t}from"./chunks/framework.DwbewbAn.js";const g=JSON.parse('{"title":"声明式JenkinsFile详解","description":"","frontmatter":{"title":"声明式JenkinsFile详解"},"headers":[],"relativePath":"doc/DevOps/Jenkins/基础/脚本式语法.md","filePath":"packages/doc/src/DevOps/Jenkins/基础/脚本式语法.md","lastUpdated":1704107537000}'),r={name:"doc/DevOps/Jenkins/基础/脚本式语法.md"},c={id:"frontmatter-title",tabindex:"-1"},o=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),b=i(`<ul><li><a href="https://www.jenkins.io/doc/book/pipeline/syntax/" target="_blank" rel="noreferrer">pipeline syntax</a></li></ul><h2 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h2><ul><li>以Groovy语言为基础，语法结构同Groovy相同</li><li>脚本化提供了很少的限制, 限制往往是由Groovy子集本身定义的，而不是任何特定于流水线的系统</li><li>高级用户和那些有更复杂需求的人的理想选择</li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>node {</span></span>
<span class="line"><span>    def mvnHome</span></span>
<span class="line"><span>    stage(&#39;Preparation&#39;) { // for display purposes</span></span>
<span class="line"><span>        // Get some code from a GitHub repository</span></span>
<span class="line"><span>        git &#39;https://github.com/jglick/simple-maven-project-with-tests.git&#39;</span></span>
<span class="line"><span>        // Get the Maven tool.</span></span>
<span class="line"><span>        // ** NOTE: This &#39;M3&#39; Maven tool must be configured</span></span>
<span class="line"><span>        // **       in the global configuration.</span></span>
<span class="line"><span>        mvnHome = tool &#39;M3&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Build&#39;) {</span></span>
<span class="line"><span>        // Run the maven build</span></span>
<span class="line"><span>        withEnv([&quot;MVN_HOME=$mvnHome&quot;]) {</span></span>
<span class="line"><span>            if (isUnix()) {</span></span>
<span class="line"><span>                sh &#39;&quot;$MVN_HOME/bin/mvn&quot; -Dmaven.test.failure.ignore clean package&#39;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                bat(/&quot;%MVN_HOME%\\bin\\mvn&quot; -Dmaven.test.failure.ignore clean package/)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Results&#39;) {</span></span>
<span class="line"><span>        junit &#39;**/target/surefire-reports/TEST-*.xml&#39;</span></span>
<span class="line"><span>        archiveArtifacts &#39;target/*.jar&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,5);function u(n,m,d,h,_,v){return t(),e("div",null,[s("h1",c,[p(l(n.$frontmatter.title)+" ",1),o]),b])}const k=a(r,[["render",u]]);export{g as __pageData,k as default};
