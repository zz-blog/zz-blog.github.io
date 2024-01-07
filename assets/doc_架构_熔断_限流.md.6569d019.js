import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.1b6086f5.js";const l="/assets/image-20220121004619366.32841a29.png",p="/assets/image-20220121160548828.b5bbe27f.png",o="/assets/image-20220121160636832.ec271759.png",c="/assets/image-20220120161041585.b621be37.png",q=JSON.parse('{"title":"分布式限流算法","description":"","frontmatter":{},"headers":[],"relativePath":"doc/架构/熔断/限流.md","filePath":"packages/doc/src/架构/熔断/限流.md","lastUpdated":1704643216000}'),r={name:"doc/架构/熔断/限流.md"},t=e('<h1 id="分布式限流算法" tabindex="-1">分布式限流算法 <a class="header-anchor" href="#分布式限流算法" aria-label="Permalink to &quot;分布式限流算法&quot;">​</a></h1><h2 id="代码层级的限流算法" tabindex="-1">代码层级的限流算法 <a class="header-anchor" href="#代码层级的限流算法" aria-label="Permalink to &quot;代码层级的限流算法&quot;">​</a></h2><h3 id="_1-固定时间窗口算法" tabindex="-1">1.固定时间窗口算法 <a class="header-anchor" href="#_1-固定时间窗口算法" aria-label="Permalink to &quot;1.固定时间窗口算法&quot;">​</a></h3><ul><li>将时间划分为多个窗口</li><li>在每个窗口内每有一次请求就将计数器加一</li><li>如果计数器超过了限制数量，则本窗口内所有的请求都被丢弃当时间到达下一个窗口时，计数器重置</li></ul><p>固定窗口计数器是最简单的限流算法，但是其存在一个最大的<strong>弊端：它有时候会让通过请求量允许为限制的两倍</strong>。假设接口限流为每秒5个，但是不巧的是前一秒的后半秒访问五次，后一秒的前半秒也访问了五次，而这正好组成一个时间窗口，看起来就是在一秒内请求通过了十次。</p><p>假设每1s限流100此请求，用户在中间500ms时开始1s内发起200次请求，此时200次请求时可以全部通过的。这就和我们预期1s限流00次不合了，根源在于限流的细粒度太粗。任意时间点开始计算1s以后，请求总数可能大于100</p><p><img src="'+l+`" alt="image-20220121004619366"></p><p>1.固定时间段限制请求数，利用redis或者其他的存储进行限流</p><p>​ 实现1：key: 接口url+用户ID，value: 访问次数count, 默认0，ttl：过期时间设置为剩余秒数，每次访问都会重置</p><p>​ 1.key不存在肯定可以访问，然后首次设置key,count=1，ttl=剩余时间</p><p>​ 2.key存在的情况下：</p><p>​ 判断count没达到上限，count++</p><p>​ 判断count刚好达到上限，修改ttl=block时间</p><p>​ 判断count是否达到上限，超出上限直接拒绝</p><p>Key:periodlimit:userId</p><p>Val:请求次数累计</p><p>TTL:周期，比如60秒</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">resp := h.limitStore.Eval(context.Background(), periodScript, []string{h.keyPrefix + key}, []string{</span></span>
<span class="line"><span style="color:#e1e4e8;">		strconv.Itoa(h.quota),</span></span>
<span class="line"><span style="color:#e1e4e8;">		strconv.Itoa(h.calcExpireSeconds()),</span></span>
<span class="line"><span style="color:#e1e4e8;">	})</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">0：表示错误，比如可能是redis故障、过载</span></span>
<span class="line"><span style="color:#e1e4e8;">1：允许</span></span>
<span class="line"><span style="color:#e1e4e8;">2：允许但是当前窗口内已到达上限，如果是跑批业务的话此时可以休眠sleep一下等待下个窗口（作者考虑的非常细致）</span></span>
<span class="line"><span style="color:#e1e4e8;">3：拒绝</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--KYES[1]:限流器key</span></span>
<span class="line"><span style="color:#e1e4e8;">--ARGV[1]:qos,单位时间内最多请求次数</span></span>
<span class="line"><span style="color:#e1e4e8;">--ARGV[2]:单位限流窗口时间</span></span>
<span class="line"><span style="color:#e1e4e8;">--请求最大次数,等于p.quota</span></span>
<span class="line"><span style="color:#e1e4e8;">local limit = tonumber(ARGV[1])</span></span>
<span class="line"><span style="color:#e1e4e8;">--窗口即一个单位限流周期,这里用过期模拟窗口效果,等于p.permit</span></span>
<span class="line"><span style="color:#e1e4e8;">local window = tonumber(ARGV[2])</span></span>
<span class="line"><span style="color:#e1e4e8;">--请求次数+1,获取请求总数</span></span>
<span class="line"><span style="color:#e1e4e8;">local current = redis.call(&quot;INCRBY&quot;,KYES[1],1)</span></span>
<span class="line"><span style="color:#e1e4e8;">--如果是第一次请求,则设置过期时间并返回 成功</span></span>
<span class="line"><span style="color:#e1e4e8;">if current == 1 then</span></span>
<span class="line"><span style="color:#e1e4e8;">redis.call(&quot;expire&quot;,KYES[1],window)</span></span>
<span class="line"><span style="color:#e1e4e8;">return 1</span></span>
<span class="line"><span style="color:#e1e4e8;">--如果当前请求数量小于limit则返回 成功</span></span>
<span class="line"><span style="color:#e1e4e8;">elseif current &lt; limit then</span></span>
<span class="line"><span style="color:#e1e4e8;">return 1</span></span>
<span class="line"><span style="color:#e1e4e8;">--如果当前请求数量==limit则返回 最后一次请求</span></span>
<span class="line"><span style="color:#e1e4e8;">elseif current == limit then</span></span>
<span class="line"><span style="color:#e1e4e8;">return 2</span></span>
<span class="line"><span style="color:#e1e4e8;">--请求数量&gt;limit则返回 失败</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">return 0</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">resp := h.limitStore.Eval(context.Background(), periodScript, []string{h.keyPrefix + key}, []string{</span></span>
<span class="line"><span style="color:#24292e;">		strconv.Itoa(h.quota),</span></span>
<span class="line"><span style="color:#24292e;">		strconv.Itoa(h.calcExpireSeconds()),</span></span>
<span class="line"><span style="color:#24292e;">	})</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">0：表示错误，比如可能是redis故障、过载</span></span>
<span class="line"><span style="color:#24292e;">1：允许</span></span>
<span class="line"><span style="color:#24292e;">2：允许但是当前窗口内已到达上限，如果是跑批业务的话此时可以休眠sleep一下等待下个窗口（作者考虑的非常细致）</span></span>
<span class="line"><span style="color:#24292e;">3：拒绝</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--KYES[1]:限流器key</span></span>
<span class="line"><span style="color:#24292e;">--ARGV[1]:qos,单位时间内最多请求次数</span></span>
<span class="line"><span style="color:#24292e;">--ARGV[2]:单位限流窗口时间</span></span>
<span class="line"><span style="color:#24292e;">--请求最大次数,等于p.quota</span></span>
<span class="line"><span style="color:#24292e;">local limit = tonumber(ARGV[1])</span></span>
<span class="line"><span style="color:#24292e;">--窗口即一个单位限流周期,这里用过期模拟窗口效果,等于p.permit</span></span>
<span class="line"><span style="color:#24292e;">local window = tonumber(ARGV[2])</span></span>
<span class="line"><span style="color:#24292e;">--请求次数+1,获取请求总数</span></span>
<span class="line"><span style="color:#24292e;">local current = redis.call(&quot;INCRBY&quot;,KYES[1],1)</span></span>
<span class="line"><span style="color:#24292e;">--如果是第一次请求,则设置过期时间并返回 成功</span></span>
<span class="line"><span style="color:#24292e;">if current == 1 then</span></span>
<span class="line"><span style="color:#24292e;">redis.call(&quot;expire&quot;,KYES[1],window)</span></span>
<span class="line"><span style="color:#24292e;">return 1</span></span>
<span class="line"><span style="color:#24292e;">--如果当前请求数量小于limit则返回 成功</span></span>
<span class="line"><span style="color:#24292e;">elseif current &lt; limit then</span></span>
<span class="line"><span style="color:#24292e;">return 1</span></span>
<span class="line"><span style="color:#24292e;">--如果当前请求数量==limit则返回 最后一次请求</span></span>
<span class="line"><span style="color:#24292e;">elseif current == limit then</span></span>
<span class="line"><span style="color:#24292e;">return 2</span></span>
<span class="line"><span style="color:#24292e;">--请求数量&gt;limit则返回 失败</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">return 0</span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>​ 缺点：1.无法应对突发流量</p><p>​ 2.可能前1秒就有100w请求，之后的59秒的时间只能拒绝请求，不均衡</p><p>​ 3.粒度不够细的情况下, 会出现在同一个窗口时间内出现双倍请求数</p><p>​ 优点：可强行限制数据的传输速率</p><h2 id="_2-滑动时间窗口限流" tabindex="-1">2.滑动时间窗口限流 <a class="header-anchor" href="#_2-滑动时间窗口限流" aria-label="Permalink to &quot;2.滑动时间窗口限流&quot;">​</a></h2><p>滑动窗口计数器算法概念如下：</p><ul><li>将时间划分为多个区间；</li><li>在每个区间内每有一次请求就将计数器加一维持一个时间窗口，占据多个区间；</li><li>每经过一个区间的时间，则抛弃最老的一个区间，并纳入最新的一个区间；</li><li>如果当前窗口内区间的请求计数总和超过了限制数量，则本窗口内所有的请求都被丢弃。</li></ul><p>滑动窗口计数器其实就是细分之后的固定窗口计数器，原先的固定窗口是以一秒算作一个时间窗口，然后这次是将一秒再度进行划分，假设划成四个区间，即0~0.25、0.25~0.5、0.5~0.75、0.75~1，同样是每秒内请求不超过五次，在第一个区间时假设请求就已超过五次，那么直接失败，假设请求为一次，那么在第二个区间 0.25~0.5 ，该区间的请求量不能超过总的限制条件且当前区间的数量加上之前区间的数量也不能超过总的限制条件，当然时间到了 0.75~1 这个区间也是一样的。</p><p>如果过了0.25秒，则抛弃最老的一个区间 0~0.25，并把区间数往后移一位，整个区间则为 0.25~0.5、0.5~0.75、0.75~1、1~1.25，因此时间区间的精度越高，算法所需的空间容量就越大。</p><p><img src="`+p+'" alt="image-20220121160548828"></p><p>​ 实现1：利用zset结构</p><p>​ 1.设置key: url+userID，score为当前时间戳</p><p>​ 2.zremrangeByScore截取zset记录，当前时间戳~当前时间戳-60范围内的记录个数，不超过count就能访问，然后插入记录</p><p>​ 3.超过直接拒绝</p><p>​ 缺点：1.zset会占用大量空间 2.不是原子性操作，不准确</p><p>​ 缺点：1.无法应对突发流量</p><p>​ 2.可能前1秒就有100w请求，之后的59秒的时间只能拒绝请求，不均衡</p><p>​ 3.粒度不够细的情况下, 会出现在同一个窗口时间内出现双倍请求数</p><p>​ 优点：可强行限制数据的传输速率</p><h3 id="_2-漏桶算法" tabindex="-1">2.漏桶算法 <a class="header-anchor" href="#_2-漏桶算法" aria-label="Permalink to &quot;2.漏桶算法&quot;">​</a></h3><p>漏桶算法概念如下：</p><p>将每个请求视作&quot;水滴&quot;放入&quot;漏桶&quot;进行存储； “漏桶&quot;以固定速率向外&quot;漏&quot;出请求来执行如果&quot;漏桶&quot;空了则停止&quot;漏水”； 如果&quot;漏桶&quot;满了则多余的&quot;水滴&quot;会被直接丢弃。 漏桶算法多使用队列实现，服务的请求会存到队列中，服务的提供方则按照固定的速率从队列中取出请求并执行，过多的请求则放在队列中排队或直接拒绝。</p><p>漏桶算法的缺陷也很明显，当短时间内有大量的突发请求时，即便此时服务器没有任何负载，每个请求也都得在队列中等待一段时间才能被响应。</p><p><img src="'+o+'" alt="image-20220121160636832"></p><p>我们可以使用 Redis 4.0 版本中提供的 Redis-Cell 模块，该模块使用的是漏斗算法，并且提供了原子的限流指令，而且依靠 Redis 这个天生的分布式程序就可以实现比较完美的限流了。</p><p>优点：</p><p>漏桶算法，这是用来保护他人，也就是保护他所调用的系统。主要场景是，当调用的第三方系统本身没有保护机制，或者有流量限制的时候，我们的调用速度不能超过他的限制，由于我们不能更改第三方系统，所以只有在主调方控制。这个时候，即使流量突发，也必须舍弃。因为消费能力是第三方决定的。</p><h3 id="_3-令牌桶算法" tabindex="-1">3.令牌桶算法 <a class="header-anchor" href="#_3-令牌桶算法" aria-label="Permalink to &quot;3.令牌桶算法&quot;">​</a></h3><p>对于很多应用场景来说，除了要求能够限制数据的平均传输速率外，还要求允许某种程度的突发传输。这时候漏桶算法可能就不合适了，令牌桶算法更为适合。如图2所示，令牌桶算法的原理是系统会以一个恒定的速度往桶里放入令牌，而如果请求需要被处理，则需要先从桶里获取一个令牌，当桶里没有令牌可取时，则拒绝服务。</p><p><img src="'+c+`" alt="image-20220120161041585"></p><p>优点：令牌桶可以用来保护自己，主要用来对调用者频率进行限流，为的是让自己不被打垮。所以如果自己本身有处理能力的时候，如果流量突发（实际消费能力强于配置的流量限制），那么实际处理速率可以超过配置的限制。</p><p>这2个key配套使用</p><p>Key:tokenlimit:userId</p><p>Val:剩余令牌数量</p><p>TTL:ttl为填满时间的2倍</p><p>Key:timestamp:userId</p><p>Val:上次获取令牌的时间</p><p>TTL:ttl为填满时间的2倍</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">resp := lim.store.Eval(</span></span>
<span class="line"><span style="color:#e1e4e8;">		context.Background(),</span></span>
<span class="line"><span style="color:#e1e4e8;">		script,</span></span>
<span class="line"><span style="color:#e1e4e8;">		[]string{</span></span>
<span class="line"><span style="color:#e1e4e8;">			lim.tokenKey,</span></span>
<span class="line"><span style="color:#e1e4e8;">			lim.timestampKey,</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		[]string{</span></span>
<span class="line"><span style="color:#e1e4e8;">			strconv.Itoa(lim.rate),</span></span>
<span class="line"><span style="color:#e1e4e8;">			strconv.Itoa(lim.burst),</span></span>
<span class="line"><span style="color:#e1e4e8;">			strconv.FormatInt(now.Unix(), 10),</span></span>
<span class="line"><span style="color:#e1e4e8;">			strconv.Itoa(n),</span></span>
<span class="line"><span style="color:#e1e4e8;">		})</span></span>
<span class="line"><span style="color:#e1e4e8;">		</span></span>
<span class="line"><span style="color:#e1e4e8;">--每秒生成token数量即token生成速度</span></span>
<span class="line"><span style="color:#e1e4e8;">local rate = tonumber(ARGV[1])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--桶容量</span></span>
<span class="line"><span style="color:#e1e4e8;">local capacity = tonumber(ARGV[2])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--当前时间戳</span></span>
<span class="line"><span style="color:#e1e4e8;">local now = tonumber(ARGV[3])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--当前请求token数量</span></span>
<span class="line"><span style="color:#e1e4e8;">local requested = tonumber(ARGV[4])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--需要多少秒才能填满桶</span></span>
<span class="line"><span style="color:#e1e4e8;">local fill_time = capacity/rate</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--向下取整,ttl为填满时间的2倍</span></span>
<span class="line"><span style="color:#e1e4e8;">local ttl = math.floor(fill_time*2)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--当前时间桶容量</span></span>
<span class="line"><span style="color:#e1e4e8;">local last_tokens = tonumber(redis.call(&quot;get&quot;, KEYS[1]))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--如果当前桶容量为0,说明是第一次进入,则默认容量为桶的最大容量</span></span>
<span class="line"><span style="color:#e1e4e8;">if last_tokens == nil then</span></span>
<span class="line"><span style="color:#e1e4e8;">last_tokens = capacity</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--上一次刷新的时间</span></span>
<span class="line"><span style="color:#e1e4e8;">local last_refreshed = tonumber(redis.call(&quot;get&quot;, KEYS[2]))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--第一次进入则设置刷新时间为0</span></span>
<span class="line"><span style="color:#e1e4e8;">if last_refreshed == nil then</span></span>
<span class="line"><span style="color:#e1e4e8;">last_refreshed = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--距离上次请求的时间跨度</span></span>
<span class="line"><span style="color:#e1e4e8;">local delta = math.max(0, now-last_refreshed)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--距离上次请求的时间跨度,总共能生产token的数量,如果超多最大容量则丢弃多余的token</span></span>
<span class="line"><span style="color:#e1e4e8;">local filled_tokens = math.min(capacity, last_tokens+(delta*rate))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--本次请求token数量是否足够</span></span>
<span class="line"><span style="color:#e1e4e8;">local allowed = filled_tokens &gt;= requested</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--桶剩余数量</span></span>
<span class="line"><span style="color:#e1e4e8;">local new_tokens = filled_tokens</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--允许本次token申请,计算剩余数量</span></span>
<span class="line"><span style="color:#e1e4e8;">if allowed then</span></span>
<span class="line"><span style="color:#e1e4e8;">new_tokens = filled_tokens - requested</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--设置剩余token数量</span></span>
<span class="line"><span style="color:#e1e4e8;">redis.call(&quot;setex&quot;, KEYS[1], ttl, new_tokens)</span></span>
<span class="line"><span style="color:#e1e4e8;">--设置刷新时间</span></span>
<span class="line"><span style="color:#e1e4e8;">redis.call(&quot;setex&quot;, KEYS[2], ttl, now)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">return allowed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">resp := lim.store.Eval(</span></span>
<span class="line"><span style="color:#24292e;">		context.Background(),</span></span>
<span class="line"><span style="color:#24292e;">		script,</span></span>
<span class="line"><span style="color:#24292e;">		[]string{</span></span>
<span class="line"><span style="color:#24292e;">			lim.tokenKey,</span></span>
<span class="line"><span style="color:#24292e;">			lim.timestampKey,</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		[]string{</span></span>
<span class="line"><span style="color:#24292e;">			strconv.Itoa(lim.rate),</span></span>
<span class="line"><span style="color:#24292e;">			strconv.Itoa(lim.burst),</span></span>
<span class="line"><span style="color:#24292e;">			strconv.FormatInt(now.Unix(), 10),</span></span>
<span class="line"><span style="color:#24292e;">			strconv.Itoa(n),</span></span>
<span class="line"><span style="color:#24292e;">		})</span></span>
<span class="line"><span style="color:#24292e;">		</span></span>
<span class="line"><span style="color:#24292e;">--每秒生成token数量即token生成速度</span></span>
<span class="line"><span style="color:#24292e;">local rate = tonumber(ARGV[1])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--桶容量</span></span>
<span class="line"><span style="color:#24292e;">local capacity = tonumber(ARGV[2])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--当前时间戳</span></span>
<span class="line"><span style="color:#24292e;">local now = tonumber(ARGV[3])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--当前请求token数量</span></span>
<span class="line"><span style="color:#24292e;">local requested = tonumber(ARGV[4])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--需要多少秒才能填满桶</span></span>
<span class="line"><span style="color:#24292e;">local fill_time = capacity/rate</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--向下取整,ttl为填满时间的2倍</span></span>
<span class="line"><span style="color:#24292e;">local ttl = math.floor(fill_time*2)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--当前时间桶容量</span></span>
<span class="line"><span style="color:#24292e;">local last_tokens = tonumber(redis.call(&quot;get&quot;, KEYS[1]))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--如果当前桶容量为0,说明是第一次进入,则默认容量为桶的最大容量</span></span>
<span class="line"><span style="color:#24292e;">if last_tokens == nil then</span></span>
<span class="line"><span style="color:#24292e;">last_tokens = capacity</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--上一次刷新的时间</span></span>
<span class="line"><span style="color:#24292e;">local last_refreshed = tonumber(redis.call(&quot;get&quot;, KEYS[2]))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--第一次进入则设置刷新时间为0</span></span>
<span class="line"><span style="color:#24292e;">if last_refreshed == nil then</span></span>
<span class="line"><span style="color:#24292e;">last_refreshed = 0</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--距离上次请求的时间跨度</span></span>
<span class="line"><span style="color:#24292e;">local delta = math.max(0, now-last_refreshed)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--距离上次请求的时间跨度,总共能生产token的数量,如果超多最大容量则丢弃多余的token</span></span>
<span class="line"><span style="color:#24292e;">local filled_tokens = math.min(capacity, last_tokens+(delta*rate))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--本次请求token数量是否足够</span></span>
<span class="line"><span style="color:#24292e;">local allowed = filled_tokens &gt;= requested</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--桶剩余数量</span></span>
<span class="line"><span style="color:#24292e;">local new_tokens = filled_tokens</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--允许本次token申请,计算剩余数量</span></span>
<span class="line"><span style="color:#24292e;">if allowed then</span></span>
<span class="line"><span style="color:#24292e;">new_tokens = filled_tokens - requested</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--设置剩余token数量</span></span>
<span class="line"><span style="color:#24292e;">redis.call(&quot;setex&quot;, KEYS[1], ttl, new_tokens)</span></span>
<span class="line"><span style="color:#24292e;">--设置刷新时间</span></span>
<span class="line"><span style="color:#24292e;">redis.call(&quot;setex&quot;, KEYS[2], ttl, now)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">return allowed</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><h2 id="nginx限流" tabindex="-1">nginx限流 <a class="header-anchor" href="#nginx限流" aria-label="Permalink to &quot;nginx限流&quot;">​</a></h2><p>连接数限流模块ngx_http_limit_conn_module：用来对某个KEY对应的总的网络连接数进行限流，可以按照如IP、域名维度进行限流</p><p>漏桶算法实现的请求限流模块ngx_http_limit_req_module：用来对某个KEY对应的请求的平均速率进行限流，并有两种用法：平滑模式（delay）和允许突发模式(nodelay)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#burst=4 表示每个 IP 最多允许4个突发请求</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr zone=mylimit:10m rate=2r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">server { </span></span>
<span class="line"><span style="color:#e1e4e8;">    location / { </span></span>
<span class="line"><span style="color:#e1e4e8;">        limit_req zone=mylimit burst=4;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#burst=4 表示每个 IP 最多允许4个突发请求</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr zone=mylimit:10m rate=2r/s;</span></span>
<span class="line"><span style="color:#24292e;">server { </span></span>
<span class="line"><span style="color:#24292e;">    location / { </span></span>
<span class="line"><span style="color:#24292e;">        limit_req zone=mylimit burst=4;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="网关限流" tabindex="-1">网关限流 <a class="header-anchor" href="#网关限流" aria-label="Permalink to &quot;网关限流&quot;">​</a></h2><p>目前我司采用的是网关层限流，即在 <a href="https://so.csdn.net/so/search?q=nginx&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">nginx</a> 层就控制了每ip每秒仅能通过5次，主要是某部分接口调用实在太频繁，因此限制较为严格，且网关层限流太笼统，因此需要应用层也增加限流，日后可以放宽网关层限流频率，另一个问题是在ip的限制下，许多客户往往通过使用不同的ip来绕过该限制...</p>`,63),i=[t];function b(y,u,m,d,_,h){return n(),a("div",null,i)}const g=s(r,[["render",b]]);export{q as __pageData,g as default};
