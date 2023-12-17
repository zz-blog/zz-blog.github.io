import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.3daba8ea.js";const I=JSON.parse('{"title":"WORKDIR","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Docker/Dockerfile/WORKDIR.md","filePath":"packages/doc/src/DevOps/Docker/Dockerfile/WORKDIR.md","lastUpdated":1702833390000}'),l={name:"doc/DevOps/Docker/Dockerfile/WORKDIR.md"},p=e(`<h1 id="workdir" tabindex="-1">WORKDIR <a class="header-anchor" href="#workdir" aria-label="Permalink to &quot;WORKDIR&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.Dockerfile中的WORKDIR指令用于指定容器的一个目录， 容器启动时执行的命令会在该目录下执行。</span></span>
<span class="line"><span style="color:#e1e4e8;">2.WORKDIR指令设置Dockerfile中的任何RUN，CMD，ENTRPOINT，COPY和ADD指令的工作目录。如果WORKDIR指 定的目录不存在，即使随后的指令没有用到这个目录，都会创建。</span></span>
<span class="line"><span style="color:#e1e4e8;">单个Dockerfile可以使用多次WORKFDIR。如果提供一个相对路径，当前的工作目录将于上个WORKDIR指令相关。</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">WORKDIR /a</span></span>
<span class="line"><span style="color:#e1e4e8;">WORKDIR b</span></span>
<span class="line"><span style="color:#e1e4e8;">WORKDIR c</span></span>
<span class="line"><span style="color:#e1e4e8;">RUN pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">pwd命令的输出/a/b/c</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">WORKDIR可以解析之前由ENV设置的环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">ENV DIRPATH /path</span></span>
<span class="line"><span style="color:#e1e4e8;">WORKDIR $DIRPATH/$DIRNAME</span></span>
<span class="line"><span style="color:#e1e4e8;">RUN pwd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.Dockerfile中的WORKDIR指令用于指定容器的一个目录， 容器启动时执行的命令会在该目录下执行。</span></span>
<span class="line"><span style="color:#24292e;">2.WORKDIR指令设置Dockerfile中的任何RUN，CMD，ENTRPOINT，COPY和ADD指令的工作目录。如果WORKDIR指 定的目录不存在，即使随后的指令没有用到这个目录，都会创建。</span></span>
<span class="line"><span style="color:#24292e;">单个Dockerfile可以使用多次WORKFDIR。如果提供一个相对路径，当前的工作目录将于上个WORKDIR指令相关。</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">WORKDIR /a</span></span>
<span class="line"><span style="color:#24292e;">WORKDIR b</span></span>
<span class="line"><span style="color:#24292e;">WORKDIR c</span></span>
<span class="line"><span style="color:#24292e;">RUN pwd</span></span>
<span class="line"><span style="color:#24292e;">pwd命令的输出/a/b/c</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">WORKDIR可以解析之前由ENV设置的环境变量</span></span>
<span class="line"><span style="color:#24292e;">ENV DIRPATH /path</span></span>
<span class="line"><span style="color:#24292e;">WORKDIR $DIRPATH/$DIRNAME</span></span>
<span class="line"><span style="color:#24292e;">RUN pwd</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="hosts修改丢失问题" tabindex="-1">hosts修改丢失问题 <a class="header-anchor" href="#hosts修改丢失问题" aria-label="Permalink to &quot;hosts修改丢失问题&quot;">​</a></h2><p>RUN命令修改hosts文件，发现启动容器后不生效。因为容器创建会动态生成/etc/hosts，所以编译镜像期间修改无效。</p><ul><li>docker run --add-host</li><li>docker-compose中使用extra-hosts进行添加</li><li>容器启动脚本中使用shell动态添加</li></ul>`,5),c=[p];function o(r,t,i,R,D,d){return n(),a("div",null,c)}const h=s(l,[["render",o]]);export{I as __pageData,h as default};
