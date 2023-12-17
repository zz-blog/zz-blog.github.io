import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3daba8ea.js";const b=JSON.parse('{"title":"docker-compose 常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Docker/docker-compose/常用命令/命令.md","filePath":"packages/doc/src/DevOps/Docker/docker-compose/常用命令/命令.md","lastUpdated":1702833390000}'),p={name:"doc/DevOps/Docker/docker-compose/常用命令/命令.md"},e=l(`<h1 id="docker-compose-常用命令" tabindex="-1">docker-compose 常用命令 <a class="header-anchor" href="#docker-compose-常用命令" aria-label="Permalink to &quot;docker-compose 常用命令&quot;">​</a></h1><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">my.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">查看docker-compose版本信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">my.yaml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version</span><span style="color:#24292E;">    </span><span style="color:#032F62;">查看docker-compose版本信息</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lnmp.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">images</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">列出镜像</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#9ECBFF;"> lnmp.yaml images </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">    列出镜像ID</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">                     </span><span style="color:#9ECBFF;">构建建启动nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> exec nginx bash            登录到nginx容器中</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lnmp.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">env</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">在容器中运行命令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> down                              删除所有nginx容器,镜像</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> ps                                   显示所有容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">                   </span><span style="color:#9ECBFF;">重新启动nginx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> run </span><span style="color:#79B8FF;">--no-deps</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">--rm</span><span style="color:#9ECBFF;"> php-fpm php </span><span style="color:#79B8FF;">-v</span><span style="color:#9ECBFF;">       在php-fpm中不启动关联容器，并容器执行php </span><span style="color:#79B8FF;">-v</span><span style="color:#9ECBFF;"> 执行完成后删除容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">                     </span><span style="color:#9ECBFF;">构建镜像</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">。</span><span style="color:#E1E4E8;">        </span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> build </span><span style="color:#79B8FF;">--no-cache</span><span style="color:#9ECBFF;"> nginx   不带缓存的构建。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">logs</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">                     </span><span style="color:#9ECBFF;">查看nginx的日志</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> logs </span><span style="color:#79B8FF;">-f</span><span style="color:#9ECBFF;"> nginx                   查看nginx的实时日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> config  </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">                        验证（docker-compose.yml）文件配置，当配置正确时，不输出任何内容，当文件配置错误，输出错误信息。 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> events </span><span style="color:#79B8FF;">--json</span><span style="color:#9ECBFF;"> nginx       以json的形式输出nginx的docker日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> pause nginx                 暂停nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> unpause nginx             恢复ningx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> rm nginx                       删除容器（删除前必须关闭容器）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> stop nginx                    停止nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> start nginx                    启动nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#9ECBFF;"> my.yaml scale nginx=</span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">   将nginx容器扩容为两个</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#9ECBFF;"> my.yaml top               显示运行进程</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#9ECBFF;"> my.yaml top nginx    指定某一个service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker进入容器：docker</span><span style="color:#9ECBFF;"> exec </span><span style="color:#79B8FF;">-it</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">fdcb8d5185e bash  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">报错：OCI</span><span style="color:#9ECBFF;"> runtime exec failed: exec failed: container_linux.go:349: starting container process caused &quot;exec: </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">bash</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">: executable file not found in </span><span style="color:#E1E4E8;">$PATH</span><span style="color:#9ECBFF;">&quot;: unknown</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">解决方法：docker</span><span style="color:#9ECBFF;"> exec </span><span style="color:#79B8FF;">-it</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">fdcb8d5185e sh</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># docker-compose [官网](https://docs.docker.com/compose/compose-file/compose-file-v3/)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## network</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## volume</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## image</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## container</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## extra_hosts</span></span>
<span class="line"><span style="color:#B392F0;">extra_hosts标签作用是</span><span style="color:#9ECBFF;"> 往容器内/etc/hosts文件中添加记录，注意格式是相反的</span></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`</span><span style="color:#B392F0;">shell</span></span>
<span class="line"><span style="color:#B392F0;">extra_hosts:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;www.baidu.com:127.0.0.1&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lnmp.yaml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">images</span><span style="color:#24292E;">      </span><span style="color:#032F62;">列出镜像</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-f</span><span style="color:#032F62;"> lnmp.yaml images </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">    列出镜像ID</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">                     </span><span style="color:#032F62;">构建建启动nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> exec nginx bash            登录到nginx容器中</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lnmp.yaml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">env</span><span style="color:#24292E;">    </span><span style="color:#032F62;">在容器中运行命令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> down                              删除所有nginx容器,镜像</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> ps                                   显示所有容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">                   </span><span style="color:#032F62;">重新启动nginx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> run </span><span style="color:#005CC5;">--no-deps</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">--rm</span><span style="color:#032F62;"> php-fpm php </span><span style="color:#005CC5;">-v</span><span style="color:#032F62;">       在php-fpm中不启动关联容器，并容器执行php </span><span style="color:#005CC5;">-v</span><span style="color:#032F62;"> 执行完成后删除容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">                     </span><span style="color:#032F62;">构建镜像</span><span style="color:#24292E;"> </span><span style="color:#032F62;">。</span><span style="color:#24292E;">        </span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> build </span><span style="color:#005CC5;">--no-cache</span><span style="color:#032F62;"> nginx   不带缓存的构建。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">logs</span><span style="color:#24292E;">  </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">                     </span><span style="color:#032F62;">查看nginx的日志</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> logs </span><span style="color:#005CC5;">-f</span><span style="color:#032F62;"> nginx                   查看nginx的实时日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> config  </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">                        验证（docker-compose.yml）文件配置，当配置正确时，不输出任何内容，当文件配置错误，输出错误信息。 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> events </span><span style="color:#005CC5;">--json</span><span style="color:#032F62;"> nginx       以json的形式输出nginx的docker日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> pause nginx                 暂停nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> unpause nginx             恢复ningx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> rm nginx                       删除容器（删除前必须关闭容器）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> stop nginx                    停止nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> start nginx                    启动nignx容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-f</span><span style="color:#032F62;"> my.yaml scale nginx=</span><span style="color:#005CC5;">2</span><span style="color:#032F62;">   将nginx容器扩容为两个</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-f</span><span style="color:#032F62;"> my.yaml top               显示运行进程</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-f</span><span style="color:#032F62;"> my.yaml top nginx    指定某一个service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker进入容器：docker</span><span style="color:#032F62;"> exec </span><span style="color:#005CC5;">-it</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">fdcb8d5185e bash  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">报错：OCI</span><span style="color:#032F62;"> runtime exec failed: exec failed: container_linux.go:349: starting container process caused &quot;exec: </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">bash</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">: executable file not found in </span><span style="color:#24292E;">$PATH</span><span style="color:#032F62;">&quot;: unknown</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">解决方法：docker</span><span style="color:#032F62;"> exec </span><span style="color:#005CC5;">-it</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">fdcb8d5185e sh</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># docker-compose [官网](https://docs.docker.com/compose/compose-file/compose-file-v3/)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## network</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## volume</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## image</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## container</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## extra_hosts</span></span>
<span class="line"><span style="color:#6F42C1;">extra_hosts标签作用是</span><span style="color:#032F62;"> 往容器内/etc/hosts文件中添加记录，注意格式是相反的</span></span>
<span class="line"><span style="color:#032F62;">\`\`\`</span><span style="color:#6F42C1;">shell</span></span>
<span class="line"><span style="color:#6F42C1;">extra_hosts:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;www.baidu.com:127.0.0.1&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br></div></div><h2 id="hostname" tabindex="-1">hostname <a class="header-anchor" href="#hostname" aria-label="Permalink to &quot;hostname&quot;">​</a></h2><p>hostname标签是设置容器的主机名</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">hostname:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xxxxx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">hostname:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xxxxx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="environment" tabindex="-1">environment <a class="header-anchor" href="#environment" aria-label="Permalink to &quot;environment&quot;">​</a></h2><p>设置环境变量 和dockerfile中ENV作用一致</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">environment:</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 设置环境变量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">RABBITMQ_DEFAULT_VHOST:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">RABBITMQ_DEFAULT_USER:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;guest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">RABBITMQ_DEFAULT_PASS:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;guest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">environment:</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 设置环境变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">RABBITMQ_DEFAULT_VHOST:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">RABBITMQ_DEFAULT_USER:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;guest&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">RABBITMQ_DEFAULT_PASS:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;guest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="ports" tabindex="-1">ports <a class="header-anchor" href="#ports" aria-label="Permalink to &quot;ports&quot;">​</a></h2><h2 id="depends-on" tabindex="-1">depends_on <a class="header-anchor" href="#depends-on" aria-label="Permalink to &quot;depends_on&quot;">​</a></h2><h1 id="docker-compose-config" tabindex="-1">docker-compose config <a class="header-anchor" href="#docker-compose-config" aria-label="Permalink to &quot;docker-compose config&quot;">​</a></h1><p>查看配置，变量会被解析</p><h1 id="清除track缓存" tabindex="-1">清除track缓存 <a class="header-anchor" href="#清除track缓存" aria-label="Permalink to &quot;清除track缓存&quot;">​</a></h1><p>git rm -r --cached .</p><h2 id="healthcheck" tabindex="-1">healthcheck <a class="header-anchor" href="#healthcheck" aria-label="Permalink to &quot;healthcheck&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">healthcheck:</span></span>
<span class="line"><span style="color:#e1e4e8;">      test:</span></span>
<span class="line"><span style="color:#e1e4e8;">        [</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;CMD-SHELL&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;curl -s --user \${ELASTIC_USERNAME}:\${ELASTIC_PASSWORD} http://localhost:9200 | grep -q &#39;missing authentication credentials&#39;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">      interval: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">      timeout: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">      retries: 120</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">healthcheck:</span></span>
<span class="line"><span style="color:#24292e;">      test:</span></span>
<span class="line"><span style="color:#24292e;">        [</span></span>
<span class="line"><span style="color:#24292e;">          &quot;CMD-SHELL&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;curl -s --user \${ELASTIC_USERNAME}:\${ELASTIC_PASSWORD} http://localhost:9200 | grep -q &#39;missing authentication credentials&#39;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        ]</span></span>
<span class="line"><span style="color:#24292e;">      interval: 10s</span></span>
<span class="line"><span style="color:#24292e;">      timeout: 10s</span></span>
<span class="line"><span style="color:#24292e;">      retries: 120</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,17),o=[e];function c(r,t,i,y,F,m){return n(),a("div",null,o)}const d=s(p,[["render",c]]);export{b as __pageData,d as default};
