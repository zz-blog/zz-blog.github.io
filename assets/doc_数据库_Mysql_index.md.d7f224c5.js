import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.3daba8ea.js";const h=JSON.parse('{"title":"MYSQL知识点总结","description":null,"frontmatter":{"lang":"zh-CN","title":"MYSQL知识点总结","description":null},"headers":[],"relativePath":"doc/数据库/Mysql/index.md","filePath":"packages/doc/src/数据库/Mysql/index.md","lastUpdated":1702458087000}'),l={name:"doc/数据库/Mysql/index.md"},p=e(`<h1 id="mysql知识点总结" tabindex="-1">mysql知识点总结 <a class="header-anchor" href="#mysql知识点总结" aria-label="Permalink to &quot;mysql知识点总结&quot;">​</a></h1><ul><li><a href="https://dev.mysql.com/doc/" target="_blank" rel="noreferrer">官方文档</a></li></ul><h1 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.架构</span></span>
<span class="line"><span style="color:#e1e4e8;">客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">server层</span></span>
<span class="line"><span style="color:#e1e4e8;">存储引擎层</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2.三大范式</span></span>
<span class="line"><span style="color:#e1e4e8;">第一范式1NF：确保数据库表字段的原子性</span></span>
<span class="line"><span style="color:#e1e4e8;">第二范式2NF：首先要满足第一范式，另外包含两部分内容，一是表必须有一个主键；二是非主键列必须完全依赖于主键，而不能只依赖于主键的一部分。</span></span>
<span class="line"><span style="color:#e1e4e8;">第三范式3NF：首先要满足第二范式，另外非主键列必须直接依赖于主键，不能存在传递依赖。即不能存在：非主键列 A 依赖于非主键列 B，非主键列 B 依赖于主键的情况。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.架构</span></span>
<span class="line"><span style="color:#24292e;">客户端</span></span>
<span class="line"><span style="color:#24292e;">server层</span></span>
<span class="line"><span style="color:#24292e;">存储引擎层</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2.三大范式</span></span>
<span class="line"><span style="color:#24292e;">第一范式1NF：确保数据库表字段的原子性</span></span>
<span class="line"><span style="color:#24292e;">第二范式2NF：首先要满足第一范式，另外包含两部分内容，一是表必须有一个主键；二是非主键列必须完全依赖于主键，而不能只依赖于主键的一部分。</span></span>
<span class="line"><span style="color:#24292e;">第三范式3NF：首先要满足第二范式，另外非主键列必须直接依赖于主键，不能存在传递依赖。即不能存在：非主键列 A 依赖于非主键列 B，非主键列 B 依赖于主键的情况。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h1><ul><li>隔离级别</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">读已提交</span></span>
<span class="line"><span style="color:#e1e4e8;">读未提交</span></span>
<span class="line"><span style="color:#e1e4e8;">可重复读</span></span>
<span class="line"><span style="color:#e1e4e8;">串行化</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">脏读、不可重复读、幻读</span></span>
<span class="line"><span style="color:#e1e4e8;">脏读是指在一个事务处理过程里读取了另一个未提交的事务中的数据。</span></span>
<span class="line"><span style="color:#e1e4e8;">不可重复读是指在对于数据库中的某行记录，一个事务范围内多次查询却返回了不同的数据值，这是由于在查询间隔，另一个事务修改了数据并提交了。</span></span>
<span class="line"><span style="color:#e1e4e8;">幻读是当某个事务在读取某个范围内的记录时，另外一个事务又在该范围内插入了新的记录，当之前的事务再次读取该范围的记录时，会产生幻行，就像产生幻觉一样，这就是发生了幻读。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">读已提交</span></span>
<span class="line"><span style="color:#24292e;">读未提交</span></span>
<span class="line"><span style="color:#24292e;">可重复读</span></span>
<span class="line"><span style="color:#24292e;">串行化</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">脏读、不可重复读、幻读</span></span>
<span class="line"><span style="color:#24292e;">脏读是指在一个事务处理过程里读取了另一个未提交的事务中的数据。</span></span>
<span class="line"><span style="color:#24292e;">不可重复读是指在对于数据库中的某行记录，一个事务范围内多次查询却返回了不同的数据值，这是由于在查询间隔，另一个事务修改了数据并提交了。</span></span>
<span class="line"><span style="color:#24292e;">幻读是当某个事务在读取某个范围内的记录时，另外一个事务又在该范围内插入了新的记录，当之前的事务再次读取该范围的记录时，会产生幻行，就像产生幻觉一样，这就是发生了幻读。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>四大特性</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ACID：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）</span></span>
<span class="line"><span style="color:#e1e4e8;">原子性是指事务包含的所有操作要么全部成功，要么全部失败回滚。</span></span>
<span class="line"><span style="color:#e1e4e8;">一致性是指一个事务执行之前和执行之后都必须处于一致性状态。比如a与b账户共有1000块，两人之间转账之后无论成功还是失败，它们的账户总和还是1000。</span></span>
<span class="line"><span style="color:#e1e4e8;">隔离性。跟隔离级别相关，如read committed，一个事务只能读到已经提交的修改。</span></span>
<span class="line"><span style="color:#e1e4e8;">持久性是指一个事务一旦被提交了，那么对数据库中的数据的改变就是永久性的，即便是在数据库系统遇到故障的情况下也不会丢失提交事务的操作</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ACID：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）</span></span>
<span class="line"><span style="color:#24292e;">原子性是指事务包含的所有操作要么全部成功，要么全部失败回滚。</span></span>
<span class="line"><span style="color:#24292e;">一致性是指一个事务执行之前和执行之后都必须处于一致性状态。比如a与b账户共有1000块，两人之间转账之后无论成功还是失败，它们的账户总和还是1000。</span></span>
<span class="line"><span style="color:#24292e;">隔离性。跟隔离级别相关，如read committed，一个事务只能读到已经提交的修改。</span></span>
<span class="line"><span style="color:#24292e;">持久性是指一个事务一旦被提交了，那么对数据库中的数据的改变就是永久性的，即便是在数据库系统遇到故障的情况下也不会丢失提交事务的操作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>MVCC</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">概念，原理</span></span>
<span class="line"><span style="color:#e1e4e8;">快照读，当前读</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">概念，原理</span></span>
<span class="line"><span style="color:#24292e;">快照读，当前读</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>锁</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">全局锁</span></span>
<span class="line"><span style="color:#e1e4e8;">表锁</span></span>
<span class="line"><span style="color:#e1e4e8;">行锁</span></span>
<span class="line"><span style="color:#e1e4e8;">gap锁</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">共享锁</span></span>
<span class="line"><span style="color:#e1e4e8;">排它锁</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">意向锁</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">乐观锁</span></span>
<span class="line"><span style="color:#e1e4e8;">悲观锁</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">全局锁</span></span>
<span class="line"><span style="color:#24292e;">表锁</span></span>
<span class="line"><span style="color:#24292e;">行锁</span></span>
<span class="line"><span style="color:#24292e;">gap锁</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">共享锁</span></span>
<span class="line"><span style="color:#24292e;">排它锁</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">意向锁</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">乐观锁</span></span>
<span class="line"><span style="color:#24292e;">悲观锁</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h1 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-label="Permalink to &quot;索引&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">聚簇索引，单值索引，联合索引，复合主键，前缀索引</span></span>
<span class="line"><span style="color:#e1e4e8;">全文索引，hash索引</span></span>
<span class="line"><span style="color:#e1e4e8;">最左匹配原则</span></span>
<span class="line"><span style="color:#e1e4e8;">索引下推</span></span>
<span class="line"><span style="color:#e1e4e8;">索引失效的场景</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">聚簇索引，单值索引，联合索引，复合主键，前缀索引</span></span>
<span class="line"><span style="color:#24292e;">全文索引，hash索引</span></span>
<span class="line"><span style="color:#24292e;">最左匹配原则</span></span>
<span class="line"><span style="color:#24292e;">索引下推</span></span>
<span class="line"><span style="color:#24292e;">索引失效的场景</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>B+树</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">B+树的构造特点，规律</span></span>
<span class="line"><span style="color:#e1e4e8;">与B树的区别</span></span>
<span class="line"><span style="color:#e1e4e8;">一颗M阶，高度为3的B+树能存多少数据</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">B+树的构造特点，规律</span></span>
<span class="line"><span style="color:#24292e;">与B树的区别</span></span>
<span class="line"><span style="color:#24292e;">一颗M阶，高度为3的B+树能存多少数据</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>Buffer Pool</li><li>explain执行计划</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">执行计划概念，各个字段含义</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">执行计划概念，各个字段含义</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h1><ul><li>redo log</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Buffer Pool</span></span>
<span class="line"><span style="color:#e1e4e8;">Change Buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">Page</span></span>
<span class="line"><span style="color:#e1e4e8;">Checkpoint</span></span>
<span class="line"><span style="color:#e1e4e8;">wrtite pos</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">redo log作用</span></span>
<span class="line"><span style="color:#e1e4e8;">redo log构造</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Buffer Pool</span></span>
<span class="line"><span style="color:#24292e;">Change Buffer</span></span>
<span class="line"><span style="color:#24292e;">Page</span></span>
<span class="line"><span style="color:#24292e;">Checkpoint</span></span>
<span class="line"><span style="color:#24292e;">wrtite pos</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">redo log作用</span></span>
<span class="line"><span style="color:#24292e;">redo log构造</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul><li>undo log</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">概念，作用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">概念，作用</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>binlog</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">概念，作用</span></span>
<span class="line"><span style="color:#e1e4e8;">state模式</span></span>
<span class="line"><span style="color:#e1e4e8;">row模式</span></span>
<span class="line"><span style="color:#e1e4e8;">混合模式</span></span>
<span class="line"><span style="color:#e1e4e8;">各种模式的优缺点</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">概念，作用</span></span>
<span class="line"><span style="color:#24292e;">state模式</span></span>
<span class="line"><span style="color:#24292e;">row模式</span></span>
<span class="line"><span style="color:#24292e;">混合模式</span></span>
<span class="line"><span style="color:#24292e;">各种模式的优缺点</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>general log</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">概念，作用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">概念，作用</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>error log</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">概念，作用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">概念，作用</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="sql" tabindex="-1">SQL <a class="header-anchor" href="#sql" aria-label="Permalink to &quot;SQL&quot;">​</a></h1><ul><li>各种join的概念</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">left join</span></span>
<span class="line"><span style="color:#e1e4e8;">right join</span></span>
<span class="line"><span style="color:#e1e4e8;">outer join</span></span>
<span class="line"><span style="color:#e1e4e8;">inner join</span></span>
<span class="line"><span style="color:#e1e4e8;">join</span></span>
<span class="line"><span style="color:#e1e4e8;">full join</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">left join</span></span>
<span class="line"><span style="color:#24292e;">right join</span></span>
<span class="line"><span style="color:#24292e;">outer join</span></span>
<span class="line"><span style="color:#24292e;">inner join</span></span>
<span class="line"><span style="color:#24292e;">join</span></span>
<span class="line"><span style="color:#24292e;">full join</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>sql优化</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">where 优化</span></span>
<span class="line"><span style="color:#e1e4e8;">in 优化</span></span>
<span class="line"><span style="color:#e1e4e8;">on 优化</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt; 区间优化</span></span>
<span class="line"><span style="color:#e1e4e8;">索引优化</span></span>
<span class="line"><span style="color:#e1e4e8;">查询语句的执行流程</span></span>
<span class="line"><span style="color:#e1e4e8;">update语句的执行流程</span></span>
<span class="line"><span style="color:#e1e4e8;">exist和in的区别</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">where 优化</span></span>
<span class="line"><span style="color:#24292e;">in 优化</span></span>
<span class="line"><span style="color:#24292e;">on 优化</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt; 区间优化</span></span>
<span class="line"><span style="color:#24292e;">索引优化</span></span>
<span class="line"><span style="color:#24292e;">查询语句的执行流程</span></span>
<span class="line"><span style="color:#24292e;">update语句的执行流程</span></span>
<span class="line"><span style="color:#24292e;">exist和in的区别</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h1 id="存储引擎" tabindex="-1">存储引擎 <a class="header-anchor" href="#存储引擎" aria-label="Permalink to &quot;存储引擎&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">innodb</span></span>
<span class="line"><span style="color:#e1e4e8;">myisam</span></span>
<span class="line"><span style="color:#e1e4e8;">memory</span></span>
<span class="line"><span style="color:#e1e4e8;">archive</span></span>
<span class="line"><span style="color:#e1e4e8;">blackhole</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">innodb</span></span>
<span class="line"><span style="color:#24292e;">myisam</span></span>
<span class="line"><span style="color:#24292e;">memory</span></span>
<span class="line"><span style="color:#24292e;">archive</span></span>
<span class="line"><span style="color:#24292e;">blackhole</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h1 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.分库分表</span></span>
<span class="line"><span style="color:#e1e4e8;">2.索引优化</span></span>
<span class="line"><span style="color:#e1e4e8;">3.增加冗余字段</span></span>
<span class="line"><span style="color:#e1e4e8;">4.XA</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.分库分表</span></span>
<span class="line"><span style="color:#24292e;">2.索引优化</span></span>
<span class="line"><span style="color:#24292e;">3.增加冗余字段</span></span>
<span class="line"><span style="color:#24292e;">4.XA</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h1 id="排查线上问题" tabindex="-1">排查线上问题 <a class="header-anchor" href="#排查线上问题" aria-label="Permalink to &quot;排查线上问题&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show processlist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show processlist</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="架构" tabindex="-1">架构 <a class="header-anchor" href="#架构" aria-label="Permalink to &quot;架构&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.读写分离</span></span>
<span class="line"><span style="color:#e1e4e8;">主写，从读</span></span>
<span class="line"><span style="color:#e1e4e8;">2.分库分表</span></span>
<span class="line"><span style="color:#e1e4e8;">垂直分表、垂直分库、水平分表、水平分库</span></span>
<span class="line"><span style="color:#e1e4e8;">3.跨节点 Join 的问题</span></span>
<span class="line"><span style="color:#e1e4e8;">4.全局ID方案</span></span>
<span class="line"><span style="color:#e1e4e8;">5.分区表</span></span>
<span class="line"><span style="color:#e1e4e8;">6.主从复制</span></span>
<span class="line"><span style="color:#e1e4e8;">概念</span></span>
<span class="line"><span style="color:#e1e4e8;">同步复制，优缺点</span></span>
<span class="line"><span style="color:#e1e4e8;">半同步复制，优缺点</span></span>
<span class="line"><span style="color:#e1e4e8;">架构模式</span></span>
<span class="line"><span style="color:#e1e4e8;">WAL</span></span>
<span class="line"><span style="color:#e1e4e8;">MTR</span></span>
<span class="line"><span style="color:#e1e4e8;">MBR</span></span>
<span class="line"><span style="color:#e1e4e8;">GRT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.读写分离</span></span>
<span class="line"><span style="color:#24292e;">主写，从读</span></span>
<span class="line"><span style="color:#24292e;">2.分库分表</span></span>
<span class="line"><span style="color:#24292e;">垂直分表、垂直分库、水平分表、水平分库</span></span>
<span class="line"><span style="color:#24292e;">3.跨节点 Join 的问题</span></span>
<span class="line"><span style="color:#24292e;">4.全局ID方案</span></span>
<span class="line"><span style="color:#24292e;">5.分区表</span></span>
<span class="line"><span style="color:#24292e;">6.主从复制</span></span>
<span class="line"><span style="color:#24292e;">概念</span></span>
<span class="line"><span style="color:#24292e;">同步复制，优缺点</span></span>
<span class="line"><span style="color:#24292e;">半同步复制，优缺点</span></span>
<span class="line"><span style="color:#24292e;">架构模式</span></span>
<span class="line"><span style="color:#24292e;">WAL</span></span>
<span class="line"><span style="color:#24292e;">MTR</span></span>
<span class="line"><span style="color:#24292e;">MBR</span></span>
<span class="line"><span style="color:#24292e;">GRT</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,43),c=[p];function i(o,r,t,d,b,u){return n(),a("div",null,c)}const m=s(l,[["render",i]]);export{h as __pageData,m as default};
