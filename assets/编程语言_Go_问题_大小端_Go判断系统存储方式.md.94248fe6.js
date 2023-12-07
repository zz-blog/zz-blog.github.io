import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.6d94f49f.js";const l="/assets/image-20211118180122253.640b757f.png",p="/assets/image-20211118180155887.7bfaa13d.png",g=JSON.parse('{"title":"Go判断系统存储方式","description":null,"frontmatter":{"lang":"zh-CN","title":"Go判断系统存储方式","description":null},"headers":[],"relativePath":"编程语言/Go/问题/大小端/Go判断系统存储方式.md","filePath":"编程语言/Go/问题/大小端/Go判断系统存储方式.md","lastUpdated":1700319152000}'),o={name:"编程语言/Go/问题/大小端/Go判断系统存储方式.md"},c=e('<h1 id="为什么有大小端之分" tabindex="-1">为什么有大小端之分 <a class="header-anchor" href="#为什么有大小端之分" aria-label="Permalink to &quot;为什么有大小端之分&quot;">​</a></h1><p>我一直都不理解，为什么要有大小端区分，尤其是小端，总是会忘记，因为他不符合人类的思维习惯，但存在即为合理，存在就有他存在的价值。这里有一个比较合理的解释：计算机中电路优先处理低位字节，效率比较高，因为计算机都是从低位开始的，所以计算机内部处理都是小端字节序。但是我们平常读写数值的方法，习惯用大端字节序，所以除了计算机的内部，其他场景大都是大端字节序，比如：网络传输和文件储存时都是用的大端字节序。</p><p><img src="'+l+'" alt="image-20211118180122253"></p><p>所以大小端问题很可能与硬件或者软件的创造者们有关，实际在计算机工业应用上，不同的操作系统和不同的芯片类型都有所不同。不同的系统设计不同，所以我们也没必要深究为什么要有这个区分，只需要知道他们的原理就好了。</p><h2 id="什么是大端、小端" tabindex="-1">什么是大端、小端 <a class="header-anchor" href="#什么是大端、小端" aria-label="Permalink to &quot;什么是大端、小端&quot;">​</a></h2><p>大端模式：高位字节排放在内存的低地址端，低位字节排放在内存的高地址端;</p><p>小端模式：低位字节排放在内存的低地址端，高位字节排放在内存的高地址端；</p><p>这么说也有点模糊，还是配个图来看更清晰：</p><p>我们来看一看数值<code>0x1A2B3C4D</code>在大端与小端的表现形式，这里我们假设地址是从<code>0x4000</code>开始：</p><p><img src="'+p+`" alt="image-20211118180155887">上图所示：大端和小端的字节序最小单位是1字节(8bit)，大端字节序就和我们平时的写法顺序一样，从低地址到高地址写入<code>0x1A2B3C4D</code>，而小端字节序就是我们平时的写法反过来，因为字节序最小单位为<code>1</code>字节，所以从低地址到高地址写入<code>0x4D3C2B1A</code>。</p><p>因为大端、小端很容易混记，所以分享一个我自己记忆的小技巧：</p><p>大端：高低高低，也就是高位字节排放在内存低地址端，高地址端存在低位字节；</p><p>小端：高高低低；也就是高位字节排放在内存的高地址端，低位字节排放在内存的低地址端；</p><h2 id="如何使用go区分大小端" tabindex="-1">如何使用<code>Go</code>区分大小端 <a class="header-anchor" href="#如何使用go区分大小端" aria-label="Permalink to &quot;如何使用\`Go\`区分大小端&quot;">​</a></h2><p>计算机处理字节序的时候，不知道什么是高位字节，什么是低位字节。它只知道按顺序读取字节，先读取第一个字节，再读取第二个字节，所以说我就可以根据这个特性来读判断大小端。</p><p>在使用<code>Go</code>语言实现之前，还是想再用<code>C</code>语言实现一遍，因为这是我一生的痛，毕竟在面试的时候没写出来。</p><p>可以利用<code>C</code>语言中<code>union</code>各字段共享内存的特性，union型数据所占的空间等于其最大的成员所占的空间，对 union 型的成员的存取都是相对于<strong>该联合体基地址的偏移量为 0 处开始</strong>，也就是联合体的访问不论对哪个变量的存取都是<strong>从 union 的首地址位置开始</strong>，<strong>联合是一个在同一个存储空间里存储不同类型数据的数据类型</strong>。这些存储区的地址都是一样的，联合里不同存储区的内存是重叠的，修改了任何一个其他的会受影响。所以我们可写出代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#include &quot;stdio.h&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// big_endian: 1 </span></span>
<span class="line"><span style="color:#e1e4e8;">// little_endian: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">int IsLittleEndian() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    union {</span></span>
<span class="line"><span style="color:#e1e4e8;">        short value;</span></span>
<span class="line"><span style="color:#e1e4e8;">        char array[2];</span></span>
<span class="line"><span style="color:#e1e4e8;">    } u;</span></span>
<span class="line"><span style="color:#e1e4e8;">    u.value = 0x0102;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (u.array[0] == 1 &amp;&amp; u.array[1] == 2){</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }else if (u.array[0] == 2 &amp;&amp; u.array[1] == 1){</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    return -1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">int main() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    int res;</span></span>
<span class="line"><span style="color:#e1e4e8;">    res = IsLittleEndian();</span></span>
<span class="line"><span style="color:#e1e4e8;">    printf(&quot;result is %d\\n&quot;,res);</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (res == 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        printf(&quot;it is big endian&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (res == 2){</span></span>
<span class="line"><span style="color:#e1e4e8;">        printf(&quot;it is little endian&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 运行结果(不同系统运行结果会有不同)</span></span>
<span class="line"><span style="color:#e1e4e8;">result is 2</span></span>
<span class="line"><span style="color:#e1e4e8;">it is little endian%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#include &quot;stdio.h&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// big_endian: 1 </span></span>
<span class="line"><span style="color:#24292e;">// little_endian: 2</span></span>
<span class="line"><span style="color:#24292e;">int IsLittleEndian() {</span></span>
<span class="line"><span style="color:#24292e;">    union {</span></span>
<span class="line"><span style="color:#24292e;">        short value;</span></span>
<span class="line"><span style="color:#24292e;">        char array[2];</span></span>
<span class="line"><span style="color:#24292e;">    } u;</span></span>
<span class="line"><span style="color:#24292e;">    u.value = 0x0102;</span></span>
<span class="line"><span style="color:#24292e;">    if (u.array[0] == 1 &amp;&amp; u.array[1] == 2){</span></span>
<span class="line"><span style="color:#24292e;">        return 1;</span></span>
<span class="line"><span style="color:#24292e;">    }else if (u.array[0] == 2 &amp;&amp; u.array[1] == 1){</span></span>
<span class="line"><span style="color:#24292e;">        return 2;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    return -1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">int main() {</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    int res;</span></span>
<span class="line"><span style="color:#24292e;">    res = IsLittleEndian();</span></span>
<span class="line"><span style="color:#24292e;">    printf(&quot;result is %d\\n&quot;,res);</span></span>
<span class="line"><span style="color:#24292e;">    if (res == 1) {</span></span>
<span class="line"><span style="color:#24292e;">        printf(&quot;it is big endian&quot;);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    if (res == 2){</span></span>
<span class="line"><span style="color:#24292e;">        printf(&quot;it is little endian&quot;);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    return 0;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 运行结果(不同系统运行结果会有不同)</span></span>
<span class="line"><span style="color:#24292e;">result is 2</span></span>
<span class="line"><span style="color:#24292e;">it is little endian%</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>现在我们来思考一下，怎么用<code>Go</code>语言验证大小端，<code>Go</code>中是没有<code>union</code>这个关键字，那就要另辟蹊径，换一个方法来实现啦，我们可以通过将<code>int32</code>类型(4字节)强制转换成<code>byte</code>类型(单字节)，判断起始存储位置内容来实现，因为<code>Go</code>不支持强制类型转换，我们可以借助<code>unsafe</code>包达到我们的要求，写出代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">package main</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import (</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;fmt&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;unsafe&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func IsLittleEndian()  bool{</span></span>
<span class="line"><span style="color:#e1e4e8;"> var value int32 = 1 // 占4byte 转换成16进制 0x00 00 00 01 </span></span>
<span class="line"><span style="color:#e1e4e8;">  // 大端(16进制)：00 00 00 01</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 小端(16进制)：01 00 00 00</span></span>
<span class="line"><span style="color:#e1e4e8;"> pointer := unsafe.Pointer(&amp;value)</span></span>
<span class="line"><span style="color:#e1e4e8;"> pb := (*byte)(pointer)</span></span>
<span class="line"><span style="color:#e1e4e8;"> if *pb != 1{</span></span>
<span class="line"><span style="color:#e1e4e8;">  return false</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"> return true</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func main()  {</span></span>
<span class="line"><span style="color:#e1e4e8;"> fmt.Println(IsLittleEndian())</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 运行结果：ture</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">package main</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import (</span></span>
<span class="line"><span style="color:#24292e;"> &quot;fmt&quot;</span></span>
<span class="line"><span style="color:#24292e;"> &quot;unsafe&quot;</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func IsLittleEndian()  bool{</span></span>
<span class="line"><span style="color:#24292e;"> var value int32 = 1 // 占4byte 转换成16进制 0x00 00 00 01 </span></span>
<span class="line"><span style="color:#24292e;">  // 大端(16进制)：00 00 00 01</span></span>
<span class="line"><span style="color:#24292e;">  // 小端(16进制)：01 00 00 00</span></span>
<span class="line"><span style="color:#24292e;"> pointer := unsafe.Pointer(&amp;value)</span></span>
<span class="line"><span style="color:#24292e;"> pb := (*byte)(pointer)</span></span>
<span class="line"><span style="color:#24292e;"> if *pb != 1{</span></span>
<span class="line"><span style="color:#24292e;">  return false</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"> return true</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func main()  {</span></span>
<span class="line"><span style="color:#24292e;"> fmt.Println(IsLittleEndian())</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">// 运行结果：ture</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="大小端字节序转化" tabindex="-1">大小端字节序转化 <a class="header-anchor" href="#大小端字节序转化" aria-label="Permalink to &quot;大小端字节序转化&quot;">​</a></h2><p>这里大家可能会有疑惑，为什么要有大小端转化，这是因为在涉及到网络传输、文件存储时，因为不同系统的大小端字节序不同，这是就需要大小端转化，才能保证读取到的数据是正确的。我在大学时做<code>arm</code>和<code>dsp</code>通信的时候，就遇到个大小端转换的问题，因为<code>arm</code>是小端，<code>dsp</code>是大端，所以在不了解这个知识点的时候，通信的数据就是乱的，导致我调试了好久。</p><p>大小端的转换其实还算比较简单，通过位操作就可以实现，这里我们用<code>uint32</code>类型作为例子：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">func SwapEndianUin32(val uint32)  uint32{</span></span>
<span class="line"><span style="color:#e1e4e8;"> return (val &amp; 0xff000000) &gt;&gt; 24 | (val &amp; 0x00ff0000) &gt;&gt; 8 |</span></span>
<span class="line"><span style="color:#e1e4e8;">  (val &amp; 0x0000ff00) &lt;&lt; 8 | (val &amp; 0x000000ff) &lt;&lt;24</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">func SwapEndianUin32(val uint32)  uint32{</span></span>
<span class="line"><span style="color:#24292e;"> return (val &amp; 0xff000000) &gt;&gt; 24 | (val &amp; 0x00ff0000) &gt;&gt; 8 |</span></span>
<span class="line"><span style="color:#24292e;">  (val &amp; 0x0000ff00) &lt;&lt; 8 | (val &amp; 0x000000ff) &lt;&lt;24</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>是的，你没看错，就是这么简单，这里也很简单，就不细讲了。</p><p>其实<code>go</code>官方库<code>encoding/binary</code>中已经提供了大小端使用的库，我们要想进行大小端转换，完全可以使用官方库，没必要自己造轮子。我们看一下这个库怎么使用：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// use encoding/binary</span></span>
<span class="line"><span style="color:#e1e4e8;">// bigEndian littleEndian</span></span>
<span class="line"><span style="color:#e1e4e8;">func BigEndianAndLittleEndianByLibrary()  {</span></span>
<span class="line"><span style="color:#e1e4e8;"> var value uint32 = 10</span></span>
<span class="line"><span style="color:#e1e4e8;"> by := make([]byte,4)</span></span>
<span class="line"><span style="color:#e1e4e8;"> binary.BigEndian.PutUint32(by,value)</span></span>
<span class="line"><span style="color:#e1e4e8;"> fmt.Println(&quot;转换成大端后 &quot;,by)</span></span>
<span class="line"><span style="color:#e1e4e8;"> fmt.Println(&quot;使用大端字节序输出结果：&quot;,binary.BigEndian.Uint32(by))</span></span>
<span class="line"><span style="color:#e1e4e8;"> little := binary.LittleEndian.Uint32(by)</span></span>
<span class="line"><span style="color:#e1e4e8;"> fmt.Println(&quot;大端字节序使用小端输出结果：&quot;,little)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 结果：</span></span>
<span class="line"><span style="color:#e1e4e8;">转换成大端后  [0 0 0 10]</span></span>
<span class="line"><span style="color:#e1e4e8;">使用大端字节序输出结果： 10</span></span>
<span class="line"><span style="color:#e1e4e8;">大端字节序使用小端输出结果： 167772160</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// use encoding/binary</span></span>
<span class="line"><span style="color:#24292e;">// bigEndian littleEndian</span></span>
<span class="line"><span style="color:#24292e;">func BigEndianAndLittleEndianByLibrary()  {</span></span>
<span class="line"><span style="color:#24292e;"> var value uint32 = 10</span></span>
<span class="line"><span style="color:#24292e;"> by := make([]byte,4)</span></span>
<span class="line"><span style="color:#24292e;"> binary.BigEndian.PutUint32(by,value)</span></span>
<span class="line"><span style="color:#24292e;"> fmt.Println(&quot;转换成大端后 &quot;,by)</span></span>
<span class="line"><span style="color:#24292e;"> fmt.Println(&quot;使用大端字节序输出结果：&quot;,binary.BigEndian.Uint32(by))</span></span>
<span class="line"><span style="color:#24292e;"> little := binary.LittleEndian.Uint32(by)</span></span>
<span class="line"><span style="color:#24292e;"> fmt.Println(&quot;大端字节序使用小端输出结果：&quot;,little)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">// 结果：</span></span>
<span class="line"><span style="color:#24292e;">转换成大端后  [0 0 0 10]</span></span>
<span class="line"><span style="color:#24292e;">使用大端字节序输出结果： 10</span></span>
<span class="line"><span style="color:#24292e;">大端字节序使用小端输出结果： 167772160</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="grpc中对大端的应用" tabindex="-1"><code>grpc</code>中对大端的应用 <a class="header-anchor" href="#grpc中对大端的应用" aria-label="Permalink to &quot;\`grpc\`中对大端的应用&quot;">​</a></h3><p>大家对<code>gRPC</code>一定很熟悉，最近在看<code>gRPC</code>源码时，看到<code>gRPC</code>封装<code>message</code>时，在封装<code>header</code>时，特意指定了使用大端字节序，源码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// msgHeader returns a 5-byte header for the message being transmitted and the</span></span>
<span class="line"><span style="color:#e1e4e8;">// payload, which is compData if non-nil or data otherwise.</span></span>
<span class="line"><span style="color:#e1e4e8;">func msgHeader(data, compData []byte) (hdr []byte, payload []byte) {</span></span>
<span class="line"><span style="color:#e1e4e8;"> hdr = make([]byte, headerLen)</span></span>
<span class="line"><span style="color:#e1e4e8;"> if compData != nil {</span></span>
<span class="line"><span style="color:#e1e4e8;">  hdr[0] = byte(compressionMade)</span></span>
<span class="line"><span style="color:#e1e4e8;">  data = compData</span></span>
<span class="line"><span style="color:#e1e4e8;"> } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  hdr[0] = byte(compressionNone)</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> // Write length of payload into buf</span></span>
<span class="line"><span style="color:#e1e4e8;"> binary.BigEndian.PutUint32(hdr[payloadLen:], uint32(len(data)))</span></span>
<span class="line"><span style="color:#e1e4e8;"> return hdr, data</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// msgHeader returns a 5-byte header for the message being transmitted and the</span></span>
<span class="line"><span style="color:#24292e;">// payload, which is compData if non-nil or data otherwise.</span></span>
<span class="line"><span style="color:#24292e;">func msgHeader(data, compData []byte) (hdr []byte, payload []byte) {</span></span>
<span class="line"><span style="color:#24292e;"> hdr = make([]byte, headerLen)</span></span>
<span class="line"><span style="color:#24292e;"> if compData != nil {</span></span>
<span class="line"><span style="color:#24292e;">  hdr[0] = byte(compressionMade)</span></span>
<span class="line"><span style="color:#24292e;">  data = compData</span></span>
<span class="line"><span style="color:#24292e;"> } else {</span></span>
<span class="line"><span style="color:#24292e;">  hdr[0] = byte(compressionNone)</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> // Write length of payload into buf</span></span>
<span class="line"><span style="color:#24292e;"> binary.BigEndian.PutUint32(hdr[payloadLen:], uint32(len(data)))</span></span>
<span class="line"><span style="color:#24292e;"> return hdr, data</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="结尾" tabindex="-1">结尾 <a class="header-anchor" href="#结尾" aria-label="Permalink to &quot;结尾&quot;">​</a></h2><p>在本文的最后我们再来做一下总结：</p><ul><li>大端小端是不同的字节顺序存储方式，统称为<strong>字节序</strong></li><li><strong>大端</strong>：是指数据的高字节位 保存在 内存的低地址中，而数据的低字节位 保存在 内存的高地址中。这样的存储模式有点儿类似于把数据当作字符串顺序处理：地址由小向大增加，而数据从高位往低位放。和我们”从左到右“阅读习惯一致。</li><li><strong>小端</strong>：是指数据的高字节位 保存在 内存的高地址中，而数据的低字节位 保存在 内存的低地址中。这种存储模式将地址的高低和数据位权有效地结合起来，高地址部分权值高，低地址部分权值低，和我们的逻辑方法一致</li><li><strong>区分</strong>：计算机处理字节序的时候，不知道什么是高位字节，什么是低位字节。它只知道按顺序读区字节，先读取第一个字节，再读取第二个字节，所以说我就可以根据这个特性来读判断大小端。</li><li><strong>转换</strong>：通过位操作就可以实现，具体可以使用标准库<code>encoding/binary</code>；</li></ul>`,33),r=[c];function i(t,b,u,d,y,m){return n(),a("div",null,r)}const f=s(o,[["render",i]]);export{g as __pageData,f as default};
