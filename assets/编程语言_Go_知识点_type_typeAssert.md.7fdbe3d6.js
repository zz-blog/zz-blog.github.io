import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.6d94f49f.js";const E=JSON.parse('{"title":"type assert","description":null,"frontmatter":{"lang":"zh-CN","title":"type assert","description":null},"headers":[],"relativePath":"编程语言/Go/知识点/type/typeAssert.md","filePath":"编程语言/Go/知识点/type/typeAssert.md","lastUpdated":1700319152000}'),l={name:"编程语言/Go/知识点/type/typeAssert.md"},e=p(`<h1 id="type-assert-类型断言" tabindex="-1">type assert 类型断言 <a class="header-anchor" href="#type-assert-类型断言" aria-label="Permalink to &quot;type assert 类型断言&quot;">​</a></h1><p>类型断言被用于检查接口类型变量所持有的值是否实现了期望的接口或者具体的类型。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">类型断言的语法定义如下：</span></span>
<span class="line"><span style="color:#e1e4e8;">值，bool := PrimaryExpression.(Type) 断言失败不会panic</span></span>
<span class="line"><span style="color:#e1e4e8;">PrimaryExpression.(Type) 断言失败会panic</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">类型断言的语法定义如下：</span></span>
<span class="line"><span style="color:#24292e;">值，bool := PrimaryExpression.(Type) 断言失败不会panic</span></span>
<span class="line"><span style="color:#24292e;">PrimaryExpression.(Type) 断言失败会panic</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>PrimaryExpression 可以在 Go 语言规范中找到，并且它可以是标识符，特定索引的数组元素，切片等等。 Type 既可以是类型标识符，也可以是类型字面量，比如：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type I interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">    quack()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type S struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (s S) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;">func (s S) quack() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var i I</span></span>
<span class="line"><span style="color:#e1e4e8;">i = S{}</span></span>
<span class="line"><span style="color:#e1e4e8;">fmt.Println(i.(interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">}))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type I interface {</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">    quack()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type S struct{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (s S) walk() {}</span></span>
<span class="line"><span style="color:#24292e;">func (s S) quack() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var i I</span></span>
<span class="line"><span style="color:#24292e;">i = S{}</span></span>
<span class="line"><span style="color:#24292e;">fmt.Println(i.(interface {</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">}))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>PrimaryExpression 必须是接口类型，否则就会产生一个编译时错误： 如果表达式为 nil，类型断言就不会成立。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type I interface{</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">    quack()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type S struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;">S{}.(I) // 无效类型断言：S{}.(I)(操作符左边的 S 并不是个接口类型)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type I interface{</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">    quack()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type S struct{}</span></span>
<span class="line"><span style="color:#24292e;">S{}.(I) // 无效类型断言：S{}.(I)(操作符左边的 S 并不是个接口类型)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="动态类型" tabindex="-1">动态类型 <a class="header-anchor" href="#动态类型" aria-label="Permalink to &quot;动态类型&quot;">​</a></h2><p>变量除了有静态类型外（变量声明中的类型），接口变量还有动态类型。就是在当前接口类型变量中设置的一种类型的值。 在程序执行的过程当中，接口类型的变量具有相同的静态类型，但是其动态类型会随着其实现的接口不同，而其值也会随之改变。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type I interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type A struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (a A) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type B struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (b B) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func main() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    var i I</span></span>
<span class="line"><span style="color:#e1e4e8;">    i = A{}  // i 的动态类型是 A</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(A))</span></span>
<span class="line"><span style="color:#e1e4e8;">    i = B{}  // i 的动态类型是 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(B))</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type I interface {</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type A struct{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (a A) walk() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type B struct{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (b B) walk() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func main() {</span></span>
<span class="line"><span style="color:#24292e;">    var i I</span></span>
<span class="line"><span style="color:#24292e;">    i = A{}  // i 的动态类型是 A</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(A))</span></span>
<span class="line"><span style="color:#24292e;">    i = B{}  // i 的动态类型是 B</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(B))</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="接口类型" tabindex="-1">接口类型 <a class="header-anchor" href="#接口类型" aria-label="Permalink to &quot;接口类型&quot;">​</a></h2><p>如果 T 来自 v.(T) 是一个接口类型，这样的断言检查，可以用来检测 v 的动态类型是否实现了接口 T：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type I interfacce {</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type J interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    quack()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type K interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    bark()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type S struc{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (s S) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (s S) quack() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func main() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    var i I</span></span>
<span class="line"><span style="color:#e1e4e8;">    i = S{}</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(J))</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(K))  // panic: 接口转换: main.S 不是 main.K: 缺少方法 bark</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type I interfacce {</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type J interface {</span></span>
<span class="line"><span style="color:#24292e;">    quack()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type K interface {</span></span>
<span class="line"><span style="color:#24292e;">    bark()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type S struc{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (s S) walk() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (s S) quack() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func main() {</span></span>
<span class="line"><span style="color:#24292e;">    var i I</span></span>
<span class="line"><span style="color:#24292e;">    i = S{}</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(J))</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(K))  // panic: 接口转换: main.S 不是 main.K: 缺少方法 bark</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="非接口类型" tabindex="-1">非接口类型 <a class="header-anchor" href="#非接口类型" aria-label="Permalink to &quot;非接口类型&quot;">​</a></h2><p>如果 T 来自 v.(T) 不是接口类型，这样断言检查动态类型 v 是否与 T 类型相同：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type I interface {</span></span>
<span class="line"><span style="color:#e1e4e8;">    walk()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type A struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (a A) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type B struct{}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func (b B) walk() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">func main() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    var i I</span></span>
<span class="line"><span style="color:#e1e4e8;">    i = A{}</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(A))</span></span>
<span class="line"><span style="color:#e1e4e8;">    fmt.Printf(&quot;%T\\n&quot;, i.(B))  // panic: 接口转换: main.I 是 main.A, 不是 main.B</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type I interface {</span></span>
<span class="line"><span style="color:#24292e;">    walk()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type A struct{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (a A) walk() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type B struct{}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func (b B) walk() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">func main() {</span></span>
<span class="line"><span style="color:#24292e;">    var i I</span></span>
<span class="line"><span style="color:#24292e;">    i = A{}</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(A))</span></span>
<span class="line"><span style="color:#24292e;">    fmt.Printf(&quot;%T\\n&quot;, i.(B))  // panic: 接口转换: main.I 是 main.A, 不是 main.B</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>在非接口类型情况下进行类型传递就必须实现接口 I，如果不满足这个要求的话就会在编译时被捕获：</p><p>type C struct{} fmt.Prinf(&quot;%T\\n&quot;, i.(C)) 输出：</p><p>impossible type assertion: C does not implement I (missing walk method)</p><h2 id="panic" tabindex="-1">panic <a class="header-anchor" href="#panic" aria-label="Permalink to &quot;panic&quot;">​</a></h2><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">I</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">walk</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">A</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (a A) </span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">B</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (b B) </span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i I</span></span>
<span class="line"><span style="color:#E1E4E8;">    i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> A{name: </span><span style="color:#9ECBFF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    valA, okA </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> i.(A)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%#v</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">%#v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, valA, okA)</span></span>
<span class="line"><span style="color:#E1E4E8;">    valB, okB </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> i.(B)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%#v</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">%#v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, valB, okB)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">输出：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">main.A{name:</span><span style="color:#9ECBFF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">} </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">main.B{name:</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">} </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">当断言不成立时，第一个值将会作为测试类型的零值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">I</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">walk</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (a A) </span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">B</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (b B) </span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i I</span></span>
<span class="line"><span style="color:#24292E;">    i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> A{name: </span><span style="color:#032F62;">&quot;foo&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    valA, okA </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> i.(A)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%#v</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">%#v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, valA, okA)</span></span>
<span class="line"><span style="color:#24292E;">    valB, okB </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> i.(B)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%#v</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">%#v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, valB, okB)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">输出：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">main.A{name:</span><span style="color:#032F62;">&quot;foo&quot;</span><span style="color:#24292E;">} </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">main.B{name:</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">} </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">当断言不成立时，第一个值将会作为测试类型的零值</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,21),o=[e];function c(r,t,i,y,u,b){return n(),a("div",null,o)}const d=s(l,[["render",c]]);export{E as __pageData,d as default};
