import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.3daba8ea.js";const y=JSON.parse('{"title":"auto.cnf","description":"","frontmatter":{},"headers":[],"relativePath":"doc/数据库/Mysql/问题/auto.cnf文件.md","filePath":"packages/doc/src/数据库/Mysql/问题/auto.cnf文件.md","lastUpdated":1702458087000}'),l={name:"doc/数据库/Mysql/问题/auto.cnf文件.md"},p=e(`<h1 id="auto-cnf" tabindex="-1">auto.cnf <a class="header-anchor" href="#auto-cnf" aria-label="Permalink to &quot;auto.cnf&quot;">​</a></h1><h2 id="_1-auto-cnf文件" tabindex="-1">1.auto.cnf文件 <a class="header-anchor" href="#_1-auto-cnf文件" aria-label="Permalink to &quot;1.auto.cnf文件&quot;">​</a></h2><p>MySQL数据目录中通常存在一个名为auto.cnf文件，存储了server-uuid的值，如下所示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[auto]</span></span>
<span class="line"><span style="color:#e1e4e8;">server-uuid=f2d0efd6-6ab7-11e8-8fdd-fa163eda7360</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[auto]</span></span>
<span class="line"><span style="color:#24292e;">server-uuid=f2d0efd6-6ab7-11e8-8fdd-fa163eda7360</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>MySQL启动时，会自动从data_dir/auto.cnf 文件中获取server-uuid值，并将这个值存储在全局变量server_uuid中。如果这个值或者这个文件不存在，那么将会生成一个新的uuid值，并将这个值保存在auto.cnf文件中。server-uuid与server-id一样，用于标识MySQL实例在集群中的唯一性，这两个参数在主从复制中具有重要作用，默认情况下，如果主、从库的server-uuid或者server-id的值一样，将会导致主从复制报错中断。</p><p>在主库中执行show slave hosts; 能够看到主、从库的server-id和从库的server-uuid，如下所示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; show slave hosts;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Server_id | Host | Port | Master_id | Slave_UUID                           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 170238777 |      | 3306 | 170238776 | 5a0280d4-6404-11e8-840e-fa163eab3dcf |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 170238778 |      | 3306 | 170238776 | 4db07c8a-6f01-11e8-bef6-fa163e767b9a |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; show slave hosts;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| Server_id | Host | Port | Master_id | Slave_UUID                           |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 170238777 |      | 3306 | 170238776 | 5a0280d4-6404-11e8-840e-fa163eab3dcf |</span></span>
<span class="line"><span style="color:#24292e;">| 170238778 |      | 3306 | 170238776 | 4db07c8a-6f01-11e8-bef6-fa163e767b9a |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----------+--------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在从库中执行show slave status\\G，能够看到主库的server-id和server-uuid，如下所示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">                           ......</span></span>
<span class="line"><span style="color:#e1e4e8;">             Master_Server_Id: 170238776</span></span>
<span class="line"><span style="color:#e1e4e8;">                  Master_UUID: f2d0efd6-6ab7-11e8-8fdd-fa163eda7360</span></span>
<span class="line"><span style="color:#e1e4e8;">             Master_Info_File: mysql.slave_master_info</span></span>
<span class="line"><span style="color:#e1e4e8;">                    SQL_Delay: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">          SQL_Remaining_Delay: NULL</span></span>
<span class="line"><span style="color:#e1e4e8;">      Slave_SQL_Running_State:</span></span>
<span class="line"><span style="color:#e1e4e8;">           Master_Retry_Count: 86400</span></span>
<span class="line"><span style="color:#e1e4e8;">                           ......</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">                           ......</span></span>
<span class="line"><span style="color:#24292e;">             Master_Server_Id: 170238776</span></span>
<span class="line"><span style="color:#24292e;">                  Master_UUID: f2d0efd6-6ab7-11e8-8fdd-fa163eda7360</span></span>
<span class="line"><span style="color:#24292e;">             Master_Info_File: mysql.slave_master_info</span></span>
<span class="line"><span style="color:#24292e;">                    SQL_Delay: 0</span></span>
<span class="line"><span style="color:#24292e;">          SQL_Remaining_Delay: NULL</span></span>
<span class="line"><span style="color:#24292e;">      Slave_SQL_Running_State:</span></span>
<span class="line"><span style="color:#24292e;">           Master_Retry_Count: 86400</span></span>
<span class="line"><span style="color:#24292e;">                           ......</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_2-主、从库server-uuid值一样-导致主从复制异常中断" tabindex="-1">2. 主、从库server-uuid值一样，导致主从复制异常中断 <a class="header-anchor" href="#_2-主、从库server-uuid值一样-导致主从复制异常中断" aria-label="Permalink to &quot;2. 主、从库server-uuid值一样，导致主从复制异常中断&quot;">​</a></h2><p>MySQL在初始化的时候，会去数据目录里的auto.cnf文件读取server-uuid参数，如果没有auto.cnf文件或者没有读到server-uuid参数，通过执行generate_server_uuid 函数生成一个新的uuid值，并通过flush_auto_options函数将server-uuid值写入到auto.cnf文件中。具体的函数调用及源码文件如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">main                       //main.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_main                //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">init_server_auto_options   //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">generate_server_uuid       //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">flush_auto_options         //mysqld.cc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">main                       //main.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_main                //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">init_server_auto_options   //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">generate_server_uuid       //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">flush_auto_options         //mysqld.cc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>主从复制时，如果从库发现它所复制的主库的uuid 与 它自己的uuid一样，默认情况下从库的I/O线程会直接报错退出。MySQL提供了额外参数–replicate-same-server-id，用于改变这一默认行为。如果设置replicate-same-server-id为1，即使主从库uuid一样，也能正常复制，但是会产生意想不到的结果，实际使用中也很少会这么使用。相关代码实现位于rpl_slave.cc文件的get_master_uuid函数中，具体源码实现如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">main                //main.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_main         //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_socket_acceptor-&gt;connection_event_loop    //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection_handler_manager::process_new_connection(Channel_info* channel_info)  //connection_handler_manager.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">bool Per_thread_connection_handler::add_connection(Channel_info* channel_info)  //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">handle_connection        //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">do_command               //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">dispatch_command         //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql_parse              //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql_execute_command    //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave_cmd          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave              //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave_threads      //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">handle_slave_io          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">get_master_uuid          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">//rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">//static int get_master_uuid(MYSQL *mysql, Master_info *mi)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">char query_buf[]= &quot;SELECT @@GLOBAL.SERVER_UUID&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">if (!mysql_real_query(mysql, STRING_WITH_LEN(query_buf)) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">      (master_res= mysql_store_result(mysql)) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">      (master_row= mysql_fetch_row(master_res)))</span></span>
<span class="line"><span style="color:#e1e4e8;">  {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (!strcmp(::server_uuid, master_row[0]) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">        !mi-&gt;rli-&gt;replicate_same_server_id)</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      errmsg= &quot;The slave I/O thread stops because master and slave have  equal &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              &quot;MySQL server UUIDs; these UUIDs must be different for &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              &quot;replication to work.&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      mi-&gt;report(ERROR_LEVEL, ER_SLAVE_FATAL_ERROR,  ER(ER_SLAVE_FATAL_ERROR),</span></span>
<span class="line"><span style="color:#e1e4e8;">                 errmsg);</span></span>
<span class="line"><span style="color:#e1e4e8;">      // Fatal error</span></span>
<span class="line"><span style="color:#e1e4e8;">      ret= 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">main                //main.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_main         //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_socket_acceptor-&gt;connection_event_loop    //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">Connection_handler_manager::process_new_connection(Channel_info* channel_info)  //connection_handler_manager.cc</span></span>
<span class="line"><span style="color:#24292e;">bool Per_thread_connection_handler::add_connection(Channel_info* channel_info)  //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#24292e;">handle_connection        //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#24292e;">do_command               //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">dispatch_command         //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">mysql_parse              //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">mysql_execute_command    //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave_cmd          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave              //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave_threads      //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">handle_slave_io          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">get_master_uuid          //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">//rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">//static int get_master_uuid(MYSQL *mysql, Master_info *mi)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">char query_buf[]= &quot;SELECT @@GLOBAL.SERVER_UUID&quot;;</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">if (!mysql_real_query(mysql, STRING_WITH_LEN(query_buf)) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">      (master_res= mysql_store_result(mysql)) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">      (master_row= mysql_fetch_row(master_res)))</span></span>
<span class="line"><span style="color:#24292e;">  {</span></span>
<span class="line"><span style="color:#24292e;">    if (!strcmp(::server_uuid, master_row[0]) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">        !mi-&gt;rli-&gt;replicate_same_server_id)</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      errmsg= &quot;The slave I/O thread stops because master and slave have  equal &quot;</span></span>
<span class="line"><span style="color:#24292e;">              &quot;MySQL server UUIDs; these UUIDs must be different for &quot;</span></span>
<span class="line"><span style="color:#24292e;">              &quot;replication to work.&quot;;</span></span>
<span class="line"><span style="color:#24292e;">      mi-&gt;report(ERROR_LEVEL, ER_SLAVE_FATAL_ERROR,  ER(ER_SLAVE_FATAL_ERROR),</span></span>
<span class="line"><span style="color:#24292e;">                 errmsg);</span></span>
<span class="line"><span style="color:#24292e;">      // Fatal error</span></span>
<span class="line"><span style="color:#24292e;">      ret= 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="_3-主、从库server-id值一样-同样导致主从复制异常中断" tabindex="-1">3. 主、从库server-id值一样，同样导致主从复制异常中断 <a class="header-anchor" href="#_3-主、从库server-id值一样-同样导致主从复制异常中断" aria-label="Permalink to &quot;3. 主、从库server-id值一样，同样导致主从复制异常中断&quot;">​</a></h2><p>如果主从复制时，从库发现它所复制的主库的server_id 与 它自己的server_id一样，默认情况下从库的I/O线程也会直接报错退出。通过设置–replicate-same-server-id 参数为1，可改变这一默认行为。代码实现如下：</p><p>下面是执行start slave;命令时的函数调用关系。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">main                  //main.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_main           //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_socket_acceptor-&gt;connection_event_loop    //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection_handler_manager::process_new_connection(Channel_info* channel_info)    //connection_handler_manager.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">bool Per_thread_connection_handler::add_connection(Channel_info* channel_info)    //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">handle_connection                   //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">do_command                          //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">dispatch_command                    //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql_parse                         //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql_execute_command               //sql_parse.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave_cmd                     //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave                         //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave_threads                 //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">handle_slave_io                     //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">get_master_version_and_clock        //rpl_slave.cc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">main                  //main.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_main           //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_socket_acceptor-&gt;connection_event_loop    //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">Connection_handler_manager::process_new_connection(Channel_info* channel_info)    //connection_handler_manager.cc</span></span>
<span class="line"><span style="color:#24292e;">bool Per_thread_connection_handler::add_connection(Channel_info* channel_info)    //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#24292e;">handle_connection                   //connection_handler_per_thread.cc</span></span>
<span class="line"><span style="color:#24292e;">do_command                          //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">dispatch_command                    //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">mysql_parse                         //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">mysql_execute_command               //sql_parse.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave_cmd                     //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave                         //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave_threads                 //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">handle_slave_io                     //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">get_master_version_and_clock        //rpl_slave.cc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>下面是MySQL从库启动时，如果skip-slave-start为0，从库自动启动复制线程的函数调用关系。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">main                                  //main.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqld_main                     //mysqld.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">init_slave                            //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">start_slave_threads            //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">handle_slave_io                 //rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">get_master_version_and_clock    //rpl_slave.cc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">main                                  //main.cc</span></span>
<span class="line"><span style="color:#24292e;">mysqld_main                     //mysqld.cc</span></span>
<span class="line"><span style="color:#24292e;">init_slave                            //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">start_slave_threads            //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">handle_slave_io                 //rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">get_master_version_and_clock    //rpl_slave.cc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>最终都是通过调用get_master_version_and_clock函数，来判断主、从库server-id是否相同。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// rpl_slave.cc</span></span>
<span class="line"><span style="color:#e1e4e8;">// static int get_master_version_and_clock(MYSQL* mysql, Master_info* mi)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if (!mysql_real_query(mysql, STRING_WITH_LEN(&quot;SELECT @@GLOBAL.SERVER_ID&quot;)) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">      (master_res= mysql_store_result(mysql)) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">      (master_row= mysql_fetch_row(master_res)))</span></span>
<span class="line"><span style="color:#e1e4e8;">  {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ((::server_id == (mi-&gt;master_id= strtoul(master_row[0], 0, 10))) &amp;&amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">        !mi-&gt;rli-&gt;replicate_same_server_id)</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      errmsg= &quot;The slave I/O thread stops because master and slave have equal \\</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL server ids; these ids must be different for replication to work (or \\</span></span>
<span class="line"><span style="color:#e1e4e8;">the --replicate-same-server-id option must be used on slave but this does \\</span></span>
<span class="line"><span style="color:#e1e4e8;">not always make sense; please check the manual before using it).&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      err_code= ER_SLAVE_FATAL_ERROR;</span></span>
<span class="line"><span style="color:#e1e4e8;">      sprintf(err_buff, ER(err_code), errmsg);</span></span>
<span class="line"><span style="color:#e1e4e8;">      goto err;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">// rpl_slave.cc</span></span>
<span class="line"><span style="color:#24292e;">// static int get_master_version_and_clock(MYSQL* mysql, Master_info* mi)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if (!mysql_real_query(mysql, STRING_WITH_LEN(&quot;SELECT @@GLOBAL.SERVER_ID&quot;)) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">      (master_res= mysql_store_result(mysql)) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">      (master_row= mysql_fetch_row(master_res)))</span></span>
<span class="line"><span style="color:#24292e;">  {</span></span>
<span class="line"><span style="color:#24292e;">    if ((::server_id == (mi-&gt;master_id= strtoul(master_row[0], 0, 10))) &amp;&amp;</span></span>
<span class="line"><span style="color:#24292e;">        !mi-&gt;rli-&gt;replicate_same_server_id)</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      errmsg= &quot;The slave I/O thread stops because master and slave have equal \\</span></span>
<span class="line"><span style="color:#24292e;">MySQL server ids; these ids must be different for replication to work (or \\</span></span>
<span class="line"><span style="color:#24292e;">the --replicate-same-server-id option must be used on slave but this does \\</span></span>
<span class="line"><span style="color:#24292e;">not always make sense; please check the manual before using it).&quot;;</span></span>
<span class="line"><span style="color:#24292e;">      err_code= ER_SLAVE_FATAL_ERROR;</span></span>
<span class="line"><span style="color:#24292e;">      sprintf(err_buff, ER(err_code), errmsg);</span></span>
<span class="line"><span style="color:#24292e;">      goto err;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,22),c=[p];function r(o,i,t,_,d,m){return n(),a("div",null,c)}const b=s(l,[["render",r]]);export{y as __pageData,b as default};
