import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.DwbewbAn.js";const k=JSON.parse('{"title":"Go判断系统存储方式","description":null,"frontmatter":{"lang":"zh-CN","title":"Go判断系统存储方式","description":null},"headers":[],"relativePath":"doc/编程语言/后端/Go/实战/大小端/Go判断系统存储方式.md","filePath":"packages/doc/src/编程语言/后端/Go/实战/大小端/Go判断系统存储方式.md","lastUpdated":1711551906000}'),i={name:"doc/编程语言/后端/Go/实战/大小端/Go判断系统存储方式.md"},e=p(`<h2 id="如何使用go区分大小端" tabindex="-1">如何使用<code>Go</code>区分大小端 <a class="header-anchor" href="#如何使用go区分大小端" aria-label="Permalink to &quot;如何使用\`Go\`区分大小端&quot;">​</a></h2><p>计算机处理字节序的时候，不知道什么是高位字节，什么是低位字节。它只知道按顺序读取字节，先读取第一个字节，再读取第二个字节，所以说我就可以根据这个特性来读判断大小端。</p><p>在使用<code>Go</code>语言实现之前，还是想再用<code>C</code>语言实现一遍，因为这是我一生的痛，毕竟在面试的时候没写出来。</p><p>可以利用<code>C</code>语言中<code>union</code>各字段共享内存的特性，union型数据所占的空间等于其最大的成员所占的空间，对 union 型的成员的存取都是相对于<strong>该联合体基地址的偏移量为 0 处开始</strong>，也就是联合体的访问不论对哪个变量的存取都是<strong>从 union 的首地址位置开始</strong>，<strong>联合是一个在同一个存储空间里存储不同类型数据的数据类型</strong>。这些存储区的地址都是一样的，联合里不同存储区的内存是重叠的，修改了任何一个其他的会受影响。所以我们可写出代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#include &quot;stdio.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// big_endian: 1 </span></span>
<span class="line"><span>// little_endian: 2</span></span>
<span class="line"><span>int IsLittleEndian() {</span></span>
<span class="line"><span>    union {</span></span>
<span class="line"><span>        short value;</span></span>
<span class="line"><span>        char array[2];</span></span>
<span class="line"><span>    } u;</span></span>
<span class="line"><span>    u.value = 0x0102;</span></span>
<span class="line"><span>    if (u.array[0] == 1 &amp;&amp; u.array[1] == 2){</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }else if (u.array[0] == 2 &amp;&amp; u.array[1] == 1){</span></span>
<span class="line"><span>        return 2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return -1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    int res;</span></span>
<span class="line"><span>    res = IsLittleEndian();</span></span>
<span class="line"><span>    printf(&quot;result is %d\\n&quot;,res);</span></span>
<span class="line"><span>    if (res == 1) {</span></span>
<span class="line"><span>        printf(&quot;it is big endian&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (res == 2){</span></span>
<span class="line"><span>        printf(&quot;it is little endian&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 运行结果(不同系统运行结果会有不同)</span></span>
<span class="line"><span>result is 2</span></span>
<span class="line"><span>it is little endian%</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>现在我们来思考一下，怎么用<code>Go</code>语言验证大小端，<code>Go</code>中是没有<code>union</code>这个关键字，那就要另辟蹊径，换一个方法来实现啦，我们可以通过将<code>int32</code>类型(4字节)强制转换成<code>byte</code>类型(单字节)，判断起始存储位置内容来实现，因为<code>Go</code>不支持强制类型转换，我们可以借助<code>unsafe</code>包达到我们的要求，写出代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span> &quot;fmt&quot;</span></span>
<span class="line"><span> &quot;unsafe&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func IsLittleEndian()  bool{</span></span>
<span class="line"><span> var value int32 = 1 // 占4byte 转换成16进制 0x00 00 00 01 </span></span>
<span class="line"><span>  // 大端(16进制)：00 00 00 01</span></span>
<span class="line"><span>  // 小端(16进制)：01 00 00 00</span></span>
<span class="line"><span> pointer := unsafe.Pointer(&amp;value)</span></span>
<span class="line"><span> pb := (*byte)(pointer)</span></span>
<span class="line"><span> if *pb != 1{</span></span>
<span class="line"><span>  return false</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> return true</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main()  {</span></span>
<span class="line"><span> fmt.Println(IsLittleEndian())</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 运行结果：ture</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="大小端字节序转化" tabindex="-1">大小端字节序转化 <a class="header-anchor" href="#大小端字节序转化" aria-label="Permalink to &quot;大小端字节序转化&quot;">​</a></h2><p>这里大家可能会有疑惑，为什么要有大小端转化，这是因为在涉及到网络传输、文件存储时，因为不同系统的大小端字节序不同，这是就需要大小端转化，才能保证读取到的数据是正确的。我在大学时做<code>arm</code>和<code>dsp</code>通信的时候，就遇到个大小端转换的问题，因为<code>arm</code>是小端，<code>dsp</code>是大端，所以在不了解这个知识点的时候，通信的数据就是乱的，导致我调试了好久。</p><p>大小端的转换其实还算比较简单，通过位操作就可以实现，这里我们用<code>uint32</code>类型作为例子：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func SwapEndianUin32(val uint32)  uint32{</span></span>
<span class="line"><span> return (val &amp; 0xff000000) &gt;&gt; 24 | (val &amp; 0x00ff0000) &gt;&gt; 8 |</span></span>
<span class="line"><span>  (val &amp; 0x0000ff00) &lt;&lt; 8 | (val &amp; 0x000000ff) &lt;&lt;24</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>是的，你没看错，就是这么简单，这里也很简单，就不细讲了。</p><p>其实<code>go</code>官方库<code>encoding/binary</code>中已经提供了大小端使用的库，我们要想进行大小端转换，完全可以使用官方库，没必要自己造轮子。我们看一下这个库怎么使用：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// use encoding/binary</span></span>
<span class="line"><span>// bigEndian littleEndian</span></span>
<span class="line"><span>func BigEndianAndLittleEndianByLibrary()  {</span></span>
<span class="line"><span> var value uint32 = 10</span></span>
<span class="line"><span> by := make([]byte,4)</span></span>
<span class="line"><span> binary.BigEndian.PutUint32(by,value)</span></span>
<span class="line"><span> fmt.Println(&quot;转换成大端后 &quot;,by)</span></span>
<span class="line"><span> fmt.Println(&quot;使用大端字节序输出结果：&quot;,binary.BigEndian.Uint32(by))</span></span>
<span class="line"><span> little := binary.LittleEndian.Uint32(by)</span></span>
<span class="line"><span> fmt.Println(&quot;大端字节序使用小端输出结果：&quot;,little)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 结果：</span></span>
<span class="line"><span>转换成大端后  [0 0 0 10]</span></span>
<span class="line"><span>使用大端字节序输出结果： 10</span></span>
<span class="line"><span>大端字节序使用小端输出结果： 167772160</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="grpc中对大端的应用" tabindex="-1"><code>grpc</code>中对大端的应用 <a class="header-anchor" href="#grpc中对大端的应用" aria-label="Permalink to &quot;\`grpc\`中对大端的应用&quot;">​</a></h3><p>大家对<code>gRPC</code>一定很熟悉，最近在看<code>gRPC</code>源码时，看到<code>gRPC</code>封装<code>message</code>时，在封装<code>header</code>时，特意指定了使用大端字节序，源码如下：</p><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// msgHeader returns a 5-byte header for the message being transmitted and the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// payload, which is compData if non-nil or data otherwise.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> msgHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">compData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">hdr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hdr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, headerLen)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> compData </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  hdr[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(compressionMade)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> compData</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  hdr[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> byte</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(compressionNone)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Write length of payload into buf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> binary.BigEndian.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PutUint32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(hdr[payloadLen:], </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">uint32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data)))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hdr, data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="结尾" tabindex="-1">结尾 <a class="header-anchor" href="#结尾" aria-label="Permalink to &quot;结尾&quot;">​</a></h2><p>在本文的最后我们再来做一下总结：</p><ul><li>大端小端是不同的字节顺序存储方式，统称为<strong>字节序</strong></li><li><strong>大端</strong>：是指数据的高字节位 保存在 内存的低地址中，而数据的低字节位 保存在 内存的高地址中。这样的存储模式有点儿类似于把数据当作字符串顺序处理：地址由小向大增加，而数据从高位往低位放。和我们”从左到右“阅读习惯一致。</li><li><strong>小端</strong>：是指数据的高字节位 保存在 内存的高地址中，而数据的低字节位 保存在 内存的低地址中。这种存储模式将地址的高低和数据位权有效地结合起来，高地址部分权值高，低地址部分权值低，和我们的逻辑方法一致</li><li><strong>区分</strong>：计算机处理字节序的时候，不知道什么是高位字节，什么是低位字节。它只知道按顺序读区字节，先读取第一个字节，再读取第二个字节，所以说我就可以根据这个特性来读判断大小端。</li><li><strong>转换</strong>：通过位操作就可以实现，具体可以使用标准库<code>encoding/binary</code>；</li></ul>`,20),l=[e];function r(t,c,h,d,b,o){return a(),n("div",null,l)}const m=s(i,[["render",r]]);export{k as __pageData,m as default};
