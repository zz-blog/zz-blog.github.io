import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3daba8ea.js";const E=JSON.parse('{"title":"合并代码","description":null,"frontmatter":{"lang":"zh-CN","title":"合并代码","description":null},"headers":[],"relativePath":"doc/DevOps/Git/场景/合并代码/合并代码.md","filePath":"packages/doc/src/DevOps/Git/场景/合并代码/合并代码.md","lastUpdated":1702458087000}'),p={name:"doc/DevOps/Git/场景/合并代码/合并代码.md"},e=l(`<h1 id="合并代码" tabindex="-1">合并代码 <a class="header-anchor" href="#合并代码" aria-label="Permalink to &quot;合并代码&quot;">​</a></h1><h3 id="合并多个commit" tabindex="-1">合并多个commit <a class="header-anchor" href="#合并多个commit" aria-label="Permalink to &quot;合并多个commit&quot;">​</a></h3><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 这个命令，将最近4个commit合并为1个，HEAD代表当前版本。</span></span>
<span class="line"><span style="color:#6A737D;"># 将进入VIM界面，你可以修改提交信息。</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rebase</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">HEAD~4</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 可以看到其中分为两个部分，上方未注释的部分是填写要执行的指令，</span></span>
<span class="line"><span style="color:#6A737D;"># 而下方注释的部分则是指令的提示说明。指令部分中由前方的命令名称、commit hash 和 commit message 组成</span></span>
<span class="line"><span style="color:#6A737D;"># 当前我们只要知道 pick 和 squash 这两个命令即可。</span></span>
<span class="line"><span style="color:#6A737D;"># --&gt; pick 的意思是要会执行这个 commit</span></span>
<span class="line"><span style="color:#6A737D;"># --&gt; squash 的意思是这个 commit 会被合并到前一个commit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 我们将 需要保留的 这个 commit 前方的命令改成 squash 或 s，然后输入:wq以保存并退出</span></span>
<span class="line"><span style="color:#6A737D;"># 这是我们会看到 commit message 的编辑界面</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 其中, 非注释部分就是两次的 commit message, 你要做的就是将这两个修改成新的 commit message。</span></span>
<span class="line"><span style="color:#6A737D;"># </span></span>
<span class="line"><span style="color:#6A737D;"># 输入wq保存并推出, 再次输入git log查看 commit 历史信息，你会发现这两个 commit 已经合并了。</span></span>
<span class="line"><span style="color:#6A737D;"># 将修改强制推送到前端</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">push</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">origin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">master</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 这个命令，将最近4个commit合并为1个，HEAD代表当前版本。</span></span>
<span class="line"><span style="color:#6A737D;"># 将进入VIM界面，你可以修改提交信息。</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rebase</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">HEAD~4</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 可以看到其中分为两个部分，上方未注释的部分是填写要执行的指令，</span></span>
<span class="line"><span style="color:#6A737D;"># 而下方注释的部分则是指令的提示说明。指令部分中由前方的命令名称、commit hash 和 commit message 组成</span></span>
<span class="line"><span style="color:#6A737D;"># 当前我们只要知道 pick 和 squash 这两个命令即可。</span></span>
<span class="line"><span style="color:#6A737D;"># --&gt; pick 的意思是要会执行这个 commit</span></span>
<span class="line"><span style="color:#6A737D;"># --&gt; squash 的意思是这个 commit 会被合并到前一个commit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 我们将 需要保留的 这个 commit 前方的命令改成 squash 或 s，然后输入:wq以保存并退出</span></span>
<span class="line"><span style="color:#6A737D;"># 这是我们会看到 commit message 的编辑界面</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 其中, 非注释部分就是两次的 commit message, 你要做的就是将这两个修改成新的 commit message。</span></span>
<span class="line"><span style="color:#6A737D;"># </span></span>
<span class="line"><span style="color:#6A737D;"># 输入wq保存并推出, 再次输入git log查看 commit 历史信息，你会发现这两个 commit 已经合并了。</span></span>
<span class="line"><span style="color:#6A737D;"># 将修改强制推送到前端</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">push</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">origin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">master</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,3),o=[e];function c(t,r,i,m,y,b){return n(),a("div",null,o)}const d=s(p,[["render",c]]);export{E as __pageData,d as default};
