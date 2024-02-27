import{_ as s,c as n,o as a,U as e}from"./chunks/framework.9QHaLlVJ.js";const m=JSON.parse('{"title":"REDIS知识点总结","description":null,"frontmatter":{"lang":"zh-CN","title":"REDIS知识点总结","description":null},"headers":[],"relativePath":"doc/数据库/Redis/index.md","filePath":"packages/doc/src/数据库/Redis/index.md","lastUpdated":1702458087000}'),p={name:"doc/数据库/Redis/index.md"},l=e(`<h1 id="redis知识点总结" tabindex="-1">Redis知识点总结 <a class="header-anchor" href="#redis知识点总结" aria-label="Permalink to &quot;Redis知识点总结&quot;">​</a></h1><ul><li><a href="https://redis.io/" target="_blank" rel="noreferrer">官网</a></li><li><a href="https://redis.io/documentation" target="_blank" rel="noreferrer">文档地址</a></li><li><a href="https://developer.redis.com/" target="_blank" rel="noreferrer">https://developer.redis.com/</a></li><li><a href="https://blog.csdn.net/androidlushangderen/category_9263229.html" target="_blank" rel="noreferrer">https://blog.csdn.net/androidlushangderen/category_9263229.html</a></li></ul><h1 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1.数据类型</span></span>
<span class="line"><span>string,list,hash,set,sorted set,pipeline,bitmap,hyperloglog,geo,stream</span></span>
<span class="line"><span>2.lua脚本保持原子性</span></span>
<span class="line"><span>3.编码方式</span></span>
<span class="line"><span>raw,int,embstr,zipmap,linkedlist,ziplist,intset,quicklist,skiplist</span></span>
<span class="line"><span>4.为什么定义动态字符串</span></span>
<span class="line"><span>redis 为什么要自己写一个SDS的数据类型，主要是为了解决C语言 char[] 的四个问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>字符数组必须先给目标变量分配足够的空间，否则可能会溢出</span></span>
<span class="line"><span>查询字符数组长度 时间复杂度O(n)</span></span>
<span class="line"><span>长度变化，需要重新分配内存</span></span>
<span class="line"><span>通过从字符串开始到结尾碰到的第一个\\0来标记字符串的结束，因此不能保存图片、音频、视频、压缩文件等二进制(bytes)保存的内容，二进制不安全</span></span>
<span class="line"><span>redis SDS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不用担心内存溢出问题，如果需要会对 SDS 进行扩容</span></span>
<span class="line"><span>因为定义了 len 属性，查询数组长度时间复杂度O(1) 固定长度</span></span>
<span class="line"><span>空间预分配，惰性空间释放</span></span>
<span class="line"><span>根据长度 len来判断是结束，而不是 \\0</span></span>
<span class="line"><span>5.geo</span></span>
<span class="line"><span>Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，该功能在 Redis 3.2 版本新增。</span></span>
<span class="line"><span>Redis GEO 操作方法有：</span></span>
<span class="line"><span>geoadd：添加地理位置的坐标。</span></span>
<span class="line"><span>geopos：获取地理位置的坐标。</span></span>
<span class="line"><span>geodist：计算两个位置之间的距离。</span></span>
<span class="line"><span>georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。</span></span>
<span class="line"><span>georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。</span></span>
<span class="line"><span>geohash：返回一个或多个位置对象的 geohash 值。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h1 id="持久化" tabindex="-1">持久化 <a class="header-anchor" href="#持久化" aria-label="Permalink to &quot;持久化&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>RDB</span></span>
<span class="line"><span>AOF</span></span>
<span class="line"><span>混合模式</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h1 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="缓存淘汰策略" tabindex="-1">缓存淘汰策略 <a class="header-anchor" href="#缓存淘汰策略" aria-label="Permalink to &quot;缓存淘汰策略&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>被动删除：当读/写一个已经过期的key时，会触发惰性删除策略，直接删除掉这个过期key</span></span>
<span class="line"><span>主动删除：由于惰性删除策略无法保证冷数据被及时删掉，所以Redis会定期主动淘汰一批已过期的key</span></span>
<span class="line"><span>当前已用内存超过maxmemory限定时，触发主动清理策略。</span></span>
<span class="line"><span>volatile-lru：会使用 LRU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span>volatile-lfu：会使用 LFU 算法筛选设置了过期时间的键值对删除。</span></span>
<span class="line"><span>LRU 算法（Least Recently Used，最近最少使用）</span></span>
<span class="line"><span>手写LRU缓存：https://blog.csdn.net/nianqrzhanghw/article/details/116838461?spm=1001.2014.3001.5502</span></span>
<span class="line"><span>淘汰很久没被访问过的数据，以最近一次访问时间作为参考。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LFU 算法（Least Frequently Used，最不经常使用）</span></span>
<span class="line"><span>淘汰最近一段时间被访问次数最少的数据，以次数作为参考。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h1 id="架构" tabindex="-1">架构 <a class="header-anchor" href="#架构" aria-label="Permalink to &quot;架构&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>哨兵模式</span></span>
<span class="line"><span>主从复制</span></span>
<span class="line"><span>Redis cluster</span></span>
<span class="line"><span>限流算法</span></span>
<span class="line"><span>缓存雪崩</span></span>
<span class="line"><span>缓存失效</span></span>
<span class="line"><span>缓存穿透</span></span>
<span class="line"><span>热点key失效</span></span>
<span class="line"><span>双写不一致</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h1><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1.redis是单线程还是多线程？</span></span>
<span class="line"><span>2.scan遍历重复键的问题</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,14),i=[l];function r(t,c,b,d,o,u){return a(),n("div",null,i)}const g=s(p,[["render",r]]);export{m as __pageData,g as default};
