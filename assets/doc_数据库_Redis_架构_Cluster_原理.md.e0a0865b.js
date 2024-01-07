import{_ as s,o as n,c as e,Q as a}from"./chunks/framework.3daba8ea.js";const y=JSON.parse('{"title":"Redis Cluster 原理","description":"","frontmatter":{},"headers":[],"relativePath":"doc/数据库/Redis/架构/Cluster/原理.md","filePath":"packages/doc/src/数据库/Redis/架构/Cluster/原理.md","lastUpdated":1704107537000}'),l={name:"doc/数据库/Redis/架构/Cluster/原理.md"},p=a(`<h1 id="redis-cluster-原理" tabindex="-1">Redis Cluster 原理 <a class="header-anchor" href="#redis-cluster-原理" aria-label="Permalink to &quot;Redis Cluster 原理&quot;">​</a></h1><p>在数据库领域，当数据量大到一定程度后，我们总是绕不开分布式这个话题。这个问题牵扯很多方面，</p><ul><li><strong>分片策略（Sharding）</strong>：分库分表？水平切片？垂直切片？</li><li><strong>数据备份</strong>：数据备份什么时候做？粒度是什么？怎样备份？</li><li><strong>数据迁移</strong>：当数据分布发生拓扑变化的时候，怎么把数据从原来的节点迁移到新的节点上？</li><li><strong>集群管理</strong>：如何管理整个集群，如何把用户请求定向到某个特定的节点上？</li></ul><p>这些问题很很多不同的解法，在不同的使用场景，不同的数据库设计结构下有不同的选择。大体上讲，因为相对简单，NoSQL在这个方面的解决方案较传统SQL数据库使用更广泛。我们不妨来看看开源社区中使用最普遍的分布式解决方案之一：*<strong>Redis Cluster*</strong>，看看它是如何解决分布式的问题。</p><h2 id="redis-cluster集群" tabindex="-1">Redis Cluster集群 <a class="header-anchor" href="#redis-cluster集群" aria-label="Permalink to &quot;Redis Cluster集群&quot;">​</a></h2><p>Redis Cluster是一个Redis的分布式部署形式，使用数据分片的办法把数据分配到不同的节点；每个节点可以有自己的备份节点（一个或多个）。整个集群之上另有一个叫做Redis Sentinel的分布式组件用以提供更丰富的HA能力。</p><p>下面我们就前一个章节提到的问题来看看Redis Cluster的解决方案。</p><h3 id="数据分片" tabindex="-1">数据分片 <a class="header-anchor" href="#数据分片" aria-label="Permalink to &quot;数据分片&quot;">​</a></h3><p>Redis Cluster使用 *<strong>Slot*</strong> 的概念：作为一个KV系统，它把每个<code>key</code>的值<code>hash</code>成<code>0 ~ 16383</code>之间的一个数。这个<code>hash</code>值被用来确定对应的数据存储在哪个节点中。集群中的每个节点都存储了一份类似路由表的东西，描述每个节点所拥有的 <code>Slots</code>；当用户请求一个不在本机的key的时候，它可以根据这个路由表找到正确的服务节点，然后回复给用户一个<code>moved</code>，告知用户正确的服务节点。</p><ul><li><code>slot = CRC16(key) % 16383</code>；</li><li>是集群内数据管理和迁移的最小单位，保证数据管理的粒度易于管理；</li><li>每个节点都知道<code>slot</code>在集群中的分布，并能把对应信息回复给无法服务的请求。</li><li>节点之间保持<code>Gossip</code>通信</li></ul><p>下面图例就是一个简单的、最小的3节点Redis Cluster数据分配例子。</p><p><img src="http://mysql.taobao.org/monthly/pic/202004/2020-04-27-shu-redis-cluster-simple.png" alt="Figure-1: Redis Cluster Example"></p><h3 id="数据备份" tabindex="-1">数据备份 <a class="header-anchor" href="#数据备份" aria-label="Permalink to &quot;数据备份&quot;">​</a></h3><p>Redis的备份是最简单的<code>Master-Slave</code>备份。每个主节点都可以有若干个从节点跟随；从节点（<code>Replica</code>）可以提供高可靠性（<code>HA</code>)，也可以用作只读节点提供高吞吐量。</p><p>通过加入针对每个节点的复制备份能力，Redis Cluster在单个数据粒度上提供了高可用性。整个部署架构从前一张图中的简单分布式Sharding结构演变为下图中所示的结构。</p><p><img src="http://mysql.taobao.org/monthly/pic/202004/2020-04-27-shu-redis-cluster-replication.png" alt="Figure-2: Redis Cluster with Replication"></p><p>数据备份架构中，主节点把自己的状态通过<code>AOF</code>异步（缺省方式）传送给从节点。多个从节点可以使用级联的方式传输数据，而不用全部都从主节点获得，以此减轻对主节点的性能压力。从节点不光可以用来备份数据保证高可用，也可以担任只读节点的任务，提供压力分流。</p><h3 id="数据迁移" tabindex="-1">数据迁移 <a class="header-anchor" href="#数据迁移" aria-label="Permalink to &quot;数据迁移&quot;">​</a></h3><p>Redis Cluster中的数据迁移又称作<code>Reshard</code>，一般是因为有节点的变化或者是做<code>load balancing</code>。简单的讲，Reshard就是把一些<code>slots</code>从一个节点转移到另一个节点。</p><p><code>Reshard</code>的原理并不复杂：</p><ol><li>外部工具向某分片发出<code>migrate</code>命令，触发一个或者多个（3.2开始支持）key的迁移。</li><li>接收到<code>migrate</code>命令的分片，即迁出分片，将对应的key进行序列化后发往迁入分片，并阻塞等待迁入分片的返回。</li><li>迁入分片通过<code>restore-asking</code>命令将收到的key进行应用，并返回成功给迁出分片。</li><li>迁出分片收到应答后，删除对应的key，并将<code>migrate</code>命令转化为<code>del</code>命令并同步给同步和记录到AOF中供replicas消费，完成迁移。</li></ol><p><img src="http://mysql.taobao.org/monthly/pic/202004/2020-04-27-shu-redis-cluster-reshard.png" alt="Figure-3: Redis Cluster with Replication"></p><p>上面图例就是一个Reshard的流程示意，我们用一个<code>string b</code>来指代若干个<code>slots</code>；图中的数字代表步骤的顺序。</p><h3 id="集群管理" tabindex="-1">集群管理 <a class="header-anchor" href="#集群管理" aria-label="Permalink to &quot;集群管理&quot;">​</a></h3><p>Redis Cluster集群管理引入了一个新的组件，叫做Redis Sentinel，在整个集群的纬度上提供高可用的能力。简单的讲，它类似一个集群的Registry，包含监控、报警、自动切换、配置管理等常见功能。另外，Sentinel本身也是分布式部署，采用多数派算法维持状态的一致性。</p><ul><li>Sentinels监视所有的数据节点</li><li>Sentinels监视所有其他Sentinels</li><li>当Sentinels对节点宕机达成共识之后，选举出一个新的master（升级）并完成各种配置方面的联动</li></ul><p>以我们在上面《数据备份》小节中的系统架构为基础，加上Sentinel，以及高可用的代理节点（HAProxy），就是一个典型的Redis Cluster部署形态。</p><p><img src="http://mysql.taobao.org/monthly/pic/202004/2020-04-27-shu-redis-cluster-full.png" alt="Figure-4: Redis Cluster Typical Deployment"></p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>*<strong>Less is more*</strong> 这个概念重要且真实。Redis Cluster的分布式设计非常简单，也正因为如此非常容易维护。它的每个组件都很简单，功能不多；可以很简单的实现分布式设计。整个系统设计方面，它省略了很多一致性方面的考虑，用以换取高性能和健壮性。</p><h2 id="如何支持外网访问" tabindex="-1">如何支持外网访问 <a class="header-anchor" href="#如何支持外网访问" aria-label="Permalink to &quot;如何支持外网访问&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">从Redis 4.0[4]开始,加入的对NAT和Docker的支持。</span></span>
<span class="line"><span style="color:#e1e4e8;">在redis.conf文件中，通过配置 cluster-announce-ip、cluster-announce-port和 cluster-announce-bus-port这三个属性来公布可以外部访问的IP(例如主机IP或公网IP)和端口。</span></span>
<span class="line"><span style="color:#e1e4e8;">这种方式类似于kafka中的 advertised.listeners。</span></span>
<span class="line"><span style="color:#e1e4e8;">这样子，redis返回给客户端的IP地址就是 cluster-announce-ip ，而不再是自动探测到的容器内部IP。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">########################## CLUSTER DOCKER/NAT support  ########################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># In certain deployments, Redis Cluster nodes address discovery fails, because</span></span>
<span class="line"><span style="color:#e1e4e8;"># addresses are NAT-ted or because ports are forwarded (the typical case is</span></span>
<span class="line"><span style="color:#e1e4e8;"># Docker and other containers).</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># In order to make Redis Cluster working in such environments, a static</span></span>
<span class="line"><span style="color:#e1e4e8;"># configuration where each node knows its public address is needed. The</span></span>
<span class="line"><span style="color:#e1e4e8;"># following four options are used for this scope, and are:</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># * cluster-announce-ip</span></span>
<span class="line"><span style="color:#e1e4e8;"># * cluster-announce-port</span></span>
<span class="line"><span style="color:#e1e4e8;"># * cluster-announce-tls-port</span></span>
<span class="line"><span style="color:#e1e4e8;"># * cluster-announce-bus-port</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># Each instructs the node about its address, client ports (for connections</span></span>
<span class="line"><span style="color:#e1e4e8;"># without and with TLS) and cluster message bus port. The information is then</span></span>
<span class="line"><span style="color:#e1e4e8;"># published in the header of the bus packets so that other nodes will be able to</span></span>
<span class="line"><span style="color:#e1e4e8;"># correctly map the address of the node publishing the information.</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># If cluster-tls is set to yes and cluster-announce-tls-port is omitted or set</span></span>
<span class="line"><span style="color:#e1e4e8;"># to zero, then cluster-announce-port refers to the TLS port. Note also that</span></span>
<span class="line"><span style="color:#e1e4e8;"># cluster-announce-tls-port has no effect if cluster-tls is set to no.</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># If the above options are not used, the normal Redis Cluster auto-detection</span></span>
<span class="line"><span style="color:#e1e4e8;"># will be used instead.</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># Note that when remapped, the bus port may not be at the fixed offset of</span></span>
<span class="line"><span style="color:#e1e4e8;"># clients port + 10000, so you can specify any port and bus-port depending</span></span>
<span class="line"><span style="color:#e1e4e8;"># on how they get remapped. If the bus-port is not set, a fixed offset of</span></span>
<span class="line"><span style="color:#e1e4e8;"># 10000 will be used as usual.</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># Example:</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># cluster-announce-ip 10.1.1.5</span></span>
<span class="line"><span style="color:#e1e4e8;"># cluster-announce-tls-port 6379</span></span>
<span class="line"><span style="color:#e1e4e8;"># cluster-announce-port 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># cluster-announce-bus-port 6380</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">REDIS_CLUSTER_ANNOUNCE_IP不能使用 127.0.0.1和 localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">REDIS_CLUSTER_DYNAMIC_IPS必须设置为 no[5],否则 REDIS_CLUSTER_ANNOUNCE_IP不会生效</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">从Redis 4.0[4]开始,加入的对NAT和Docker的支持。</span></span>
<span class="line"><span style="color:#24292e;">在redis.conf文件中，通过配置 cluster-announce-ip、cluster-announce-port和 cluster-announce-bus-port这三个属性来公布可以外部访问的IP(例如主机IP或公网IP)和端口。</span></span>
<span class="line"><span style="color:#24292e;">这种方式类似于kafka中的 advertised.listeners。</span></span>
<span class="line"><span style="color:#24292e;">这样子，redis返回给客户端的IP地址就是 cluster-announce-ip ，而不再是自动探测到的容器内部IP。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">########################## CLUSTER DOCKER/NAT support  ########################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># In certain deployments, Redis Cluster nodes address discovery fails, because</span></span>
<span class="line"><span style="color:#24292e;"># addresses are NAT-ted or because ports are forwarded (the typical case is</span></span>
<span class="line"><span style="color:#24292e;"># Docker and other containers).</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># In order to make Redis Cluster working in such environments, a static</span></span>
<span class="line"><span style="color:#24292e;"># configuration where each node knows its public address is needed. The</span></span>
<span class="line"><span style="color:#24292e;"># following four options are used for this scope, and are:</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># * cluster-announce-ip</span></span>
<span class="line"><span style="color:#24292e;"># * cluster-announce-port</span></span>
<span class="line"><span style="color:#24292e;"># * cluster-announce-tls-port</span></span>
<span class="line"><span style="color:#24292e;"># * cluster-announce-bus-port</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># Each instructs the node about its address, client ports (for connections</span></span>
<span class="line"><span style="color:#24292e;"># without and with TLS) and cluster message bus port. The information is then</span></span>
<span class="line"><span style="color:#24292e;"># published in the header of the bus packets so that other nodes will be able to</span></span>
<span class="line"><span style="color:#24292e;"># correctly map the address of the node publishing the information.</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># If cluster-tls is set to yes and cluster-announce-tls-port is omitted or set</span></span>
<span class="line"><span style="color:#24292e;"># to zero, then cluster-announce-port refers to the TLS port. Note also that</span></span>
<span class="line"><span style="color:#24292e;"># cluster-announce-tls-port has no effect if cluster-tls is set to no.</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># If the above options are not used, the normal Redis Cluster auto-detection</span></span>
<span class="line"><span style="color:#24292e;"># will be used instead.</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># Note that when remapped, the bus port may not be at the fixed offset of</span></span>
<span class="line"><span style="color:#24292e;"># clients port + 10000, so you can specify any port and bus-port depending</span></span>
<span class="line"><span style="color:#24292e;"># on how they get remapped. If the bus-port is not set, a fixed offset of</span></span>
<span class="line"><span style="color:#24292e;"># 10000 will be used as usual.</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># Example:</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># cluster-announce-ip 10.1.1.5</span></span>
<span class="line"><span style="color:#24292e;"># cluster-announce-tls-port 6379</span></span>
<span class="line"><span style="color:#24292e;"># cluster-announce-port 0</span></span>
<span class="line"><span style="color:#24292e;"># cluster-announce-bus-port 6380</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">REDIS_CLUSTER_ANNOUNCE_IP不能使用 127.0.0.1和 localhost</span></span>
<span class="line"><span style="color:#24292e;">REDIS_CLUSTER_DYNAMIC_IPS必须设置为 no[5],否则 REDIS_CLUSTER_ANNOUNCE_IP不会生效</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div>`,32),o=[p];function t(r,c,i,d,u,b){return n(),e("div",null,o)}const m=s(l,[["render",t]]);export{y as __pageData,m as default};
