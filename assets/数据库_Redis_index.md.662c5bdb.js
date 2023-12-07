import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.6d94f49f.js";const h=JSON.parse('{"title":"REDIS知识点总结","description":null,"frontmatter":{"lang":"zh-CN","title":"REDIS知识点总结","description":null},"headers":[],"relativePath":"数据库/Redis/index.md","filePath":"数据库/Redis/index.md","lastUpdated":1700319152000}'),l={name:"数据库/Redis/index.md"},p=e(`<h1 id="redis知识点总结" tabindex="-1">Redis知识点总结 <a class="header-anchor" href="#redis知识点总结" aria-label="Permalink to &quot;Redis知识点总结&quot;">​</a></h1><ul><li><a href="https://redis.io/" target="_blank" rel="noreferrer">官网</a></li><li><a href="https://redis.io/documentation" target="_blank" rel="noreferrer">文档地址</a></li><li><a href="https://developer.redis.com/" target="_blank" rel="noreferrer">https://developer.redis.com/</a></li><li><a href="https://blog.csdn.net/androidlushangderen/category_9263229.html" target="_blank" rel="noreferrer">https://blog.csdn.net/androidlushangderen/category_9263229.html</a></li></ul><h1 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.数据类型</span></span>
<span class="line"><span style="color:#e1e4e8;">string,list,hash,set,sorted set,pipeline,bitmap,hyperloglog,geo,stream</span></span>
<span class="line"><span style="color:#e1e4e8;">2.lua脚本保持原子性</span></span>
<span class="line"><span style="color:#e1e4e8;">3.编码方式</span></span>
<span class="line"><span style="color:#e1e4e8;">raw,int,embstr,zipmap,linkedlist,ziplist,intset,quicklist,skiplist</span></span>
<span class="line"><span style="color:#e1e4e8;">4.为什么定义动态字符串</span></span>
<span class="line"><span style="color:#e1e4e8;">redis 为什么要自己写一个SDS的数据类型，主要是为了解决C语言 char[] 的四个问题</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">字符数组必须先给目标变量分配足够的空间，否则可能会溢出</span></span>
<span class="line"><span style="color:#e1e4e8;">查询字符数组长度 时间复杂度O(n)</span></span>
<span class="line"><span style="color:#e1e4e8;">长度变化，需要重新分配内存</span></span>
<span class="line"><span style="color:#e1e4e8;">通过从字符串开始到结尾碰到的第一个\\0来标记字符串的结束，因此不能保存图片、音频、视频、压缩文件等二进制(bytes)保存的内容，二进制不安全</span></span>
<span class="line"><span style="color:#e1e4e8;">redis SDS</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">不用担心内存溢出问题，如果需要会对 SDS 进行扩容</span></span>
<span class="line"><span style="color:#e1e4e8;">因为定义了 len 属性，查询数组长度时间复杂度O(1) 固定长度</span></span>
<span class="line"><span style="color:#e1e4e8;">空间预分配，惰性空间释放</span></span>
<span class="line"><span style="color:#e1e4e8;">根据长度 len来判断是结束，而不是 \\0</span></span>
<span class="line"><span style="color:#e1e4e8;">5.geo</span></span>
<span class="line"><span style="color:#e1e4e8;">Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，该功能在 Redis 3.2 版本新增。</span></span>
<span class="line"><span style="color:#e1e4e8;">Redis GEO 操作方法有：</span></span>
<span class="line"><span style="color:#e1e4e8;">geoadd：添加地理位置的坐标。</span></span>
<span class="line"><span style="color:#e1e4e8;">geopos：获取地理位置的坐标。</span></span>
<span class="line"><span style="color:#e1e4e8;">geodist：计算两个位置之间的距离。</span></span>
<span class="line"><span style="color:#e1e4e8;">georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。</span></span>
<span class="line"><span style="color:#e1e4e8;">georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。</span></span>
<span class="line"><span style="color:#e1e4e8;">geohash：返回一个或多个位置对象的 geohash 值。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.数据类型</span></span>
<span class="line"><span style="color:#24292e;">string,list,hash,set,sorted set,pipeline,bitmap,hyperloglog,geo,stream</span></span>
<span class="line"><span style="color:#24292e;">2.lua脚本保持原子性</span></span>
<span class="line"><span style="color:#24292e;">3.编码方式</span></span>
<span class="line"><span style="color:#24292e;">raw,int,embstr,zipmap,linkedlist,ziplist,intset,quicklist,skiplist</span></span>
<span class="line"><span style="color:#24292e;">4.为什么定义动态字符串</span></span>
<span class="line"><span style="color:#24292e;">redis 为什么要自己写一个SDS的数据类型，主要是为了解决C语言 char[] 的四个问题</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">字符数组必须先给目标变量分配足够的空间，否则可能会溢出</span></span>
<span class="line"><span style="color:#24292e;">查询字符数组长度 时间复杂度O(n)</span></span>
<span class="line"><span style="color:#24292e;">长度变化，需要重新分配内存</span></span>
<span class="line"><span style="color:#24292e;">通过从字符串开始到结尾碰到的第一个\\0来标记字符串的结束，因此不能保存图片、音频、视频、压缩文件等二进制(bytes)保存的内容，二进制不安全</span></span>
<span class="line"><span style="color:#24292e;">redis SDS</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">不用担心内存溢出问题，如果需要会对 SDS 进行扩容</span></span>
<span class="line"><span style="color:#24292e;">因为定义了 len 属性，查询数组长度时间复杂度O(1) 固定长度</span></span>
<span class="line"><span style="color:#24292e;">空间预分配，惰性空间释放</span></span>
<span class="line"><span style="color:#24292e;">根据长度 len来判断是结束，而不是 \\0</span></span>
<span class="line"><span style="color:#24292e;">5.geo</span></span>
<span class="line"><span style="color:#24292e;">Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，该功能在 Redis 3.2 版本新增。</span></span>
<span class="line"><span style="color:#24292e;">Redis GEO 操作方法有：</span></span>
<span class="line"><span style="color:#24292e;">geoadd：添加地理位置的坐标。</span></span>
<span class="line"><span style="color:#24292e;">geopos：获取地理位置的坐标。</span></span>
<span class="line"><span style="color:#24292e;">geodist：计算两个位置之间的距离。</span></span>
<span class="line"><span style="color:#24292e;">georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。</span></span>
<span class="line"><span style="color:#24292e;">georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。</span></span>
<span class="line"><span style="color:#24292e;">geohash：返回一个或多个位置对象的 geohash 值。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h1 id="持久化" tabindex="-1">持久化 <a class="header-anchor" href="#持久化" aria-label="Permalink to &quot;持久化&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">RDB</span></span>
<span class="line"><span style="color:#e1e4e8;">AOF</span></span>
<span class="line"><span style="color:#e1e4e8;">混合模式</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">RDB</span></span>
<span class="line"><span style="color:#24292e;">AOF</span></span>
<span class="line"><span style="color:#24292e;">混合模式</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h1 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="缓存淘汰策略" tabindex="-1">缓存淘汰策略 <a class="header-anchor" href="#缓存淘汰策略" aria-label="Permalink to &quot;缓存淘汰策略&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">被动删除：当读/写一个已经过期的key时，会触发惰性删除策略，直接删除掉这个过期key</span></span>
<span class="line"><span style="color:#e1e4e8;">主动删除：由于惰性删除策略无法保证冷数据被及时删掉，所以Redis会定期主动淘汰一批已过期的key</span></span>
<span class="line"><span style="color:#e1e4e8;">当前已用内存超过maxmemory限定时，触发主动清理策略。</span></span>
<span class="line"><span style="color:#e1e4e8;">volatile-lru：会使用 LRU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span style="color:#e1e4e8;">volatile-lfu：会使用 LFU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span style="color:#e1e4e8;">LRU 算法（Least Recently Used，最近最少使用）</span></span>
<span class="line"><span style="color:#e1e4e8;">手写LRU缓存：https://blog.csdn.net/nianqrzhanghw/article/details/116838461?spm=1001.2014.3001.5502</span></span>
<span class="line"><span style="color:#e1e4e8;">淘汰很久没被访问过的数据，以最近一次访问时间作为参考。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">LFU 算法（Least Frequently Used，最不经常使用）</span></span>
<span class="line"><span style="color:#e1e4e8;">淘汰最近一段时间被访问次数最少的数据，以次数作为参考。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">被动删除：当读/写一个已经过期的key时，会触发惰性删除策略，直接删除掉这个过期key</span></span>
<span class="line"><span style="color:#24292e;">主动删除：由于惰性删除策略无法保证冷数据被及时删掉，所以Redis会定期主动淘汰一批已过期的key</span></span>
<span class="line"><span style="color:#24292e;">当前已用内存超过maxmemory限定时，触发主动清理策略。</span></span>
<span class="line"><span style="color:#24292e;">volatile-lru：会使用 LRU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span style="color:#24292e;">volatile-lfu：会使用 LFU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span style="color:#24292e;">LRU 算法（Least Recently Used，最近最少使用）</span></span>
<span class="line"><span style="color:#24292e;">手写LRU缓存：https://blog.csdn.net/nianqrzhanghw/article/details/116838461?spm=1001.2014.3001.5502</span></span>
<span class="line"><span style="color:#24292e;">淘汰很久没被访问过的数据，以最近一次访问时间作为参考。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">LFU 算法（Least Frequently Used，最不经常使用）</span></span>
<span class="line"><span style="color:#24292e;">淘汰最近一段时间被访问次数最少的数据，以次数作为参考。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h1 id="架构" tabindex="-1">架构 <a class="header-anchor" href="#架构" aria-label="Permalink to &quot;架构&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">哨兵模式</span></span>
<span class="line"><span style="color:#e1e4e8;">主从复制</span></span>
<span class="line"><span style="color:#e1e4e8;">Redis cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">限流算法</span></span>
<span class="line"><span style="color:#e1e4e8;">缓存雪崩</span></span>
<span class="line"><span style="color:#e1e4e8;">缓存失效</span></span>
<span class="line"><span style="color:#e1e4e8;">缓存穿透</span></span>
<span class="line"><span style="color:#e1e4e8;">热点key失效</span></span>
<span class="line"><span style="color:#e1e4e8;">双写不一致</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">哨兵模式</span></span>
<span class="line"><span style="color:#24292e;">主从复制</span></span>
<span class="line"><span style="color:#24292e;">Redis cluster</span></span>
<span class="line"><span style="color:#24292e;">限流算法</span></span>
<span class="line"><span style="color:#24292e;">缓存雪崩</span></span>
<span class="line"><span style="color:#24292e;">缓存失效</span></span>
<span class="line"><span style="color:#24292e;">缓存穿透</span></span>
<span class="line"><span style="color:#24292e;">热点key失效</span></span>
<span class="line"><span style="color:#24292e;">双写不一致</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.redis是单线程还是多线程？</span></span>
<span class="line"><span style="color:#e1e4e8;">2.scan遍历重复键的问题</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.redis是单线程还是多线程？</span></span>
<span class="line"><span style="color:#24292e;">2.scan遍历重复键的问题</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,14),r=[p];function i(c,o,t,d,b,u){return n(),a("div",null,r)}const m=s(l,[["render",i]]);export{h as __pageData,m as default};
