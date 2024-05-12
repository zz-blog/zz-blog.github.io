import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.CzsDe1xi.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Git/实战/全局忽略DS_Store/git全局忽略.DS_Store文件.md","filePath":"packages/doc/src/DevOps/Git/实战/全局忽略DS_Store/git全局忽略.DS_Store文件.md","lastUpdated":1704208495000}'),e={name:"doc/DevOps/Git/实战/全局忽略DS_Store/git全局忽略.DS_Store文件.md"},l=p(`<p><strong>让 Git 全局性的忽略 .DS_Store</strong></p><p>Mac中每个目录都会有个文件叫.DS_Store,用于存储当前文件夹的一些Meta信息。每次提交代码时，我都要在代码仓库的.gitignore中声明，忽略这类文件。有方法可以全局性的忽略某种类型的文件吗？</p><p><strong>按照以下两步就可实现</strong></p><p>1.创建~/.gitignore_global文件，把需要全局忽略的文件类型塞到这个文件里。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># .gitignore_global</span></span>
<span class="line"><span>####################################</span></span>
<span class="line"><span>######## OS generated files ########</span></span>
<span class="line"><span>####################################</span></span>
<span class="line"><span>.DS_Store</span></span>
<span class="line"><span>.DS_Store?</span></span>
<span class="line"><span>*.swp</span></span>
<span class="line"><span>._*</span></span>
<span class="line"><span>.Spotlight-V100</span></span>
<span class="line"><span>.Trashes</span></span>
<span class="line"><span>Icon?</span></span>
<span class="line"><span>ehthumbs.db</span></span>
<span class="line"><span>Thumbs.db</span></span>
<span class="line"><span>####################################</span></span>
<span class="line"><span>############# Packages #############</span></span>
<span class="line"><span>####################################</span></span>
<span class="line"><span>*.7z</span></span>
<span class="line"><span>*.dmg</span></span>
<span class="line"><span>*.gz</span></span>
<span class="line"><span>*.iso</span></span>
<span class="line"><span>*.jar</span></span>
<span class="line"><span>*.rar</span></span>
<span class="line"><span>*.tar</span></span>
<span class="line"><span>*.zip</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>2.在~/.gitconfig中引入.gitignore_global。</p><p>这是我的.gitconfig文件:</p><p>[user] name = yonghuming email = <a href="mailto:xxxxx@gmail.com" target="_blank" rel="noreferrer">xxxxx@gmail.com</a> [push] default = matching [core] excludesfile = /Users/yonghuming/.gitignore_global</p><p>3.搞定了！在所有的文件夹下.DS_Store .swp .zip等文件类型会被Git自动忽略。</p>`,9),i=[l];function r(c,t,o,b,_,m){return a(),n("div",null,i)}const d=s(e,[["render",r]]);export{u as __pageData,d as default};
