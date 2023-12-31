import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1b6086f5.js";const d=JSON.parse('{"title":"sync.once","description":null,"frontmatter":{"lang":"zh-CN","title":"sync.once","description":null},"headers":[],"relativePath":"doc/编程语言/Go/基础/sync/once.md","filePath":"packages/doc/src/编程语言/Go/基础/sync/once.md","lastUpdated":1704297641000}'),p={name:"doc/编程语言/Go/基础/sync/once.md"},o=l(`<h1 id="sync-once" tabindex="-1">sync.Once <a class="header-anchor" href="#sync-once" aria-label="Permalink to &quot;sync.Once&quot;">​</a></h1><p>线程安全，函数只会执行一次</p><h2 id="源码分析" tabindex="-1">源码分析 <a class="header-anchor" href="#源码分析" aria-label="Permalink to &quot;源码分析&quot;">​</a></h2><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sync</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">sync/atomic</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 本质上是一个互斥锁</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Once</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	done </span><span style="color:#F97583;">uint32</span></span>
<span class="line"><span style="color:#E1E4E8;">	m    Mutex</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (o </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Once) </span><span style="color:#B392F0;">Do</span><span style="color:#E1E4E8;">(f </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> atomic.</span><span style="color:#79B8FF;">LoadUint32</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">o.done) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 此处可能有多个协程进来</span></span>
<span class="line"><span style="color:#E1E4E8;">		o.</span><span style="color:#79B8FF;">doSlow</span><span style="color:#E1E4E8;">(f)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (o </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Once) </span><span style="color:#B392F0;">doSlow</span><span style="color:#E1E4E8;">(f </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 但是只能有一个加锁成功</span></span>
<span class="line"><span style="color:#E1E4E8;">	o.m.</span><span style="color:#79B8FF;">Lock</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> o.m.</span><span style="color:#79B8FF;">Unlock</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 已经加锁，所以直接读取</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> o.done </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 执行完操作以后，设置标记</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> atomic.</span><span style="color:#79B8FF;">StoreUint32</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">o.done, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">f</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sync</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">sync/atomic</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 本质上是一个互斥锁</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Once</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	done </span><span style="color:#D73A49;">uint32</span></span>
<span class="line"><span style="color:#24292E;">	m    Mutex</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (o </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Once) </span><span style="color:#6F42C1;">Do</span><span style="color:#24292E;">(f </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> atomic.</span><span style="color:#005CC5;">LoadUint32</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">o.done) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 此处可能有多个协程进来</span></span>
<span class="line"><span style="color:#24292E;">		o.</span><span style="color:#005CC5;">doSlow</span><span style="color:#24292E;">(f)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (o </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Once) </span><span style="color:#6F42C1;">doSlow</span><span style="color:#24292E;">(f </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 但是只能有一个加锁成功</span></span>
<span class="line"><span style="color:#24292E;">	o.m.</span><span style="color:#005CC5;">Lock</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> o.m.</span><span style="color:#005CC5;">Unlock</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 已经加锁，所以直接读取</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> o.done </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 执行完操作以后，设置标记</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> atomic.</span><span style="color:#005CC5;">StoreUint32</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">o.done, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">f</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>1.为什么done作为结构体的第一个字段？ ①结构体第一个字段的地址和结构体的地址是一样的，要访问第一个字段直接对结构体指针进行解引用即可。而访问后面的字段就要计算偏移量（前面字段所占字节空间 + 是否进行了内存对齐），就会增加 CPU 指令。</p><p>2.once.Do(f func()) 方法不能嵌套，若 f 在执行过程中也会调用 once.Do，会导致死锁。原因很简单，f 要获得锁才能执行，而外层的 Do 已经获得并等 f 执行完才能释放锁。</p><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 模拟懒汉式-单例模式</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> once sync.Once</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    once.</span><span style="color:#79B8FF;">Do</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 模拟懒汉式-单例模式</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> once sync.Once</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    once.</span><span style="color:#005CC5;">Do</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,9),e=[o];function c(r,t,E,y,i,b){return n(),a("div",null,e)}const m=s(p,[["render",c]]);export{d as __pageData,m as default};
