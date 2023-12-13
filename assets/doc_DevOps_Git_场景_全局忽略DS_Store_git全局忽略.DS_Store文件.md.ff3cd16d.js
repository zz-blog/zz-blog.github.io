import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.3daba8ea.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Git/场景/全局忽略DS_Store/git全局忽略.DS_Store文件.md","filePath":"packages/doc/src/DevOps/Git/场景/全局忽略DS_Store/git全局忽略.DS_Store文件.md","lastUpdated":1702458087000}'),p={name:"doc/DevOps/Git/场景/全局忽略DS_Store/git全局忽略.DS_Store文件.md"},l=e(`<p><strong>让 Git 全局性的忽略 .DS_Store</strong></p><p>Mac中每个目录都会有个文件叫.DS_Store,用于存储当前文件夹的一些Meta信息。每次提交代码时，我都要在代码仓库的.gitignore中声明，忽略这类文件。有方法可以全局性的忽略某种类型的文件吗？</p><p><strong>按照以下两步就可实现</strong></p><p>1.创建~/.gitignore_global文件，把需要全局忽略的文件类型塞到这个文件里。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># .gitignore_global</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">######## OS generated files ########</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">.DS_Store</span></span>
<span class="line"><span style="color:#e1e4e8;">.DS_Store?</span></span>
<span class="line"><span style="color:#e1e4e8;">*.swp</span></span>
<span class="line"><span style="color:#e1e4e8;">._*</span></span>
<span class="line"><span style="color:#e1e4e8;">.Spotlight-V100</span></span>
<span class="line"><span style="color:#e1e4e8;">.Trashes</span></span>
<span class="line"><span style="color:#e1e4e8;">Icon?</span></span>
<span class="line"><span style="color:#e1e4e8;">ehthumbs.db</span></span>
<span class="line"><span style="color:#e1e4e8;">Thumbs.db</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">############# Packages #############</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">*.7z</span></span>
<span class="line"><span style="color:#e1e4e8;">*.dmg</span></span>
<span class="line"><span style="color:#e1e4e8;">*.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">*.iso</span></span>
<span class="line"><span style="color:#e1e4e8;">*.jar</span></span>
<span class="line"><span style="color:#e1e4e8;">*.rar</span></span>
<span class="line"><span style="color:#e1e4e8;">*.tar</span></span>
<span class="line"><span style="color:#e1e4e8;">*.zip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># .gitignore_global</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">######## OS generated files ########</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">.DS_Store</span></span>
<span class="line"><span style="color:#24292e;">.DS_Store?</span></span>
<span class="line"><span style="color:#24292e;">*.swp</span></span>
<span class="line"><span style="color:#24292e;">._*</span></span>
<span class="line"><span style="color:#24292e;">.Spotlight-V100</span></span>
<span class="line"><span style="color:#24292e;">.Trashes</span></span>
<span class="line"><span style="color:#24292e;">Icon?</span></span>
<span class="line"><span style="color:#24292e;">ehthumbs.db</span></span>
<span class="line"><span style="color:#24292e;">Thumbs.db</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">############# Packages #############</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">*.7z</span></span>
<span class="line"><span style="color:#24292e;">*.dmg</span></span>
<span class="line"><span style="color:#24292e;">*.gz</span></span>
<span class="line"><span style="color:#24292e;">*.iso</span></span>
<span class="line"><span style="color:#24292e;">*.jar</span></span>
<span class="line"><span style="color:#24292e;">*.rar</span></span>
<span class="line"><span style="color:#24292e;">*.tar</span></span>
<span class="line"><span style="color:#24292e;">*.zip</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>2.在~/.gitconfig中引入.gitignore_global。</p><p>这是我的.gitconfig文件:</p><p>[user] name = yonghuming email = <a href="mailto:xxxxx@gmail.com" target="_blank" rel="noreferrer">xxxxx@gmail.com</a> [push] default = matching [core] excludesfile = /Users/yonghuming/.gitignore_global</p><p>3.搞定了！在所有的文件夹下.DS_Store .swp .zip等文件类型会被Git自动忽略。</p>`,9),o=[l];function r(c,t,i,b,g,_){return n(),a("div",null,o)}const u=s(p,[["render",r]]);export{y as __pageData,u as default};
