import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.CzsDe1xi.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/数据库/Mysql/面试总结/InnoDB丢失自增值.md","filePath":"packages/doc/src/数据库/Mysql/面试总结/InnoDB丢失自增值.md","lastUpdated":1711622925000}'),e={name:"doc/数据库/Mysql/面试总结/InnoDB丢失自增值.md"},l=p(`<p><strong>背景</strong></p><p>在上一期的月报中，我们在<a href="http://mysql.taobao.org/index.php/MySQL%E5%86%85%E6%A0%B8%E6%9C%88%E6%8A%A5_2015.01#MySQL_.C2.B7_.E6.8D.89.E8.99.AB.E5.8A.A8.E6.80.81.C2.B7_InnoDB.E8.87.AA.E5.A2.9E.E5.88.97.E9.87.8D.E5.A4.8D.E5.80.BC.E9.97.AE.E9.A2.98" target="_blank" rel="noreferrer">InnoDB自增列重复值问题</a> 中提到，InnoDB 自增列在重启后会丢失，因为MySQL没有持久化自增值，平时是存在内存表对象中的。如果实例重启的话，内存值丢失，其初始化过程是做了一个类似 select max(id) + 1 操作。实际上存在另外一种场景，实例即使不重启，也会导致自增值丢失。</p><p><strong>问题说明</strong></p><p>实例运行过种中，InnoDB表自增值是存储在表对象中的，表对象又是放在缓存中的，如果表太多而不能全部放在缓存中的话，老的表就会被置换出来，这种被置换出来的表下次再使用的时候，就要重新打开一遍，对自增列来说，这个过程就和实例重启类似，需要 select max(id) + 1 算一下自增值。</p><p>对InnoDB来说，其数据字典中表对象缓存大小由 <a href="http://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_table_definition_cache" target="_blank" rel="noreferrer">table_definition_cache</a> 系统变量控制，在5.6.8之后，其最小值是400。和表缓存相关的另一个系统变量是<a href="http://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_table_definition_cache" target="_blank" rel="noreferrer">table_open_cache</a>，这个控制的是所有线程打开表的缓存大小，这个缓存放在server层。</p><p>下面我们用testcase的方式来给出InnoDB表对象对置换出的场景：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>##把 table_definition_cache 和 table_open_cache 都设为400</span></span>
<span class="line"><span>SET GLOBAL table_definition_cache = 400;</span></span>
<span class="line"><span>SET GLOBAL table_open_cache = 400;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 创建500个InnoDB自增表，各插入一条数据，然后把自增改为100</span></span>
<span class="line"><span>let $i=0;</span></span>
<span class="line"><span>while($i &amp;lt; 500)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>--eval CREATE TABLE t$i(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30), PRIMARY KEY(id)) ENGINE=InnoDB;</span></span>
<span class="line"><span>--eval INSERT INTO t$i(name) VALUES(&amp;quot;InnoDB&amp;quot;);</span></span>
<span class="line"><span>--eval ALTER TABLE t$i AUTO_INCREMENT = 100;</span></span>
<span class="line"><span>--inc $i</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 最后400张表扫一遍</span></span>
<span class="line"><span>let $i=100;</span></span>
<span class="line"><span>while($i &amp;lt; 500)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>--eval SELECT * FROM t$i;</span></span>
<span class="line"><span>--inc $i</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 稍微sleep下，等mysqld把不用的表（t0..t99）换出</span></span>
<span class="line"><span>sleep 5;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 查看t1表自增</span></span>
<span class="line"><span>SHOW CREATE TABLE t1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Table   Create Table</span></span>
<span class="line"><span>t1      CREATE TABLE \`t1\` (</span></span>
<span class="line"><span>\`id\` int(11) NOT NULL AUTO_INCREMENT,</span></span>
<span class="line"><span>\`name\` varchar(30) DEFAULT NULL,</span></span>
<span class="line"><span>PRIMARY KEY (\`id\`)</span></span>
<span class="line"><span>) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>可以看到自增值确实和重启场景一样，本应是100，却变成了 2（select max(id) + 1）了。</p><p><strong>问题分析</strong></p><p>原因就是缓存不够，导致表对象被换出，下次再用就要重新打开，这里给出调用栈，对代码感兴趣的同学可以看下。</p><p>将老的table置换出：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#0  dict_table_remove_from_cache_low (table=0x2b81d054e278, lru_evict=1)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/dict/dict0dict.cc:1804</span></span>
<span class="line"><span>#1  0x00000000011cf246 in dict_make_room_in_cache (max_tables=400, pct_check=100)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/dict/dict0dict.cc:1261</span></span>
<span class="line"><span>#2  0x0000000001083564 in srv_master_evict_from_table_cache (pct_check=100)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/srv/srv0srv.cc:2017</span></span>
<span class="line"><span>#3  0x0000000001084022 in srv_master_do_idle_tasks () at /path/to/mysql/storage/innobase/srv/srv0srv.cc:2212</span></span>
<span class="line"><span>#4  0x000000000108484a in srv_master_thread (arg=0x0) at /path/to/mysql/storage/innobase/srv/srv0srv.cc:2360</span></span>
<span class="line"><span>#5  0x00000030cc007851 in start_thread () from /lib64/libpthread.so.0</span></span>
<span class="line"><span>#6  0x00000030cbce767d in clone () from /lib64/libc.so.6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>尝试从缓存加载表对象：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#0  dict_table_check_if_in_cache_low (table_name=0x2adef847db20 &amp;quot;test/t1&amp;quot;)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/include/dict0priv.ic:114</span></span>
<span class="line"><span>#1  0x00000000011cd51a in dict_table_open_on_name (table_name=0x2adef847db20 &amp;quot;test/t1&amp;quot;, dict_locked=0, try_drop=1,</span></span>
<span class="line"><span>ignore_err=DICT_ERR_IGNORE_NONE) at /path/to/mysql/storage/innobase/dict/dict0dict.cc:947</span></span>
<span class="line"><span>#2  0x0000000000e58d8a in ha_innobase::open (this=0x2adef9747010, name=0x2adef7460780 &amp;quot;./test/t1&amp;quot;, mode=2, test_if_locked=2)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/handler/ha_innodb.cc:4776</span></span>
<span class="line"><span>#3  0x000000000068668b in handler::ha_open (this=0x2adef9747010, table_arg=0x2adef742bc00, name=0x2adef7460780 &amp;quot;./test/t1&amp;quot;, mode=2,</span></span>
<span class="line"><span>test_if_locked=2) at /path/to/mysql/sql/handler.cc:2525</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#9  0x00000000009c2a84 in mysqld_show_create (thd=0x2adef47aa000, table_list=0x2adef74200f0)</span></span>
<span class="line"><span>at /path/to/mysql/sql/sql_show.cc:867</span></span>
<span class="line"><span>#10 0x00000000009553b1 in mysql_execute_command (thd=0x2adef47aa000) at /path/to/mysql/sql/sql_parse.cc:3507</span></span>
<span class="line"><span>#11 0x0000000000963bbe in mysql_parse (thd=0x2adef47aa000, rawbuf=0x2adef7420010 &amp;quot;show create table t1&amp;quot;, length=20,</span></span>
<span class="line"><span>parser_state=0x2adef8480630) at /path/to/mysql/sql/sql_parse.cc:6623</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>缓存加载不到表对象，用select maxt 逻辑初始化自增：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#0  row_search_max_autoinc (index=0x2b241d8f50f8, col_name=0x2b241d855519 &amp;quot;id&amp;quot;, value=0x2b241e87d8a8)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/row/row0sel.cc:5361</span></span>
<span class="line"><span>#1  0x0000000000e58998 in ha_innobase::innobase_initialize_autoinc (this=0x2b241fbd9010)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/handler/ha_innodb.cc:4663</span></span>
<span class="line"><span>#2  0x0000000000e59bd9 in ha_innobase::open (this=0x2b241fbd9010, name=0x2b241d853780 &amp;quot;./test/t1&amp;quot;, mode=2, test_if_locked=2)</span></span>
<span class="line"><span>at /path/to/mysql/storage/innobase/handler/ha_innodb.cc:5089</span></span>
<span class="line"><span>#3  0x000000000068668b in handler::ha_open (this=0x2b241fbd9010, table_arg=0x2b241e422000, name=0x2b241d853780 &amp;quot;./test/t1&amp;quot;, mode=2,</span></span>
<span class="line"><span>test_if_locked=2) at /path/to/mysql/sql/handler.cc:2525</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>#9  0x00000000009c2a84 in mysqld_show_create (thd=0x2b241abaa000, table_list=0x2b241d8200f0)</span></span>
<span class="line"><span>at /path/to/mysql/sql/sql_show.cc:867</span></span>
<span class="line"><span>#10 0x00000000009553b1 in mysql_execute_command (thd=0x2b241abaa000) at /path/to/mysql/sql/sql_parse.cc:3507</span></span>
<span class="line"><span>#11 0x0000000000963bbe in mysql_parse (thd=0x2b241abaa000, rawbuf=0x2b241d820010 &amp;quot;show create table t1&amp;quot;, length=20,</span></span>
<span class="line"><span>parser_state=0x2b241e880630) at /path/to/mysql/sql/sql_parse.cc:6623</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>处理建议</strong></p><p>对于这个问题，一种解决方法是从源码改进，将自增值持久化，可以参考<a href="http://mysql.taobao.org/index.php/MySQL%E5%86%85%E6%A0%B8%E6%9C%88%E6%8A%A5_2015.01#MySQL_.C2.B7_.E6.8D.89.E8.99.AB.E5.8A.A8.E6.80.81.C2.B7_InnoDB.E8.87.AA.E5.A2.9E.E5.88.97.E9.87.8D.E5.A4.8D.E5.80.BC.E9.97.AE.E9.A2.98" target="_blank" rel="noreferrer">上期的月报</a>给出的思路；如果不想改代码的话，可以这样绕过：在设定auto_increment值后，主动插入一行记录，这样不论在重启还是缓存淘汰的情况下，重新打开表仍能得到预期的值。</p>`,18),i=[l];function t(c,r,b,o,m,d){return a(),n("div",null,i)}const h=s(e,[["render",t]]);export{u as __pageData,h as default};
