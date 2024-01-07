import{_ as s,o as n,c as e,Q as a}from"./chunks/framework.1b6086f5.js";const y=JSON.parse('{"title":"channel","description":null,"frontmatter":{"lang":"zh-CN","title":"channel","description":null},"headers":[],"relativePath":"doc/编程语言/Go/基础/channel/channel.md","filePath":"packages/doc/src/编程语言/Go/基础/channel/channel.md","lastUpdated":1704297641000}'),l={name:"doc/编程语言/Go/基础/channel/channel.md"},p=a(`<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type hchan struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">	qcount   uint           // total data in the queue</span></span>
<span class="line"><span style="color:#e1e4e8;">	dataqsiz uint           // size of the circular queue</span></span>
<span class="line"><span style="color:#e1e4e8;">	buf      unsafe.Pointer // points to an array of dataqsiz elements</span></span>
<span class="line"><span style="color:#e1e4e8;">	elemsize uint16</span></span>
<span class="line"><span style="color:#e1e4e8;">	closed   uint32</span></span>
<span class="line"><span style="color:#e1e4e8;">	elemtype *_type // element type</span></span>
<span class="line"><span style="color:#e1e4e8;">	sendx    uint   // send index</span></span>
<span class="line"><span style="color:#e1e4e8;">	recvx    uint   // receive index</span></span>
<span class="line"><span style="color:#e1e4e8;">	recvq    waitq  // list of recv waiters</span></span>
<span class="line"><span style="color:#e1e4e8;">	sendq    waitq  // list of send waiters</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	// lock protects all fields in hchan, as well as several</span></span>
<span class="line"><span style="color:#e1e4e8;">	// fields in sudogs blocked on this channel.</span></span>
<span class="line"><span style="color:#e1e4e8;">	//</span></span>
<span class="line"><span style="color:#e1e4e8;">	// Do not change another G&#39;s status while holding this lock</span></span>
<span class="line"><span style="color:#e1e4e8;">	// (in particular, do not ready a G), as this can deadlock</span></span>
<span class="line"><span style="color:#e1e4e8;">	// with stack shrinking.</span></span>
<span class="line"><span style="color:#e1e4e8;">	lock mutex</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type hchan struct {</span></span>
<span class="line"><span style="color:#24292e;">	qcount   uint           // total data in the queue</span></span>
<span class="line"><span style="color:#24292e;">	dataqsiz uint           // size of the circular queue</span></span>
<span class="line"><span style="color:#24292e;">	buf      unsafe.Pointer // points to an array of dataqsiz elements</span></span>
<span class="line"><span style="color:#24292e;">	elemsize uint16</span></span>
<span class="line"><span style="color:#24292e;">	closed   uint32</span></span>
<span class="line"><span style="color:#24292e;">	elemtype *_type // element type</span></span>
<span class="line"><span style="color:#24292e;">	sendx    uint   // send index</span></span>
<span class="line"><span style="color:#24292e;">	recvx    uint   // receive index</span></span>
<span class="line"><span style="color:#24292e;">	recvq    waitq  // list of recv waiters</span></span>
<span class="line"><span style="color:#24292e;">	sendq    waitq  // list of send waiters</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	// lock protects all fields in hchan, as well as several</span></span>
<span class="line"><span style="color:#24292e;">	// fields in sudogs blocked on this channel.</span></span>
<span class="line"><span style="color:#24292e;">	//</span></span>
<span class="line"><span style="color:#24292e;">	// Do not change another G&#39;s status while holding this lock</span></span>
<span class="line"><span style="color:#24292e;">	// (in particular, do not ready a G), as this can deadlock</span></span>
<span class="line"><span style="color:#24292e;">	// with stack shrinking.</span></span>
<span class="line"><span style="color:#24292e;">	lock mutex</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>ch := make(chan int, 5) ch分配在栈上，底层指向堆上的hchan结果</p><pre><code>1.缓冲区在哪？
</code></pre><p>buf，指向缓冲元素的元数据</p><pre><code>qcount   uint           // total data in the queue （缓冲区已经存了多少元素）
dataqsiz uint           // size of the circular queue (缓冲区最多存多少元素)

 elemtype   缓冲的元素类型

elemsize  缓冲元素大小

sendx    uint   // send index	缓冲区数据发送到哪个位置了
recvx    uint   // receive index 缓冲区数据写到哪了
</code></pre><p>缓冲区是环形的，可以重复利用</p><p>2.lock用来保护整个结构并发</p><ol start="3"><li><p>为了能立即唤醒协程，需要有2个等待队列，分别针对读和写</p><p>recvq waitq // list of recv waiters sendq waitq // list of send waiters</p></li></ol><p>4.channel还需要close，所以得有个记录关闭的字段，closed uint32</p><h2 id="_1-底层原理" tabindex="-1">1.底层原理 <a class="header-anchor" href="#_1-底层原理" aria-label="Permalink to &quot;1.底层原理&quot;">​</a></h2><p>ch := make(chan int, 5)</p><h4 id="有缓冲" tabindex="-1">有缓冲： <a class="header-anchor" href="#有缓冲" aria-label="Permalink to &quot;有缓冲：&quot;">​</a></h4><pre><code>g1协程：

1.初始状态下ch 缓冲区是空的，sendx,recvx指向0

2.g1协程中不停的追加数据，缓冲区写满，之后sendx回到0的位置
</code></pre><p>3.此时队列已满，无法继续写数据，那么当前g就进入到ch的发送等待队列，对应一个sudog类型的链表</p><p>g2协程：</p><pre><code>1.从ch中接收数据，然后缓冲区空出位置，g1被唤醒，继续写，发送队列就变为空了
</code></pre><h2 id="_2-不阻塞条件" tabindex="-1">2.不阻塞条件： <a class="header-anchor" href="#_2-不阻塞条件" aria-label="Permalink to &quot;2.不阻塞条件：&quot;">​</a></h2><pre><code>1.有协程在接收数据
</code></pre><p>2.缓冲区还有空余位置</p><h2 id="_3-阻塞条件" tabindex="-1">3.阻塞条件 <a class="header-anchor" href="#_3-阻塞条件" aria-label="Permalink to &quot;3.阻塞条件&quot;">​</a></h2><pre><code>1.ch为nil

2.无缓冲区且没有协程接收数据

3.缓冲区满了，没有协程接收数据
</code></pre><h2 id="_4-非阻塞写法" tabindex="-1">4.非阻塞写法 <a class="header-anchor" href="#_4-非阻塞写法" aria-label="Permalink to &quot;4.非阻塞写法&quot;">​</a></h2><p>发送数据</p><p>select {</p><pre><code>case: ch &lt;- 10:

default:
</code></pre><p>}</p><p>阻塞就执行default,不阻塞就执行case分支</p><h2 id="_5-接收数据写法" tabindex="-1">5.接收数据写法 <a class="header-anchor" href="#_5-接收数据写法" aria-label="Permalink to &quot;5.接收数据写法&quot;">​</a></h2><p>阻塞写法</p><p>&lt;-ch 丢弃结果</p><p>v := &lt;-ch</p><p>v,ok := &lt;-ch, ok false表示已关闭，此时v是类型零值</p><p>非阻塞就用select，select不加default就会一直阻塞</p><h2 id="_6-select-底层" tabindex="-1">6.select 底层 <a class="header-anchor" href="#_6-select-底层" aria-label="Permalink to &quot;6.select 底层&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type scase struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">   c    *hchan         // chan</span></span>
<span class="line"><span style="color:#e1e4e8;">   elem unsafe.Pointer // data element</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func selectgo(cas0 *scase, order0 *uint16, pc0 *uintptr, nsends, nrecvs int, block bool) (int, bool) {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type scase struct {</span></span>
<span class="line"><span style="color:#24292e;">   c    *hchan         // chan</span></span>
<span class="line"><span style="color:#24292e;">   elem unsafe.Pointer // data element</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func selectgo(cas0 *scase, order0 *uint16, pc0 *uintptr, nsends, nrecvs int, block bool) (int, bool) {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>轮询顺序：保障调用公平性</p><p>加锁顺序：固定算法避免死锁</p><p>selectgo函数执行过程：</p><pre><code>1.按序加锁

2.乱序轮询

3.挂起等待

4.按序解锁

5.唤醒执行

6.按序加锁

7.离开队列

8.按序解锁
</code></pre>`,39),t=[p];function c(o,i,r,d,u,h){return n(),e("div",null,t)}const m=s(l,[["render",c]]);export{y as __pageData,m as default};
