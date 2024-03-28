import{_ as n,c as e,m as s,a as p,t as l,a5 as t,o as r}from"./chunks/framework.DwbewbAn.js";const I=JSON.parse('{"title":"WORKDIR","description":"","frontmatter":{"title":"WORKDIR"},"headers":[],"relativePath":"doc/DevOps/Docker/Dockerfile/WORKDIR.md","filePath":"packages/doc/src/DevOps/Docker/Dockerfile/WORKDIR.md","lastUpdated":1705850916000}'),i={name:"doc/DevOps/Docker/Dockerfile/WORKDIR.md"},c={id:"frontmatter-title",tabindex:"-1"},o=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),d=t(`<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1.Dockerfile中的WORKDIR指令用于指定容器的一个目录， 容器启动时执行的命令会在该目录下执行。</span></span>
<span class="line"><span>2.WORKDIR指令设置Dockerfile中的任何RUN，CMD，ENTRPOINT，COPY和ADD指令的工作目录。如果WORKDIR指 定的目录不存在，即使随后的指令没有用到这个目录，都会创建。</span></span>
<span class="line"><span>单个Dockerfile可以使用多次WORKFDIR。如果提供一个相对路径，当前的工作目录将于上个WORKDIR指令相关。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>WORKDIR /a</span></span>
<span class="line"><span>WORKDIR b</span></span>
<span class="line"><span>WORKDIR c</span></span>
<span class="line"><span>RUN pwd</span></span>
<span class="line"><span>pwd命令的输出/a/b/c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WORKDIR可以解析之前由ENV设置的环境变量</span></span>
<span class="line"><span>ENV DIRPATH /path</span></span>
<span class="line"><span>WORKDIR $DIRPATH/$DIRNAME</span></span>
<span class="line"><span>RUN pwd</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="hosts修改丢失问题" tabindex="-1">hosts修改丢失问题 <a class="header-anchor" href="#hosts修改丢失问题" aria-label="Permalink to &quot;hosts修改丢失问题&quot;">​</a></h2><p>RUN命令修改hosts文件，发现启动容器后不生效。因为容器创建会动态生成/etc/hosts，所以编译镜像期间修改无效。</p><ul><li>docker run --add-host</li><li>docker-compose中使用extra-hosts进行添加</li><li>容器启动脚本中使用shell动态添加</li></ul>`,4);function R(a,b,D,m,h,u){return r(),e("div",null,[s("h1",c,[p(l(a.$frontmatter.title)+" ",1),o]),d])}const O=n(i,[["render",R]]);export{I as __pageData,O as default};
