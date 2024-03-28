import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.DwbewbAn.js";const d=JSON.parse('{"title":"innodb行锁分析","description":null,"frontmatter":{"lang":"zh-CN","title":"innodb行锁分析","description":null},"headers":[],"relativePath":"doc/数据库/Mysql/基础/锁/结合源码InnoDB行锁分析.md","filePath":"packages/doc/src/数据库/Mysql/基础/锁/结合源码InnoDB行锁分析.md","lastUpdated":1711354439000}'),e={name:"doc/数据库/Mysql/基础/锁/结合源码InnoDB行锁分析.md"},l=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>理解InnoDB行锁，分析一条SQL语句会加什么样的行锁，会锁住哪些数据范围对业务SQL设计和分析线上死锁问题都会有很大帮助。对于InnoDB的行锁，已经有多篇月报进行了介绍，这里笔者借鉴前面月报的内容，综合自己的理解，对源码的基础实现做一个介绍（会包含部分表锁介绍），然后结合具体SQL语句分析加锁类型和加锁范围。</p><h2 id="innodb锁类型的表示" tabindex="-1">InnoDB锁类型的表示 <a class="header-anchor" href="#innodb锁类型的表示" aria-label="Permalink to &quot;InnoDB锁类型的表示&quot;">​</a></h2><p>如在月报<a href="http://mysql.taobao.org/monthly/2017/12/02/" target="_blank" rel="noreferrer">MySQL · 引擎特性 · Innodb 锁子系统浅析</a>所述，在InnoDB内部用uint32类型数据表示锁的类型, 最低的 4 个 bit 表示 lock_mode, 5-8 bit 表示 lock_type(目前只用了 5 和 6 位，大小为 16 和 32 ，表示 LOCK_TABLE 和 LOCK_REC), 剩下的高位 bit 表示行锁的类型record_lock_type。下面会结合源码介绍lock_mode和record_lock_type。</p><h2 id="lock-mode" tabindex="-1">lock mode <a class="header-anchor" href="#lock-mode" aria-label="Permalink to &quot;lock mode&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/* Basic lock modes */</span></span>
<span class="line"><span>enum lock_mode {</span></span>
<span class="line"><span>    LOCK_IS = 0, /* intention shared */</span></span>
<span class="line"><span>    LOCK_IX, /* intention exclusive */</span></span>
<span class="line"><span>    LOCK_S, /* shared */</span></span>
<span class="line"><span>    LOCK_X, /* exclusive */</span></span>
<span class="line"><span>    LOCK_AUTO_INC, /* locks the auto-inc counter of a table</span></span>
<span class="line"><span>            in an exclusive mode */</span></span>
<span class="line"><span>    LOCK_NONE, /* this is used elsewhere to note consistent read */</span></span>
<span class="line"><span>    LOCK_NUM = LOCK_NONE, /* number of lock modes */</span></span>
<span class="line"><span>    LOCK_NONE_UNSET = 255</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="lock-is-lock-ix" tabindex="-1">LOCK_IS/LOCK_IX <a class="header-anchor" href="#lock-is-lock-ix" aria-label="Permalink to &quot;LOCK_IS/LOCK_IX&quot;">​</a></h3><p>LOCK_IS: 表级锁，意向共享锁。表示将要在表上加共享锁。</p><p>LOCK_IX：表级锁，意向排他锁。表示是将要在表上加排他锁。</p><p>当对记录加LOCK_S或LOCK_X锁的时候，要确保在表上加了LOCK_IS或LOCK_IX锁。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>lock_rec_lock(</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  ut_ad((LOCK_MODE_MASK &amp; mode) != LOCK_S</span></span>
<span class="line"><span>        || lock_table_has(thr_get_trx(thr), index-&gt;table, LOCK_IS));</span></span>
<span class="line"><span>  ut_ad((LOCK_MODE_MASK &amp; mode) != LOCK_X</span></span>
<span class="line"><span>        || lock_table_has(thr_get_trx(thr), index-&gt;table, LOCK_IX));</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="lock-s" tabindex="-1">LOCK_S <a class="header-anchor" href="#lock-s" aria-label="Permalink to &quot;LOCK_S&quot;">​</a></h3><p>表共享锁、行共享锁</p><p>表共享锁用在:</p><ul><li>ALTER语句第一阶段，当ALTER语句不能ONLINE执行的时间添加</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> storage/innobase/handler/handler0alter.cc</span></span>
<span class="line"><span> prepare_inplace_alter_table_dict(</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>   if (ctx-&gt;online) {</span></span>
<span class="line"><span>     error = DB_SUCCESS;</span></span>
<span class="line"><span>   } else {</span></span>
<span class="line"><span>     error = row_merge_lock_table(</span></span>
<span class="line"><span>       ctx-&gt;prebuilt-&gt;trx, ctx-&gt;new_table, LOCK_S);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     if (error != DB_SUCCESS) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       goto error_handling;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>   }    </span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul><li>autocommit=0, innodb_table_locks=1时, lock table t read添加</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> storage/innobase/handler/ha_innodb.cc</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ha_innobase::external_lock(</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> /* Starting from 4.1.9, no InnoDB table lock is taken in LOCK</span></span>
<span class="line"><span> TABLES if AUTOCOMMIT=1. It does not make much sense to acquire</span></span>
<span class="line"><span> an InnoDB table lock if it is released immediately at the end</span></span>
<span class="line"><span> of LOCK TABLES, and InnoDB&#39;s table locks in that case cause</span></span>
<span class="line"><span> VERY easily deadlocks.</span></span>
<span class="line"><span></span></span>
<span class="line"><span> We do not set InnoDB table locks if user has not explicitly</span></span>
<span class="line"><span> requested a table lock. Note that thd_in_lock_tables(thd)</span></span>
<span class="line"><span> can hold in some cases, e.g., at the start of a stored</span></span>
<span class="line"><span> procedure call (SQLCOM_CALL). */</span></span>
<span class="line"><span> if (m_prebuilt-&gt;select_lock_type != LOCK_NONE) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (thd_sql_command(thd) == SQLCOM_LOCK_TABLES</span></span>
<span class="line"><span>       &amp;&amp; THDVAR(thd, table_locks)</span></span>
<span class="line"><span>       &amp;&amp; thd_test_options(thd, OPTION_NOT_AUTOCOMMIT)</span></span>
<span class="line"><span>       &amp;&amp; thd_in_lock_tables(thd)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     dberr_t error = row_lock_table_for_mysql(</span></span>
<span class="line"><span>       m_prebuilt, NULL, 0);</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>行共享锁应用场景比较复杂，这里结合源码做一个介绍，后面会在各种场景分析会也会涉及。</p><ul><li>事务读在隔离级别为SERIALIZABLE时会给记录加 LOCK_S 锁。</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> mysql_lock_tables-&gt;lock_external-&gt;handler::ha_external_lock-&gt;ha_innobase::external_lock</span></span>
<span class="line"><span></span></span>
<span class="line"><span> storage/innobase/handler/ha_innodb.cc</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ha_innobase::external_lock</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> if (trx-&gt;isolation_level == TRX_ISO_SERIALIZABLE</span></span>
<span class="line"><span>     &amp;&amp; m_prebuilt-&gt;select_lock_type == LOCK_NONE</span></span>
<span class="line"><span>     &amp;&amp; thd_test_options(</span></span>
<span class="line"><span>       thd, OPTION_NOT_AUTOCOMMIT | OPTION_BEGIN)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* To get serializable execution, we let InnoDB</span></span>
<span class="line"><span>   conceptually add &#39;LOCK IN SHARE MODE&#39; to all SELECTs</span></span>
<span class="line"><span>   which otherwise would have been consistent reads. An</span></span>
<span class="line"><span>   exception is consistent reads in the AUTOCOMMIT=1 mode:</span></span>
<span class="line"><span>   we know that they are read-only transactions, and they</span></span>
<span class="line"><span>   can be serialized also if performed as consistent</span></span>
<span class="line"><span>   reads. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   m_prebuilt-&gt;select_lock_type = LOCK_S;</span></span>
<span class="line"><span>   m_prebuilt-&gt;stored_select_lock_type = LOCK_S;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ha_innobase::general_fetch-&gt;row_search_mvcc</span></span>
<span class="line"><span> storage/innobase/row/row0sel.cc</span></span>
<span class="line"><span></span></span>
<span class="line"><span> row_search_mvcc</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> err = sel_set_rec_lock(pcur,</span></span>
<span class="line"><span>            rec, index, offsets,</span></span>
<span class="line"><span>            prebuilt-&gt;select_lock_type,</span></span>
<span class="line"><span>            lock_type, thr, &amp;mtr);</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><ul><li>SELECT … IN SHARE MODE</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> mysql_lock_tables-&gt;get_lock_data-&gt;ha_innobase::store_lock</span></span>
<span class="line"><span> file:storage/innobase/handler/ha_innodb.cc</span></span>
<span class="line"><span> function:store_lock</span></span>
<span class="line"><span> else if ((lock_type == TL_READ &amp;&amp; in_lock_tables)</span></span>
<span class="line"><span>       || (lock_type == TL_READ_HIGH_PRIORITY &amp;&amp; in_lock_tables)</span></span>
<span class="line"><span>       || lock_type == TL_READ_WITH_SHARED_LOCKS</span></span>
<span class="line"><span>       || lock_type == TL_READ_NO_INSERT</span></span>
<span class="line"><span>      || (lock_type != TL_IGNORE</span></span>
<span class="line"><span>          &amp;&amp; sql_command != SQLCOM_SELECT)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* The OR cases above are in this order:</span></span>
<span class="line"><span>   1) MySQL is doing LOCK TABLES ... READ LOCAL, or we</span></span>
<span class="line"><span>    are processing a stored procedure or function, or</span></span>
<span class="line"><span>   2) (we do not know when TL_READ_HIGH_PRIORITY is used), or</span></span>
<span class="line"><span>   3) this is a SELECT ... IN SHARE MODE, or</span></span>
<span class="line"><span>   4) we are doing a complex SQL statement like</span></span>
<span class="line"><span>   INSERT INTO ... SELECT ... and the logical logging (MySQL</span></span>
<span class="line"><span>   binlog) requires the use of a locking read, or</span></span>
<span class="line"><span>   MySQL is doing LOCK TABLES ... READ.</span></span>
<span class="line"><span>   5) we let InnoDB do locking reads for all SQL statements that</span></span>
<span class="line"><span>   are not simple SELECTs; note that select_lock_type in this</span></span>
<span class="line"><span>   case may get strengthened in ::external_lock() to LOCK_X.</span></span>
<span class="line"><span>   Note that we MUST use a locking read in all data modifying</span></span>
<span class="line"><span>   SQL statements, because otherwise the execution would not be</span></span>
<span class="line"><span>   serializable, and also the results from the update could be</span></span>
<span class="line"><span>   unexpected if an obsolete consistent read view would be</span></span>
<span class="line"><span>   used. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Use consistent read for checksum table */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     if (sql_command == SQLCOM_CHECKSUM</span></span>
<span class="line"><span>         || ((srv_locks_unsafe_for_binlog</span></span>
<span class="line"><span>       || trx-&gt;isolation_level &lt;= TRX_ISO_READ_COMMITTED)</span></span>
<span class="line"><span>                  &amp;&amp; trx-&gt;isolation_level != TRX_ISO_SERIALIZABLE</span></span>
<span class="line"><span>        &amp;&amp; (lock_type == TL_READ</span></span>
<span class="line"><span>          || lock_type == TL_READ_NO_INSERT)</span></span>
<span class="line"><span>        &amp;&amp; (sql_command == SQLCOM_INSERT_SELECT</span></span>
<span class="line"><span>          || sql_command == SQLCOM_REPLACE_SELECT</span></span>
<span class="line"><span>          || sql_command == SQLCOM_UPDATE</span></span>
<span class="line"><span>          || sql_command == SQLCOM_CREATE_TABLE))) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       //这里对于INSERT ... SELECT等语句如果没有UPDATE/IN SHARE MODE不需要当前读,</span></span>
<span class="line"><span>       //所以不需要LOCK_S锁</span></span>
<span class="line"><span>       /* If we either have innobase_locks_unsafe_for_binlog</span></span>
<span class="line"><span>       option set or this session is using READ COMMITTED</span></span>
<span class="line"><span>       isolation level and isolation level of the transaction</span></span>
<span class="line"><span>       is not set to serializable and MySQL is doing</span></span>
<span class="line"><span>       INSERT INTO...SELECT or REPLACE INTO...SELECT</span></span>
<span class="line"><span>       or UPDATE ... = (SELECT ...) or CREATE  ...</span></span>
<span class="line"><span>       SELECT... without FOR UPDATE or IN SHARE</span></span>
<span class="line"><span>       MODE in select, then we use consistent read  </span></span>
<span class="line"><span>       for select. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       m_prebuilt-&gt;select_lock_type = LOCK_NONE;</span></span>
<span class="line"><span>       m_prebuilt-&gt;stored_select_lock_type = LOCK_NONE;</span></span>
<span class="line"><span>     } else {</span></span>
<span class="line"><span>       m_prebuilt-&gt;select_lock_type = LOCK_S;</span></span>
<span class="line"><span>       m_prebuilt-&gt;stored_select_lock_type = LOCK_S;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><ul><li>普通insert语句遇到duplicate key。</li></ul><p>普通INSERT语句如果没有duplicate key是不用加行锁的，当遇到duplicate key就需要加LOCK_S锁。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> row_ins_duplicate_error_in_clust</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (flags &amp; BTR_NO_LOCKING_FLAG) {</span></span>
<span class="line"><span>   /* Do nothing if no-locking is set */</span></span>
<span class="line"><span>   err = DB_SUCCESS;</span></span>
<span class="line"><span> } else if (trx-&gt;duplicates) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* If the SQL-query will update or replace</span></span>
<span class="line"><span>   duplicate key we will take X-lock for</span></span>
<span class="line"><span>   duplicates ( REPLACE, LOAD DATAFILE REPLACE,</span></span>
<span class="line"><span>   INSERT ON DUPLICATE KEY UPDATE). */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   err = row_ins_set_exclusive_rec_lock(</span></span>
<span class="line"><span>     lock_type,</span></span>
<span class="line"><span>     btr_cur_get_block(cursor),</span></span>
<span class="line"><span>     rec, cursor-&gt;index, offsets, thr); //对于REPLACE、INSERT ON DUPLICATE KEY要更新的语句，加排他锁。</span></span>
<span class="line"><span> } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   err = row_ins_set_shared_rec_lock(</span></span>
<span class="line"><span>     lock_type,</span></span>
<span class="line"><span>     btr_cur_get_block(cursor), rec,</span></span>
<span class="line"><span>     cursor-&gt;index, offsets, thr);</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><ul><li>外键检查到引用行时对引用行添加</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> row_ins_check_foreign_constraint</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> if (rec_get_deleted_flag(rec,</span></span>
<span class="line"><span>      rec_offs_comp(offsets))) {</span></span>
<span class="line"><span> err = row_ins_set_shared_rec_lock(</span></span>
<span class="line"><span>   lock_type, block,</span></span>
<span class="line"><span>   rec, check_index, offsets, thr);</span></span>
<span class="line"><span> switch (err) {</span></span>
<span class="line"><span> case DB_SUCCESS_LOCKED_REC:</span></span>
<span class="line"><span> case DB_SUCCESS:</span></span>
<span class="line"><span>   break;</span></span>
<span class="line"><span> default:</span></span>
<span class="line"><span>   goto end_scan;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> } else {</span></span>
<span class="line"><span> /* Found a matching record. Lock only</span></span>
<span class="line"><span> a record because we can allow inserts</span></span>
<span class="line"><span> into gaps */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> err = row_ins_set_shared_rec_lock(</span></span>
<span class="line"><span>   LOCK_REC_NOT_GAP, block,</span></span>
<span class="line"><span>   rec, check_index, offsets, thr);</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="lock-x锁" tabindex="-1">LOCK_X锁 <a class="header-anchor" href="#lock-x锁" aria-label="Permalink to &quot;LOCK_X锁&quot;">​</a></h3><p>表排他锁，行排他锁</p><p>表排他锁</p><ul><li><p>ALTER语句最后一个阶段。</p><p>在源码注释中也解释了原因，用来确保没有别的事务在修改表定义的时候持有表锁。因为外键检查和crash recovery过程是仅InnoDB持有锁，所以这里无法仅靠Server层的Meta-Data Lock。</p></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> storage/innobase/handler/handler0alter.cc</span></span>
<span class="line"><span> commit_inplace_alter_table()</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span> for (inplace_alter_handler_ctx** pctx = ctx_array; *pctx; pctx++) {</span></span>
<span class="line"><span>   ha_innobase_inplace_ctx*  ctx</span></span>
<span class="line"><span>    = static_cast&lt;ha_innobase_inplace_ctx*&gt;(*pctx);</span></span>
<span class="line"><span>   DBUG_ASSERT(ctx-&gt;prebuilt-&gt;trx == m_prebuilt-&gt;trx);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* Exclusively lock the table, to ensure that no other</span></span>
<span class="line"><span>   transaction is holding locks on the table while we</span></span>
<span class="line"><span>   change the table definition. The MySQL meta-data lock</span></span>
<span class="line"><span>   should normally guarantee that no conflicting locks</span></span>
<span class="line"><span>   exist. However, FOREIGN KEY constraints checks and any</span></span>
<span class="line"><span>   transactions collected during crash recovery could be</span></span>
<span class="line"><span>   holding InnoDB locks only, not MySQL locks. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   error = row_merge_lock_table(</span></span>
<span class="line"><span>     m_prebuilt-&gt;trx, ctx-&gt;old_table, LOCK_X);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (error != DB_SUCCESS) {</span></span>
<span class="line"><span>     my_error_innodb(</span></span>
<span class="line"><span>       error, table_share-&gt;table_name.str, 0);</span></span>
<span class="line"><span>     DBUG_RETURN(true);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><ul><li><p>autocommit=0, innodb_table_locks=1时, lock table t write语句添加</p><p>这里源码的位置和表级锁LOCK_S添加一致。</p></li><li><p>IMPORT/DISCARD TABLESPACE 语句的执行</p></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> storage/innobase/handler/ha_innodb.cc</span></span>
<span class="line"><span> discard_or_import_tablespace()</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>   /* Obtain an exclusive lock on the table. */</span></span>
<span class="line"><span> dberr_t err = row_mysql_lock_table(</span></span>
<span class="line"><span>   m_prebuilt-&gt;trx, dict_table, LOCK_X,</span></span>
<span class="line"><span>   discard ? &quot;setting table lock for DISCARD TABLESPACE&quot;</span></span>
<span class="line"><span>     : &quot;setting table lock for IMPORT TABLESPACE&quot;);</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>行排他锁</p><ul><li>UPDATE/DELETE需要阻止并发对同一行数据进行修改语句的执行</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> storage/innobase/handler/ha_innodb.cc</span></span>
<span class="line"><span> ha_innobase::external_lock(</span></span>
<span class="line"><span> if (lock_type == F_WRLCK) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* If this is a SELECT, then it is in UPDATE TABLE ...</span></span>
<span class="line"><span>   or SELECT ... FOR UPDATE */</span></span>
<span class="line"><span>   m_prebuilt-&gt;select_lock_type = LOCK_X;</span></span>
<span class="line"><span>   m_prebuilt-&gt;stored_select_lock_type = LOCK_X;</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="lock-auto-inc" tabindex="-1">LOCK_AUTO_INC <a class="header-anchor" href="#lock-auto-inc" aria-label="Permalink to &quot;LOCK_AUTO_INC&quot;">​</a></h3><p>表级锁，用来用来保护自增列的值，这里不再展开叙述，可以参考之前月报<a href="http://mysql.taobao.org/monthly/2016/01/01/" target="_blank" rel="noreferrer">MySQL · 引擎特性 · InnoDB 事务锁系统简介</a>。</p><h3 id="lock-mode兼容性" tabindex="-1">lock_mode兼容性 <a class="header-anchor" href="#lock-mode兼容性" aria-label="Permalink to &quot;lock_mode兼容性&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  static const byte lock_compatibility_matrix[5][5] = {</span></span>
<span class="line"><span>    /**         IS     IX       S     X       AI */</span></span>
<span class="line"><span>    /* IS */ {  TRUE,  TRUE,  TRUE,  FALSE,  TRUE},</span></span>
<span class="line"><span>    /* IX */ {  TRUE,  TRUE,  FALSE, FALSE,  TRUE},</span></span>
<span class="line"><span>    /* S  */ {  TRUE,  FALSE, TRUE,  FALSE,  FALSE},</span></span>
<span class="line"><span>    /* X  */ {  FALSE, FALSE, FALSE, FALSE,  FALSE},</span></span>
<span class="line"><span>    /* AI */ {  TRUE,  TRUE,  FALSE, FALSE,  FALSE}</span></span>
<span class="line"><span>  };</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="record-lock-type" tabindex="-1">record_lock_type <a class="header-anchor" href="#record-lock-type" aria-label="Permalink to &quot;record_lock_type&quot;">​</a></h2><ul><li><p>LOCK_WAIT 256 表示正在等待锁</p></li><li><p>LOCK_ORDINARY 0 表示next-key lock ，锁住记录本身和记录之前的 gap，区别LOCK_GAP和LOCK_REC_NOT_GAP。 当用RR隔离级别的时候，为了防止当前读语句的幻读使用。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>storage/innobase/row/row0sel.cc</span></span>
<span class="line"><span>row_search_mvcc</span></span>
<span class="line"><span>if (set_also_gap_locks</span></span>
<span class="line"><span>    &amp;&amp; !(srv_locks_unsafe_for_binlog</span></span>
<span class="line"><span>      || trx-&gt;isolation_level &lt;= TRX_ISO_READ_COMMITTED)</span></span>
<span class="line"><span>      &amp;&amp; prebuilt-&gt;select_lock_type != LOCK_NONE</span></span>
<span class="line"><span>      &amp;&amp; !dict_index_is_spatial(index)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* Try to place a lock on the index record */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* If innodb_locks_unsafe_for_binlog option is used</span></span>
<span class="line"><span> or this session is using a READ COMMITTED isolation</span></span>
<span class="line"><span> level we do not lock gaps. Supremum record is really</span></span>
<span class="line"><span> a gap and therefore we do not set locks there. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> offsets = rec_get_offsets(rec, index, offsets,</span></span>
<span class="line"><span>         ULINT_UNDEFINED, &amp;heap);</span></span>
<span class="line"><span> err = sel_set_rec_lock(pcur,</span></span>
<span class="line"><span>            rec, index, offsets,</span></span>
<span class="line"><span>            prebuilt-&gt;select_lock_type,</span></span>
<span class="line"><span>            LOCK_ORDINARY, thr, &amp;mtr);</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>/* We are ready to look at a possible new index entry in the result</span></span>
<span class="line"><span>set: the cursor is now placed on a user record */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (prebuilt-&gt;select_lock_type != LOCK_NONE) {</span></span>
<span class="line"><span> /* Try to place a lock on the index record; note that delete</span></span>
<span class="line"><span> marked records are a special case in a unique search. If there</span></span>
<span class="line"><span> is a non-delete marked record, then it is enough to lock its</span></span>
<span class="line"><span> existence with LOCK_REC_NOT_GAP. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> /* If innodb_locks_unsafe_for_binlog option is used</span></span>
<span class="line"><span> or this session is using a READ COMMITED isolation</span></span>
<span class="line"><span> level we lock only the record, i.e., next-key locking is</span></span>
<span class="line"><span> not used. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ulint lock_type;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (!set_also_gap_locks</span></span>
<span class="line"><span>     || srv_locks_unsafe_for_binlog</span></span>
<span class="line"><span>     || trx-&gt;isolation_level &lt;= TRX_ISO_READ_COMMITTED</span></span>
<span class="line"><span>     || (unique_search &amp;&amp; !rec_get_deleted_flag(rec, comp))</span></span>
<span class="line"><span>     || dict_index_is_spatial(index)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   goto no_gap_lock;</span></span>
<span class="line"><span> } else {</span></span>
<span class="line"><span>   lock_type = LOCK_ORDINARY;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> ...</span></span>
<span class="line"><span> no_gap_lock:</span></span>
<span class="line"><span>       lock_type = LOCK_REC_NOT_GAP;</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div></li></ul><p>从这里源码可以看到当参数innodb_locks_unsafe_for_binlog为ON时，只会对行加锁，不会锁范围。这个时候实际RR隔离级别对于当前读已经退化为RC隔离级别。</p><ul><li>LOCK_GAP 512</li></ul><p>只锁住索引记录之间或者第一条索引记录前或者最后一条索引记录之后的范围，并不锁住记录本身。</p><p>例如在RR隔离级别下，非唯一索引条件上的等值当前读，会在等值记录上加NEXT-KEY LOCK同时锁住行和前面范围的记录，同时会在后面一个值上加LOCK_GAP锁住下一个值前面的范围。下面的例子就会在索引i_c2上给c2 = 5上NEXT-KEY LOCK(LOCK_ORDINARY|LOCK_X)，同时给c2 = 10加上LOCK_GAP|LOCK_X锁。这里是因为非唯一索引，对同一个值可以多次插入，为确保当前读的可重复读，需要锁住前后的范围，确保不会有相同等值插入。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> create table t1(c1 int primary key, c2 int, c3 int, index i_c2(c2));</span></span>
<span class="line"><span></span></span>
<span class="line"><span> insert into t1 values(1, 2, 3), (2, 5, 7), (3, 10, 9);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> set tx_isolation=&#39;repeatable-read&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> select * from t1 where c2 = 5 for update;</span></span>
<span class="line"><span> 源码:</span></span>
<span class="line"><span> ha_innobase::index_next_same(读下一行)-&gt; ha_innobase::general_fetch-&gt;row_search_mvcc</span></span>
<span class="line"><span></span></span>
<span class="line"><span> storage/innobase/row/row0sel.cc</span></span>
<span class="line"><span> row_search_mvcc</span></span>
<span class="line"><span> /* fputs(&quot;Comparing rec and search tuple\\n&quot;, stderr); */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (0 != cmp_dtuple_rec(search_tuple, rec, offsets)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (set_also_gap_locks</span></span>
<span class="line"><span>       &amp;&amp; !(srv_locks_unsafe_for_binlog</span></span>
<span class="line"><span>      || trx-&gt;isolation_level</span></span>
<span class="line"><span>      &lt;= TRX_ISO_READ_COMMITTED)</span></span>
<span class="line"><span>       &amp;&amp; prebuilt-&gt;select_lock_type != LOCK_NONE</span></span>
<span class="line"><span>       &amp;&amp; !dict_index_is_spatial(index)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     /* Try to place a gap lock on the index</span></span>
<span class="line"><span>     record only if innodb_locks_unsafe_for_binlog</span></span>
<span class="line"><span>     option is not set or this session is not</span></span>
<span class="line"><span>     using a READ COMMITTED isolation level. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     err = sel_set_rec_lock(</span></span>
<span class="line"><span>       pcur,</span></span>
<span class="line"><span>       rec, index, offsets,</span></span>
<span class="line"><span>       prebuilt-&gt;select_lock_type, LOCK_GAP,</span></span>
<span class="line"><span>       thr, &amp;mtr);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><ul><li>LOCK_REC_NOT_GAP 1024</li></ul><p>仅锁住记录行，不锁范围。</p><p>RC隔离级别下的当前读大多是该方式。相关源码可以见LOCK_ORDINARY源码分析中no_gap_lock跳转。同时在上述例子中，RR隔离级别下，非唯一索引上的等值当前读，也会给主键上对应行加LOCK_X|LOCK_REC_NOT_GAP锁。</p><ul><li>LOCK_INSERT_INTENTION 2048</li></ul><p>插入意向锁，当插入索引记录的时候用来判断是否有其他事务的范围锁冲突，如果有就需要等待。</p><p>例如上面LOCK_GAP中的例子，如果此时另一个session执行insert into t1 values(11, 9, 0);就会调用lock_rec_insert_check_and_lock函数，用插入意向锁来检查是否需要等待。同时插入意向锁之间并不冲突，在一个GAP锁上可以有多个意向锁等待。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> file:lock0lock.cc</span></span>
<span class="line"><span> function:lock_rec_insert_check_and_lock</span></span>
<span class="line"><span> /* If another transaction has an explicit lock request which locks</span></span>
<span class="line"><span> the gap, waiting or granted, on the successor, the insert has to wait.</span></span>
<span class="line"><span></span></span>
<span class="line"><span> An exception is the case where the lock by the another transaction</span></span>
<span class="line"><span> is a gap type lock which it placed to wait for its turn to insert. We</span></span>
<span class="line"><span> do not consider that kind of a lock conflicting with our insert. This</span></span>
<span class="line"><span> eliminates an unnecessary deadlock which resulted when 2 transactions</span></span>
<span class="line"><span> had to wait for their insert. Both had waiting gap type lock requests</span></span>
<span class="line"><span> on the successor, which produced an unnecessary deadlock. */</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const ulint type_mode = LOCK_X | LOCK_GAP | LOCK_INSERT_INTENTION;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const lock_t* wait_for = lock_rec_other_has_conflicting(</span></span>
<span class="line"><span>      type_mode, block, heap_no, trx);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ul><li>LOCK_PREDICATE 8192</li></ul><p>谓词锁 用于支持GIS索引</p><ul><li>LOCK_PRDT_PAGE 16384</li></ul><p>用在page上的谓词锁 用于支持GIS索引</p><p>LOCK_PREDICATE LOCK_PRDT_PAGE 用于支持GIS的锁，这里不做更多介绍，感兴趣的可以查看<a href="https://dev.mysql.com/worklog/task/?id=6968" target="_blank" rel="noreferrer">WL #6968</a>， <a href="https://dev.mysql.com/worklog/task/?id=6609" target="_blank" rel="noreferrer">#WL 6609</a>， <a href="https://dev.mysql.com/worklog/task/?id=6745" target="_blank" rel="noreferrer">#WL 6745</a>。</p><h2 id="事务隔离级别与行锁" tabindex="-1">事务隔离级别与行锁 <a class="header-anchor" href="#事务隔离级别与行锁" aria-label="Permalink to &quot;事务隔离级别与行锁&quot;">​</a></h2><p>快照读和当前读。</p><p>快照读使用MVCC读取数据记录某一个版本数据，不需要加锁。当前读读取最新数据，需要对记录或者某一个查询范围加锁。</p><p>InnoDB支持的隔离级别有：</p><ul><li><p>Read Uncommited</p><p>可以读未提交记录</p></li><li><p>Read Committed (RC)</p><p>读取已提交数据。会存在幻读。</p></li><li><p>Repeatable Read (RR)</p><p>可重复读。当前读的时候，部分语句会加范围锁，保证当前读的可重复。</p></li><li><p>Serializable</p><p>可串行化。不存在快照读，所有读操作都会加锁。</p></li></ul><p>对于普通的插入INSERT语句，在没有冲突key情况下，InnoDB并不会对记录上锁，所以这里不再分析简单插入的情况，只分析当前读需要加锁的语句。</p><p>分析使用的表Schema和数据如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>create table t(c1 int primary key, c2 int, c3 int, c4 int, unique index i_c2(c2), index i_c3(c3));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>insert into t values (10, 11, 12, 13), (20, 21, 22, 23), (30, 31, 32, 33), (40, 41, 42, 43);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="read-uncommitted-rc级别加锁分析" tabindex="-1">Read-Uncommitted/RC级别加锁分析 <a class="header-anchor" href="#read-uncommitted-rc级别加锁分析" aria-label="Permalink to &quot;Read-Uncommitted/RC级别加锁分析&quot;">​</a></h2><h3 id="查询条件为主键等值" tabindex="-1">查询条件为主键等值 <a class="header-anchor" href="#查询条件为主键等值" aria-label="Permalink to &quot;查询条件为主键等值&quot;">​</a></h3><ul><li>SELECT … WHERE PK = XX FOR UPDATE;</li></ul><p>select * from t where c1 = 20 for update;</p><p>只需要在c1 = 20的主键记录上加X锁即可，加锁为LOCK_X|LOCK_REC_NOT_GAP。</p><p>select * from t where c1 = 15 for update;</p><p>没有满足记录的行，不加锁。在Read-Uncommitted/RC级别下，对于主键等值查询没有符合条件的查询并不加锁，后面其他语句情况一样，后面不再分析没有满足记录行情况。</p><ul><li>SELECT … WHERE PK = XX LOCK IN SHARE MODE;</li></ul><p>select * from t where c1 = 20 lock in share mode;</p><p>只需要在c1 = 20的主键记录上加S锁即可，加锁为LOCK_S|LOCK_REC_NOT_GAP。</p><ul><li><p>UPDATE … WHERE PK = XX;</p><p>未更新索引列。</p><p>update t set c4 = 12 where c1 = 20;</p><p>只需要在c1 = 20的主键记录上加X锁即可，加锁为LOCK_X|LOCK_REC_NOT_GAP。</p><p>更新包括索引列。</p><p>update t set c2 = 12 where c1 = 20;</p><p>除了主键记录加X锁，还需要在c2的索引上加LOCK_X|LOCK_REC_NOT_GAP，同理c3索引列。</p></li><li><p>DELETE … WHERE PK = XX;</p><p>delete from t where c1 = 20;</p><p>对主键、各个索引对应的记录都要加X锁，LOCK_X|LOCK_REC_NOT_GAP。</p></li></ul><h3 id="查询条件为主键范围" tabindex="-1">查询条件为主键范围 <a class="header-anchor" href="#查询条件为主键范围" aria-label="Permalink to &quot;查询条件为主键范围&quot;">​</a></h3><p>对满足条件的行依次加上述等值分析中需要的锁。</p><p>例如：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>select * from t where c1 &gt;= 20 for update;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会分别对c1 in (20, 30, 40)加X锁（LOCK\\_X\\|LOCK\\_REC\\_NOT\\_GAP）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>select * from t where c1 &lt;=20 for update;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会分别对c1 in (10,20,30)加X锁，然后server层判断c1=30不满足条件随机释放锁。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>update t set c2 = c2 + 1 where c1 &gt;= 20;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会分别对c1 in (20, 30, 40)依次对主键行加X锁，对应的索引行做加X锁操作。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>select * from t where c1 &lt;= 20 for update;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会对c1 in (10,20,30)主键行依次加X锁，但c1=30不满足条件，即再释放c1=30上的锁。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>update t set c2 = c2 + 1 where c1 &lt;= 20;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会对c1 in (10,20）主键行和对应索引行依次加X锁，对c1=30加X锁判断不符合条件，随即释放c1=30上的锁。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Server层对于非条件下推(Index Condition Pushdown-ICP)的场景扫描到不符合条件的行后即释放锁，InnoDB在RC隔离级别下会真正的释放锁，但在RR级别下为了防止其当前读不可重复读的情况，扫描路径上的加锁并不会释放。ICP的相关知识可以查看月报<a href="http://mysql.taobao.org/monthly/2015/12/08/" target="_blank" rel="noreferrer">MySQL · 特性分析 · Index Condition Pushdown (ICP)</a></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>file:sql/sql_executor.cc</span></span>
<span class="line"><span>function: int handler::read_range_next()</span></span>
<span class="line"><span>result= ha_index_next(table-&gt;record[0]);</span></span>
<span class="line"><span>if (result)</span></span>
<span class="line"><span>  DBUG_RETURN(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (compare_key(end_range) &lt;= 0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  DBUG_RETURN(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /*</span></span>
<span class="line"><span>    The last read row does not fall in the range. So request</span></span>
<span class="line"><span>    storage engine to release row lock if possible.</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span>  unlock_row();</span></span>
<span class="line"><span>  DBUG_RETURN(HA_ERR_END_OF_FILE);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function: int handler::compare_key(key_range *range)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  int cmp;</span></span>
<span class="line"><span>  if (!range || in_range_check_pushed_down)</span></span>
<span class="line"><span>    return 0;         // No max range</span></span>
<span class="line"><span>  cmp= key_cmp(range_key_part, range-&gt;key, range-&gt;length);</span></span>
<span class="line"><span>  if (!cmp)</span></span>
<span class="line"><span>    cmp= key_compare_result_on_equal;</span></span>
<span class="line"><span>  return cmp;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="查询条件为唯一索引等值" tabindex="-1">查询条件为唯一索引等值 <a class="header-anchor" href="#查询条件为唯一索引等值" aria-label="Permalink to &quot;查询条件为唯一索引等值&quot;">​</a></h3><ul><li><p>SELECT … WHERE UK = XX FOR UPDATE;</p><p>select * from t where c2 = 21 for update;</p><p>需要在c2 = 21的索引记录上加X锁:LOCK_X|LOCK_REC_NOT_GAP，同时还要在对应主键行上加X锁。</p><p>select * from t where c2 = 16 for update;</p><p>这里没有满足条件的行，不加锁。其他唯一索引等值，没有满足条件行情况下也是没有加锁，后面不再叙述。</p></li><li><p>SELECT … WHERE UK = XX LOCK IN SHARE MODE;</p><p>select * from t where c2 = 21 lock in share mode;</p><p>需要在c2 = 21的索引记录上加S锁:LOCK_S|LOCK_REC_NOT_GAP，同时还要在对应主键行上加S锁。</p></li><li><p>UPDATE … WHERE UK = XX;</p><p>未更新其他索引列</p><p>update t set c4 = 12 where c2 = 21;</p><p>对唯一索引上数据加X锁（LOCK_X|LOCK_REC_NOT_GAP），然后对应的主键行也需要加X锁。</p><p>更新其他索引列</p><p>update t set c3 = 12 where c2 = 21;</p><p>依次对唯一索引数据、主键行、索引数据加X锁。</p></li><li><p>DELETE … WHERE UK = XX;</p><p>delete from t where c2 = 21;</p><p>会对唯一索引数据加X锁，根据唯一索引找到主键行后，会再依次对主键行、唯一索引、索引数据加X锁。</p></li></ul><h3 id="查询条件为唯一索引范围" tabindex="-1">查询条件为唯一索引范围 <a class="header-anchor" href="#查询条件为唯一索引范围" aria-label="Permalink to &quot;查询条件为唯一索引范围&quot;">​</a></h3><ul><li><p>SELECT … WHERE UK &gt;= XX FOR UPDATE;</p><p>select * from t where c2 &gt;= 21 for update;</p><p>这条语句执行的时候会对主键行c1 in (10, 20, 30, 40)依次加X锁， 同时在对c1=10加锁后，分析发现不满足条件会立即释放该行上的X锁。</p><p>**Note:这里为什么没有对唯一索引加锁？**上面的语句优化器判断走主键更优，就走了主键，只对主键加对应X锁。后面还会对选择不同路径的加锁区别做叙述。对于当前读的不同条件的查询，本质上我们都是在分析不同查询路径时加锁的不同。同时对于Read Uncommited和Read Committed隔离级别，会对不满足条件的行立即释放锁。</p><p>如果我们改为select * from t force index(i_c2) where c2 &gt;= 21 for update;强制走唯一索引就会发现，引擎依次对满足条件的唯一索引、主键记录加X锁。</p></li><li><p>SELECT … WHERE UK &lt;= XX FOR UPDATE;</p><p>select * from t force index(i_c2) where c2 &lt;= 21 for update;</p><p>这里会对唯一索引i_c2上c2 in (11, 21)和对应主键行依次加X锁，对于i_c2上c2=31加X锁，且并不会释放。这时候如果另一个session走索引i_c2对c2=31加锁，会发现需要等锁。这里由于索引条件（Index Condition Pushdown-ICP)下推到引擎层，引擎层即判断唯一索引上c2=31不满足条件，即在ha_index_next中返回HA_ERR_END_OF_FILE, c2=31上的X锁，server层并不会去释放。对于该场景，in_range_check_pushed_down为true，在Server层comare_key时并不会去比较range。</p></li><li><p>UPDATE … WHERE UK &lt;= XX FOR UPDATE;</p><p>update t force index(i_c2) set c4 = 1 where c2 &lt;= 21;</p><p>这里会对唯一索引i_c2 c2 in (11, 21, 31)和对应主键行依次加X锁，然后判断c2=31并不满足range条件，随机释放c2=31唯一索引和对应主键行上的X锁。</p><p>ICP只用在SELECT语句执行中，所以这里是server层判断是否满足range条件，然后去释放最后不满足range条件的行。</p><p>update t force index(i_c2) set c3 = 1 where c2 &lt;= 21;</p><p>会对满足range条件的唯一索引i_c2 c2 in (11, 21)和对应主键行、对应非唯一索引i_c3加X锁；对c2=31对应唯一索引和主键行加X锁，判断不符合条件后释放锁。</p></li></ul><p>其他语句形式分析同上，这里不再赘述。</p><h3 id="查询条件为非唯一索引" tabindex="-1">查询条件为非唯一索引 <a class="header-anchor" href="#查询条件为非唯一索引" aria-label="Permalink to &quot;查询条件为非唯一索引&quot;">​</a></h3><p>实际这里通过上面的分析，你也一定已经知道在&lt;= RC隔离级别下非唯一索引的加锁情况。</p><ul><li><p>SELECT … WHERE IDX = XX FOR UPDATE;</p><p>select * from t where c3 = 22 for update;</p><p>对c3 = 22的索引行加X锁，对主键行加X锁。</p><p>上面分析过不同路径对加锁的影响，如果这里执行select * from t force index (primary) where c3 = 22 for update;会是什么样的加锁、释放锁顺序呢？</p></li></ul><p>实际非唯一索引情况与前面唯一索引情况加锁情况一致，这里不再展开叙述。</p><h3 id="查询条件上无索引" tabindex="-1">查询条件上无索引 <a class="header-anchor" href="#查询条件上无索引" aria-label="Permalink to &quot;查询条件上无索引&quot;">​</a></h3><p>先分析如下例子：</p><ul><li><p>SELECT … WHERE COL = XX FOR UPDATE;</p><p>select * from t where c4 = 23 for update;</p><p>会依次对c1 in (10, 20, 30, 40)依次加X锁，分析是否满足条件，不满足即释放。为c1 = 10行加锁，不满足条件释放锁；c1=20加锁，满足条件，保留锁；c1=30加锁，不满足条件，释放；c1=40行加锁，不满足条件，释放。</p></li></ul><p>其他语句情况类似，由于路径选择主键，会依次对主键行加锁，分析条件，不满足条件释放锁，满足条件持有锁，不再赘述。</p><h3 id="多条件查询" tabindex="-1">多条件查询 <a class="header-anchor" href="#多条件查询" aria-label="Permalink to &quot;多条件查询&quot;">​</a></h3><p>当存在多个条件的时候，除了主键行上的锁，其他的加锁情况取决于选择的路径。如下例子：</p><ul><li><p>select * from t where c2 = 21 and c3 = 22 for update;</p><p>这里选择了走唯一索引，就会对满足条件的唯一索引行加X锁，然后对主键行加X锁。</p></li><li><p>select * from t where c2 = 21 or c3 = 22 for update;</p><p>选择主键路径，就会对所有行一次加X锁，分析条件，最终持有主键上c1 = 20的X锁。</p></li></ul><h2 id="repeatable-read隔离级别加锁分析" tabindex="-1">Repeatable-Read隔离级别加锁分析 <a class="header-anchor" href="#repeatable-read隔离级别加锁分析" aria-label="Permalink to &quot;Repeatable-Read隔离级别加锁分析&quot;">​</a></h2><h3 id="查询条件为主键等值-1" tabindex="-1">查询条件为主键等值 <a class="header-anchor" href="#查询条件为主键等值-1" aria-label="Permalink to &quot;查询条件为主键等值&quot;">​</a></h3><ul><li><p>SELECT … WHERE PK = XX FOR UPDATE;</p><p>select * from t where c1 = 20 for update;</p><p>由于主键具有唯一性，等值查询这里加锁与RC级别一致，对c1=20加X锁(LOCK_X|LOCK_REC_NOT_GAP)。</p><p>select * from t where c1 = 15 for update;</p><p>对于没有满足条件的行情况，会对后面的c1=20加GAP锁，（LOCK_X|LOCK_GAP），防止有其他语句插入c1=15的行。</p><p>update t set c4 = 12 where c1 = 15;</p><p>没有满足条件的行不加锁。</p></li></ul><p>其他情况也与RC一致。</p><h3 id="查询条件为主键范围-1" tabindex="-1">查询条件为主键范围 <a class="header-anchor" href="#查询条件为主键范围-1" aria-label="Permalink to &quot;查询条件为主键范围&quot;">​</a></h3><ul><li><p>SELECT … WHERE PK &gt;= XX FOR UPDATE;</p><p>select * from t where c1 &gt;= 20 for update;</p><p>这里会对c1=20加X锁(LOCK_X|LOCK_REC_NOT_GAP)，对c1=30, c1=40对应的行加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，同时会对表示记录上界的’supremum’加exclusive next-key lock。这样做到阻塞其他事务对c1&gt;=20的加锁操作。</p></li><li><p>SELECT … WHERE PK &gt;= XX LOCK IN SHARE MODE;</p><p>select * from t where c1 &gt;= 20 LOCK IN SHARE MODE;</p><p>这里会对c1=20加S锁(LOCK_S|LOCK_REC_NOT_GAP)，对c1=30, c1=40对应的行加share next-key lock(LOCK_S|LOCK_ORDINARY)，同时会对表示记录上界的’supremum’加share next-key lock。</p></li><li><p>SELECT … WHERE PK &lt;= XX FOR UPDATE;</p><p>select * from t where c1 &lt;= 20 for update;</p><p>这里会对c1 in(10,20,30)依次加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)。且在判断c1=30不符合查询条件后，虽然server层调用unlock_row，但对于RC隔离级别以上且没有设置innodb_locks_unsafe_for_binlog那么并不会释放锁。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>file: ha_innodb.cc</span></span>
<span class="line"><span>function: ha_innobase::unlock_row(void)</span></span>
<span class="line"><span>switch (m_prebuilt-&gt;row_read_type) {</span></span>
<span class="line"><span>  case ROW_READ_WITH_LOCKS:</span></span>
<span class="line"><span>  if (!srv_locks_unsafe_for_binlog</span></span>
<span class="line"><span>      &amp;&amp; m_prebuilt-&gt;trx-&gt;isolation_level</span></span>
<span class="line"><span>      &gt; TRX_ISO_READ_COMMITTED) {</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li><li><p>UPDATE … WHERE PK &gt;= XX;</p><p>未更新其他索引列。</p><p>update t set c4 = 1 where c1 &gt;= 20;</p><p>加锁与上面SELECT… WHERE PK &gt;= XX FOR UPDATE;一致。</p><p>更新包含索引列。</p><p>update t set c2 = c2 + 1 where c1 &gt;= 20;</p><p>对主键c1=20加X锁，i_c2索引行加X锁，然后对c1=30,c1=40的主键行加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，同时对应的i_c2索引行加X锁，最后对表示记录上界的’supremum’加exclusive next-key lock。</p></li><li><p>UPDATE … WHERE PK &lt;= XX;</p><p>update t set c4 = 1 where c1 &lt;= 20;</p><p>加锁与SELECT… WHERE PK &lt;= XX FOR UPDATE;一致</p><p>包含索引列。</p><p>update t set c2 = c2 + 1 where c1 &lt;= 20;</p><p>对主键c1 in(10,20)加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，同时对应的i_c2索引行加X锁。然后对c1=30加加exclusive next-key lock，因不满足条件，因此server层查询停止。同样并不会释放c1=30上的锁。</p></li><li><p>DELETE … WHERE PK &gt;= XX;</p><p>会对c1=20加X锁，对c1=20对应的i_c2索引，i_c3索引加X锁，然后依次对c1=30, c1=40加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，同时i_c2和i_c3对应的索引行加X锁，最后对’supremum’加LOCK_X|LOCK_ORDINARY。</p></li></ul><h3 id="查询条件为唯一索引等值-1" tabindex="-1">查询条件为唯一索引等值 <a class="header-anchor" href="#查询条件为唯一索引等值-1" aria-label="Permalink to &quot;查询条件为唯一索引等值&quot;">​</a></h3><p>由于唯一索引中非NULL值具有唯一性，所以这里的加锁和RC会一致。但由于唯一索引可以有多个null值，对于col is null的条件加锁是不一样的。</p><ul><li><p>SELECT … WHERE UK = XX FOR UPDATE;</p><p>select * from t where c2 = 21 for update;</p><p>这里与RR下主键等值加锁一致，对c2=21的值加X锁，对应主键行加X锁。</p></li><li><p>SELECT … WHERE UK IS NULL FOR UPDATE;</p><p>select * from t where c2 is null for update;</p><p>这里由于c2上没有为null值的record，所以这里对c2=11的record上加GAP LOCK(LOCK_X|LOCK_GAP)。</p></li></ul><p>其他等值语句的执行与唯一索引等值在RC下一致。</p><p>如果再在table t中插入(50, null, 52, 53);为NULL的值，那么update t set c4 = 1 where c2 is null会对c2为NULL的行加NEXT-KEY LOCK(LOCK_X|LOCK_ORDINARY)，对应主键加X锁，并在c2=11上加GAP LOCK(LOCK_X|LOCK_GAP)。实际上唯一索引is null的\b加锁和非唯一索引等值加锁类似，后面会对非唯一索引情况做进一步描述。</p><h3 id="查询条件为唯一索引范围-1" tabindex="-1">查询条件为唯一索引范围 <a class="header-anchor" href="#查询条件为唯一索引范围-1" aria-label="Permalink to &quot;查询条件为唯一索引范围&quot;">​</a></h3><ul><li><p>SELECT … WHERE UK &gt;= XX FOR UPDATE;</p><p>select * from t where c2 &gt;= 21 for update;</p><p>对于该语句执行，默认会选择主键路径，对c1 in (10, 20, 30, 40)分别加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，同时对上界’supremum’加exclusive next-key lock，锁住全部数据范围。</p><p>select * from t force index(i_c2) where c2 &gt;= 21 for update;</p><p>如果指定走i_c2索引，那么会对c2 in (21, 31, 41)分别加exclusive next-key lock，对应主键行加X锁，同时对i_c2上’supremum’ record加exclusive next-key lock。</p></li><li><p>SELECT … WHERE UN &lt;= XX FOR UPDATE;</p><p>select * from t force index(i_c2) where c2 &lt;= 21 for update;</p><p>这里会对i_c2索引上c2 in (11,21)加exclusive next-key lock，对对应的主键行加X锁，然后对c2=31加exclusive next-key lock，且并不会去释放。</p></li><li><p>UPDATE … WHERE UK &gt;= XX;</p><p>未包含索引列。</p><p>update t force index (i_c2) set c4 = 1 where c2 &gt;= 21;</p><p>等同上面指定走唯一索引的SELECT…FOR UPDATE语句加锁。</p><p>包含索引列。</p><p>update t force index (i_c2) set c3 = 1 where c2 &gt;= 21;</p><p>除了上述语句的加锁外，还会对c1 in (20, 30, 40)对应索引i_c3上的行加X锁。</p></li><li><p>UPDATE … WHERE UN &lt;= XX;</p><p>未包含索引列。</p><p>update t force index(i_c2) set c4 = 1 where c2 &lt;= 21;</p><p>这里会对i_c2索引上c2 in (11,21,31)加exclusive next-key lock，对对应的主键行加X锁。因为没有ICP，这里c2=31对应的索引行和主键行也会加X锁，同时不会释放。</p><p>包含索引列</p><p>这里会对i_c2索引上c2 in (11,21)加exclusive next-key lock，对对应的主键行和索引i_c3加X锁。对c2=31加exclusive next-key lock，对应主键行加X锁，因不符合range条件，对i_c3不做操作不会加锁。</p></li><li><p>DELETE … WHERE UK &gt;= XX;</p><p>delete from t where c2 &gt;= 41;</p><p>上述语句选择了i_c2索引，会对c2 = 41加exclusive next-key lock，对应主键行加X锁，i_c2，i_c3上数据行进行加X锁操作，对i_c2上’supremum’ record加exclusive next-key lock。</p></li></ul><h3 id="查询条件为非唯一索引等值" tabindex="-1">查询条件为非唯一索引等值 <a class="header-anchor" href="#查询条件为非唯一索引等值" aria-label="Permalink to &quot;查询条件为非唯一索引等值&quot;">​</a></h3><ul><li><p>SELECT … WHERE INDEX = XX FOR UPDATE;</p><p>select * from t where c3 = 22 for update;</p><p>会对c3 =22在i_c3索引上加exclusive next-key lock(LOCK_X|LOCK_ORDINARY)，对应主键加X锁(LOCK_X|LOCK_REC_NOT_GAP)，然后在下一条记录上加exclusive gap lock(LOCK_X|LOCK_GAP)。即该语句会锁定范围(11, 31)。</p></li><li><p>SELECT … WHERE INDEX = XX LOCK IN SHARE MODE;</p><p>加锁为：将上述FOR UPDATE语句的exclusive(LOCK_X)改为share(LOCK_S)。</p></li><li><p>UPDATE … WHERE INDEX = XX;</p><p>未包含索引列。</p><p>update t set c4 = 2 where c3 = 22;</p><p>加锁与上述FOR UPDATE一致。</p><p>包含索引列。</p><p>update t set c2 = 2 where c3 = 22;</p><p>除了上述锁，对c1 = 20对应的唯一索引(i_c2)行加X锁。</p></li><li><p>DELETE … WHERE INDEX = XX;</p><p>除了SELECT … WHERE INDEX = XX FOR UPDATE的锁，添加对唯一索引、索引做加X锁操作。</p></li></ul><h3 id="查询条件为非唯一索引范围" tabindex="-1">查询条件为非唯一索引范围 <a class="header-anchor" href="#查询条件为非唯一索引范围" aria-label="Permalink to &quot;查询条件为非唯一索引范围&quot;">​</a></h3><p>这里加锁与唯一索引的当前读范围查询一致，不在赘述。</p><h2 id="serializable-级别加锁分析" tabindex="-1">Serializable 级别加锁分析 <a class="header-anchor" href="#serializable-级别加锁分析" aria-label="Permalink to &quot;Serializable 级别加锁分析&quot;">​</a></h2><p>Serializable的加锁与RR隔离级别大多情形下一致，不同点是：</p><p>Serializable下普通SELECT语句查询也是当前读。例如下面语句：</p><p>select * from t where c1 = 20就会对c1=20的主键行加S锁(LOCK_S|LOCK_REC_NOT_GAP)。</p><p>对于UPDATE等做更新修改的语句，没有满足条件的行，也会对后面的行加GAP锁。例如下面语句：</p><p>update t set c4 = 12 where c1 = 15;也会对c1=20主键行加LOCK_X|LOCK_GAP锁。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本文学习了InnoDB行锁相关源码，并对不同事务隔离级别下加锁进行了分析，对应知识点可以用于帮助分析SQL语句加锁情况。上面分析过程也可以发现，在RR隔离级别和Serializable隔离级别下，不同的路径选择不仅影响本语句执行效率，还会影响锁定的数据范围，严重影响并发。</p>`,127),i=[l];function r(c,t,b,o,u,m){return a(),n("div",null,i)}const h=s(e,[["render",r]]);export{d as __pageData,h as default};
