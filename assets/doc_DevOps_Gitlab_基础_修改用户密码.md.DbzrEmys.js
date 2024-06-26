import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.CzsDe1xi.js";const u=JSON.parse('{"title":"gitlab修改用户密码","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Gitlab/基础/修改用户密码.md","filePath":"packages/doc/src/DevOps/Gitlab/基础/修改用户密码.md","lastUpdated":1703174217000}'),l={name:"doc/DevOps/Gitlab/基础/修改用户密码.md"},n=e(`<h1 id="gitlab修改用户密码" tabindex="-1">gitlab修改用户密码 <a class="header-anchor" href="#gitlab修改用户密码" aria-label="Permalink to &quot;gitlab修改用户密码&quot;">​</a></h1><h2 id="首先进入-docker-容器。" tabindex="-1">首先进入 docker 容器。 <a class="header-anchor" href="#首先进入-docker-容器。" aria-label="Permalink to &quot;首先进入 docker 容器。&quot;">​</a></h2><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitlab</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="进入控制台" tabindex="-1">进入控制台 <a class="header-anchor" href="#进入控制台" aria-label="Permalink to &quot;进入控制台&quot;">​</a></h2><p>然后在生产环境下打开 GitLab Rails 的控制台，这将连接到 gitlab 的数据库，需要谨慎操作。</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gitlab-rails</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> console</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> production</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>等待加载完后会进入控制台，然后就是通过用户名或邮箱找到用户，比如阿蛮君的管理员用户账号是 root。</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> User.find_by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">username:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;root&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>通过上一步查找到 root 用户，并赋值给 user，现在可以通过 user 更改密码。</p><p><strong>注意</strong>： 密码不能随意设置，不能有常用密码的连续字符</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user.password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;xxxx&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user.password_confirmation</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;xxxx&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>修改密码后进行保存即可。</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user.save!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这样，密码就修改好了，使用 exit 命令退出即可。</p>`,14),t=[n];function p(h,r,d,o,c,k){return i(),a("div",null,t)}const b=s(l,[["render",p]]);export{u as __pageData,b as default};
