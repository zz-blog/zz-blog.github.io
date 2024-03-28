import{_ as a,c as p,m as n,a as e,t as l,a5 as i,o as r}from"./chunks/framework.DwbewbAn.js";const v=JSON.parse('{"title":"Binlog 崩溃恢复","description":"","frontmatter":{"title":"Binlog 崩溃恢复"},"headers":[],"relativePath":"doc/数据库/Mysql/基础/日志/Binlog/Binlog crash recovery.md","filePath":"packages/doc/src/数据库/Mysql/基础/日志/Binlog/Binlog crash recovery.md","lastUpdated":1711354439000}'),c={name:"doc/数据库/Mysql/基础/日志/Binlog/Binlog crash recovery.md"},b={id:"frontmatter-title",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),o=i(`<p>本文主要介绍binlog crash recovery 的过程，假设用户使用 InnoDB 引擎，sync_binlog=1，使用 MySQL 5.7.20 版本进行分析</p><p>crash recovery 过程中，binlog 需要保证：</p><ol><li>所有已提交事务的binlog已存在</li><li>所有未提交事务的binlog不存在</li></ol><h3 id="两阶段提交" tabindex="-1">两阶段提交 <a class="header-anchor" href="#两阶段提交" aria-label="Permalink to &quot;两阶段提交&quot;">​</a></h3><p>MySQL 使用两阶段提交解决 binlog 和 InnoDB redo log 的一致性的问题</p><p>也就是将普通事务当做内部XA事务处理，为每个事务分配一个XID，binlog作为事务的协调者</p><ul><li>阶段1：InnoDB redo log 写盘，InnoDB 事务进入 prepare 状态</li><li>阶段2：binlog 写盘，InooDB 事务进入 commit 状态</li></ul><p>每个事务binlog的末尾，会记录一个 XID event，标志着事务是否提交成功，也就是说，recovery 过程中，binlog 最后一个 XID event 之后的内容都应该被 purge。</p><p>InnoDB 日志可能也需要回滚或者提交，这里就不再展开。</p><h3 id="binlog-文件的-crash-recovery" tabindex="-1">binlog 文件的 crash recovery <a class="header-anchor" href="#binlog-文件的-crash-recovery" aria-label="Permalink to &quot;binlog 文件的 crash recovery&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mysqld_main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  init_server_components</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    MYSQL_BIN_LOG::open</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      MYSQL_BIN_LOG::open_binlog</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>binlog recover 的主要过程在 MYSQL_BIN_LOG::open_binlog 中</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int MYSQL_BIN_LOG::open_binlog(const char *opt_name)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* 确保 index 文件初始化成功 */</span></span>
<span class="line"><span>  if (!my_b_inited(&amp;index_file))                                                                                                                                                                            </span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    /* There was a failure to open the index file, can&#39;t open the binlog */</span></span>
<span class="line"><span>    cleanup();</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* 找到 index 中第一个 binlog */</span></span>
<span class="line"><span>  if ((error= find_log_pos(&amp;log_info, NullS, true/*need_lock_index=true*/)))</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    /* 找到 index 中最后一个 binlog */</span></span>
<span class="line"><span>    do</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      strmake(log_name, log_info.log_file_name, sizeof(log_name)-1);                                                                                                                                        </span></span>
<span class="line"><span>    } while (!(error= find_next_log(&amp;log_info, true/*need_lock_index=true*/)));</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    /*</span></span>
<span class="line"><span>      打开最后一个binlog，会校验文件头的 magic number &quot;\\xfe\\x62\\x69\\x6e&quot;</span></span>
<span class="line"><span>      如果 magic number 校验失败，会直接报错退出，无法完成recovery</span></span>
<span class="line"><span>      如果确定最后一个binlog没有内容，可以删除binlog 文件再重试</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    if ((file= open_binlog_file(&amp;log, log_name, &amp;errmsg)) &lt; 0)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    /*</span></span>
<span class="line"><span>      如果 binlog 没有正常关闭，mysql server 可能crash过，</span></span>
<span class="line"><span>      我们需要调用 MYSQL_BIN_LOG::recover：</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        a) 找到最后一个 XID</span></span>
<span class="line"><span>        b) 完成最后一个事务的两阶段提交（InnoDB commit）</span></span>
<span class="line"><span>        c) 找到最后一个合法位点</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      因此，我们需要遍历 binlog 文件，找到最后一个合法event集合，并 purge 无效binlog</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    if ((ev= Log_event::read_log_event(&amp;log, 0, &amp;fdle,</span></span>
<span class="line"><span>                                       opt_master_verify_checksum)) &amp;&amp;</span></span>
<span class="line"><span>        ev-&gt;get_type_code() == binary_log::FORMAT_DESCRIPTION_EVENT &amp;&amp;</span></span>
<span class="line"><span>        (ev-&gt;common_header-&gt;flags &amp; LOG_EVENT_BINLOG_IN_USE_F ||</span></span>
<span class="line"><span>         DBUG_EVALUATE_IF(&quot;eval_force_bin_log_recovery&quot;, true, false)))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      sql_print_information(&quot;Recovering after a crash using %s&quot;, opt_name);   </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      /* 初始化合法位点 */                                                                                                                              </span></span>
<span class="line"><span>      valid_pos= my_b_tell(&amp;log);</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      /* 执行recover 过程 ，并计算出合法位点 */</span></span>
<span class="line"><span>      error= recover(&amp;log, (Format_description_log_event *)ev, &amp;valid_pos);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      error=0;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (valid_pos &gt; 0){</span></span>
<span class="line"><span>      if (valid_pos &lt; binlog_size)</span></span>
<span class="line"><span>      { </span></span>
<span class="line"><span>        /* 将 valid_pos 后面的binlog purge掉 */</span></span>
<span class="line"><span>        if (my_chsize(file, valid_pos, 0, MYF(MY_WME)))</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }   </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><p>recover 函数的逻辑很简单：遍历最后一个binlog的所有 event，每次事务结尾，或者非事务event结尾更新 valid_pos(gtid event不更新)。并在一个 hash 中记录所有xid，用于引擎层 recover</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int MYSQL_BIN_LOG::recover(IO_CACHE *log, Format_description_log_event *fdle,</span></span>
<span class="line"><span>                            my_off_t *valid_pos)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 初始化 XID hash，用于记录 binlog 中的 xid */</span></span>
<span class="line"><span>  if (! fdle-&gt;is_valid() ||                                                                                                                                                                                 </span></span>
<span class="line"><span>      my_hash_init(&amp;xids, &amp;my_charset_bin, TC_LOG_PAGE_SIZE/3, 0,</span></span>
<span class="line"><span>                   sizeof(my_xid), 0, 0, MYF(0),</span></span>
<span class="line"><span>                   key_memory_binlog_recover_exec))</span></span>
<span class="line"><span>    goto err1;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* 依次读取 binlog event */</span></span>
<span class="line"><span>  while ((ev= Log_event::read_log_event(log, 0, fdle, TRUE))</span></span>
<span class="line"><span>         &amp;&amp; ev-&gt;is_valid())</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    if (ev-&gt;get_type_code() == binary_log::QUERY_EVENT &amp;&amp;</span></span>
<span class="line"><span>        !strcmp(((Query_log_event*)ev)-&gt;query, &quot;BEGIN&quot;))</span></span>
<span class="line"><span>      /* begin 代表事务开始 */</span></span>
<span class="line"><span>      in_transaction= TRUE;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (ev-&gt;get_type_code() == binary_log::QUERY_EVENT &amp;&amp;</span></span>
<span class="line"><span>        !strcmp(((Query_log_event*)ev)-&gt;query, &quot;COMMIT&quot;))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      DBUG_ASSERT(in_transaction == TRUE);</span></span>
<span class="line"><span>      /* commit 代表事务结束 */</span></span>
<span class="line"><span>      in_transaction= FALSE;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else if (ev-&gt;get_type_code() == binary_log::XID_EVENT)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      DBUG_ASSERT(in_transaction == TRUE);</span></span>
<span class="line"><span>      /* xid event 代表事务结束 */</span></span>
<span class="line"><span>      in_transaction= FALSE;</span></span>
<span class="line"><span>      Xid_log_event *xev=(Xid_log_event *)ev;</span></span>
<span class="line"><span>      uchar *x= (uchar *) memdup_root(&amp;mem_root, (uchar*) &amp;xev-&gt;xid,</span></span>
<span class="line"><span>                                      sizeof(xev-&gt;xid));</span></span>
<span class="line"><span>      /* 记录 xid */</span></span>
<span class="line"><span>      if (!x || my_hash_insert(&amp;xids, x))</span></span>
<span class="line"><span>        goto err2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*</span></span>
<span class="line"><span>      如果不在事务中，且不是gtid event，则更新 valid_pos</span></span>
<span class="line"><span>      显然，如果在事务中，最后一段 event 不是一个完整事务，pos并不合法</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    if (!log-&gt;error &amp;&amp; !in_transaction &amp;&amp;</span></span>
<span class="line"><span>        !is_gtid_event(ev))</span></span>
<span class="line"><span>      *valid_pos= my_b_tell(log);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /*</span></span>
<span class="line"><span>    存储引擎recover</span></span>
<span class="line"><span>    所有已经记录 XID 的事务必须在存储引擎中提交</span></span>
<span class="line"><span>    未记录 XID 的事务必须回滚</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span>  if (total_ha_2pc &gt; 1 &amp;&amp; ha_recover(&amp;xids))</span></span>
<span class="line"><span>    goto err2;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h3 id="binlog-index-的-crash-recovery" tabindex="-1">binlog index 的 crash recovery <a class="header-anchor" href="#binlog-index-的-crash-recovery" aria-label="Permalink to &quot;binlog index 的 crash recovery&quot;">​</a></h3><p>为了保证 binlog index 的 crash safe，MySQL 引入了一个临时文件 crash_safe_index_file</p><p>新的 binlog_file_name 写入 binlog_index_file 流程如下：</p><ul><li>创建临时文件 crash_safe_index_file</li><li>拷贝 binlog_index_file 中的内容到 crash_safe_index_file</li><li>新的 binlog_file_name 写入 crash_safe_index_file</li><li>删除 binlog_index_file</li><li>重命名 crash_safe_index_file 到 binlog_index_file</li></ul><p>这个流程保证了在任何时候crash，binlog_index_file 和 crash_safe_index_file 至少有一个可用</p><p>这样再recover 时只要判断这两个文件是否可用，如果 binlog_index_file 可用则无需特殊处理，如果binlog_index_file 不可用则重命名 crash_safe_index_file 到 binlog_index_file</p><p>binlog index 的 recover 过程主要在 bool MYSQL_BIN_LOG::open_index_file 中</p><p>显然，open_indix_file 在 open_binlog 之前</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mysqld_main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  init_server_components</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    MYSQL_BIN_LOG::open_index_file</span></span>
<span class="line"><span>bool MYSQL_BIN_LOG::open_index_file(const char *index_file_name_arg,</span></span>
<span class="line"><span>                                    const char *log_name, bool need_lock_index)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* 拼接 index_file_name */</span></span>
<span class="line"><span>  fn_format(index_file_name, index_file_name_arg, mysql_data_home,</span></span>
<span class="line"><span>            &quot;.index&quot;, opt); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 拼接 crash_safe_index_file_name */</span></span>
<span class="line"><span>  if (set_crash_safe_index_file_name(index_file_name_arg))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /*</span></span>
<span class="line"><span>    recover 主要体现在这里</span></span>
<span class="line"><span>    检查 index_file_name 和 crash_safe_index_file_name 是否存在</span></span>
<span class="line"><span>    如果 index_file_name 不存在 crash_safe_index_file_name 存在，</span></span>
<span class="line"><span>    那么将 crash_safe_index_file_name 重命名为 index_file_name</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span>  if (my_access(index_file_name, F_OK) &amp;&amp;</span></span>
<span class="line"><span>      !my_access(crash_safe_index_file_name, F_OK) &amp;&amp;</span></span>
<span class="line"><span>      my_rename(crash_safe_index_file_name, index_file_name, MYF(MY_WME)))</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    sql_print_error(&quot;MYSQL_BIN_LOG::open_index_file failed to &quot;</span></span>
<span class="line"><span>                    &quot;move crash_safe_index_file to index file.&quot;);</span></span>
<span class="line"><span>    error= true;</span></span>
<span class="line"><span>    goto end;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>新的 binlog_file_name 写入 binlog_index_file 的过程在 MYSQL_BIN_LOG::add_log_to_index</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int MYSQL_BIN_LOG::add_log_to_index(uchar* log_name,</span></span>
<span class="line"><span>                                    size_t log_name_len, bool need_lock_index)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* 创建 crash_safe_index_file */</span></span>
<span class="line"><span>  if (open_crash_safe_index_file())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 拷贝 index_file 内容到 crash_safe_index_file */</span></span>
<span class="line"><span>  if (copy_file(&amp;index_file, &amp;crash_safe_index_file, 0))</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* 写入 binlog_file_name */</span></span>
<span class="line"><span>  if (my_b_write(&amp;crash_safe_index_file, log_name, log_name_len) ||</span></span>
<span class="line"><span>      my_b_write(&amp;crash_safe_index_file, (uchar*) &quot;\\n&quot;, 1) ||</span></span>
<span class="line"><span>      flush_io_cache(&amp;crash_safe_index_file) ||</span></span>
<span class="line"><span>      mysql_file_sync(crash_safe_index_file.file, MYF(MY_WME)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /*</span></span>
<span class="line"><span>    函数内部先 delete binlog_index_file 再 rename crash_safe_index_file</span></span>
<span class="line"><span>    如果 delete 到 rename 之间发生 crash， crash_safe_index_file 会在 recover过程中 rename 成 binlog_index_file</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span>  if (move_crash_safe_index_file_to_index_file(need_lock_index))</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>MySQL 解决了binlog crash safe 的问题，但是 relay log 依然不保证 crash safe。</p><p>relay log 结构和 binlog 一致，可以借鉴 binlog crash safe 的方式，计算出 valid_pos，将 valid_pos之后的 event 全部purge。</p>`,29);function m(s,t,u,d,g,f){return r(),p("div",null,[n("h1",b,[e(l(s.$frontmatter.title)+" ",1),_]),o])}const x=a(c,[["render",m]]);export{v as __pageData,x as default};
