import{_ as n,c as s,o as a,U as p}from"./chunks/framework.9QHaLlVJ.js";const f=JSON.parse('{"title":"defer","description":null,"frontmatter":{"lang":"zh-CN","title":"defer","description":null},"headers":[],"relativePath":"doc/编程语言/Go/基础/defer/defer.md","filePath":"packages/doc/src/编程语言/Go/基础/defer/defer.md","lastUpdated":1704297641000}'),l={name:"doc/编程语言/Go/基础/defer/defer.md"},e=p(`<h1 id="defer" tabindex="-1">defer <a class="header-anchor" href="#defer" aria-label="Permalink to &quot;defer&quot;">​</a></h1><p>延迟执行语句,设计之初的目的用来在函数返回之后，做一些释放资源的操作。</p><p>特点:</p><ul><li>符合栈的特点，先定义的defer语句后执行</li><li>调用的时机可以是函数正常结束时，也可以是发生宕机时，go自身有机制保障defer语句被最终调用(panic时候也可以保证调用)</li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	log.Println(&quot;值:&quot;, deferReturn4())</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferCall() {</span></span>
<span class="line"><span>	// 结论：先进后出</span></span>
<span class="line"><span>	defer func() { log.Println(&quot;打印前&quot;) }()</span></span>
<span class="line"><span>	defer func() { log.Println(&quot;打印中&quot;) }()</span></span>
<span class="line"><span>	defer func() { log.Println(&quot;打印后&quot;) }()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferFor() {</span></span>
<span class="line"><span>	// 先进后出，4，3，2，1，0</span></span>
<span class="line"><span>	/*for i := 0; i &lt; 5; i++ {</span></span>
<span class="line"><span>		defer log.Println(i)</span></span>
<span class="line"><span>	}*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	/*for i := 0; i &lt; 5; i++ {</span></span>
<span class="line"><span>		// 打印的时候i已经是最终值了</span></span>
<span class="line"><span>		defer func() {</span></span>
<span class="line"><span>			log.Println(i)</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 与第一种方式等价</span></span>
<span class="line"><span>	for i := 0; i &lt; 5; i++ {</span></span>
<span class="line"><span>		// 打印的时候i已经是最终值了</span></span>
<span class="line"><span>		defer func(a int) {</span></span>
<span class="line"><span>			log.Println(a)</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferReturn() int {</span></span>
<span class="line"><span>	// 当函数签名没有声明具体返回值变量的时候，defer无法修改return之后的变量</span></span>
<span class="line"><span>	t := 5</span></span>
<span class="line"><span>	defer func() {</span></span>
<span class="line"><span>		log.Println(&quot;t:&quot;, t)</span></span>
<span class="line"><span>		t++</span></span>
<span class="line"><span>		log.Println(&quot;t++:&quot;, t)</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	return t</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferReturn1() (r int) {</span></span>
<span class="line"><span>	log.Println(&quot;r1:&quot;, r) // 0,此时是零值</span></span>
<span class="line"><span>	defer func() {</span></span>
<span class="line"><span>		log.Println(&quot;r4:&quot;, r) // -1,此时是首次return</span></span>
<span class="line"><span>		r = 3</span></span>
<span class="line"><span>		log.Println(&quot;r2:&quot;, r) // 3,此时是修改return</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	log.Println(&quot;r3:&quot;, r) // 0,此时是零值</span></span>
<span class="line"><span>	return -1             // -1,此时是首次return</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferReturn2() (r int) {</span></span>
<span class="line"><span>	t := 5</span></span>
<span class="line"><span>	defer func() {</span></span>
<span class="line"><span>		log.Println(&quot;r1:&quot;, r) // 5,return的是5</span></span>
<span class="line"><span>		t = t + 5</span></span>
<span class="line"><span>		r++                   // 修改的是r的话还会修改，t不影响</span></span>
<span class="line"><span>		log.Println(&quot;r3:&quot;, r) // 10，+5之后变成10</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	log.Println(&quot;r2:&quot;, r) // 0,零值</span></span>
<span class="line"><span>	return t</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferReturn3() (r int) {</span></span>
<span class="line"><span>	/**</span></span>
<span class="line"><span>	此处传值，不会影响返回值，如果是指针则会影响</span></span>
<span class="line"><span>	*/</span></span>
<span class="line"><span>	log.Println(&quot;r1:&quot;, r) // 0, 零值</span></span>
<span class="line"><span>	// 局部变量同名,局部变量为准，无法影响到外围的r</span></span>
<span class="line"><span>	defer func(r int) {</span></span>
<span class="line"><span>		log.Println(&quot;r3:&quot;, r) // 0</span></span>
<span class="line"><span>		r = r + 5</span></span>
<span class="line"><span>		log.Println(&quot;r4:&quot;, r) // 5</span></span>
<span class="line"><span>	}(r)</span></span>
<span class="line"><span>	log.Println(&quot;r2:&quot;, r) // 0, 零值</span></span>
<span class="line"><span>	return 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deferReturn4() (r int) {</span></span>
<span class="line"><span>	log.Println(&quot;r1:&quot;, r) // 0, 零值</span></span>
<span class="line"><span>	// 局部变量不同名，会影响外部变量，无法影响到外围的r</span></span>
<span class="line"><span>	defer func(t int) {</span></span>
<span class="line"><span>		log.Println(&quot;r3:&quot;, r) // 1</span></span>
<span class="line"><span>		r = r + 5</span></span>
<span class="line"><span>		log.Println(&quot;r4:&quot;, r) // 5</span></span>
<span class="line"><span>	}(r)</span></span>
<span class="line"><span>	log.Println(&quot;r2:&quot;, r) // 0, 零值</span></span>
<span class="line"><span>	return 1</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br></div></div>`,6),r=[e];function i(t,c,b,u,o,m){return a(),s("div",null,r)}const q=n(l,[["render",i]]);export{f as __pageData,q as default};
