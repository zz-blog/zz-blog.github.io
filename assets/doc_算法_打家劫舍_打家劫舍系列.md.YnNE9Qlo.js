import{_ as s,c as n,o as a,U as p}from"./chunks/framework.9QHaLlVJ.js";const e="/assets/image-20211125233209121.3GIx7sik.png",l="/assets/image-20211125233309575.bNHAj0TB.png",i="/assets/image-20211125233332406.je41GcpW.png",r="/assets/image-20211125233412822.oHnaDoHL.png",c="/assets/image-20211125233430737.bohbAoDN.png",k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/算法/打家劫舍/打家劫舍系列.md","filePath":"packages/doc/src/算法/打家劫舍/打家劫舍系列.md","lastUpdated":1705591713000}'),t={name:"doc/算法/打家劫舍/打家劫舍系列.md"},b=p('<p>有好几位读者私下问我 LeetCode 「打家劫舍」系列问题（英文版叫 House Robber）怎么做，我发现这一系列题目的点赞非常之高，是比较有代表性和技巧性的动态规划题目，今天就来聊聊这道题目。</p><p>打家劫舍系列总共有三道，难度设计非常合理，层层递进。第一道是比较标准的动态规划问题，而第二道融入了环形数组的条件，第三道更绝，让盗贼在二叉树上打劫，这就是传说中的高智商犯罪吧。。。</p><p>下面，我们从第一道开始分析。</p><h3 id="house-robber-i" tabindex="-1">House Robber I <a class="header-anchor" href="#house-robber-i" aria-label="Permalink to &quot;House Robber I&quot;">​</a></h3><p><img src="'+e+'" alt="image-20211125233209121"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public int rob(int[] nums);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>题目很容易理解，而且动态规划的特征很明显。我们前文 <a href="http://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&amp;mid=2247484731&amp;idx=1&amp;sn=f1db6dee2c8e70c42240aead9fd224e6&amp;chksm=9bd7fb33aca07225bee0b23a911c30295e0b90f393af75eca377caa4598ffb203549e1768336&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">动态规划详解</a> 做过总结，<strong>解决动态规划问题就是找「状态」和「选择」，仅此而已</strong>。</p><p>假想你就是这个专业强盗，从左到右走过这一排房子，在每间房子前都有两种<strong>选择</strong>：抢或者不抢。</p><p>如果你抢了这间房子，那么你肯定不能抢相邻的下一间房子了，只能从<strong>下下间</strong>房子开始做选择。</p><p>如果你不抢这间房子，那么你可以走到<strong>下一间</strong>房子前，继续做选择。</p><p>当你走过了最后一间房子后，你就没得抢了，能抢到的钱显然是 0（<strong>base case</strong>）。</p><p>以上的逻辑很简单吧，其实已经明确了「状态」和「选择」：<strong>你面前房子的索引就是状态，抢和不抢就是选择</strong>。</p><p><img src="'+l+`" alt="image-20211125233309575"></p><p>在两个选择中，每次都选更大的结果，最后得到的就是最多能抢到的 money：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 主函数</span></span>
<span class="line"><span>public int rob(int[] nums) {</span></span>
<span class="line"><span>    return dp(nums, 0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 返回 nums[start..] 能抢到的最大值</span></span>
<span class="line"><span>private int dp(int[] nums, int start) {</span></span>
<span class="line"><span>    if (start &gt;= nums.length) {</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int res = Math.max(</span></span>
<span class="line"><span>            // 不抢，去下家</span></span>
<span class="line"><span>            dp(nums, start + 1), </span></span>
<span class="line"><span>            // 抢，去下下家</span></span>
<span class="line"><span>            nums[start] + dp(nums, start + 2)</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    return res;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>明确了状态转移，就可以发现对于同一<code>start</code>位置，是存在重叠子问题的，比如下图：</p><p><img src="`+i+`" alt="image-20211125233332406"></p><p>盗贼有多种选择可以走到这个位置，如果每次到这都进入递归，岂不是浪费时间？所以说存在重叠子问题，可以用备忘录进行优化：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private int[] memo;</span></span>
<span class="line"><span>// 主函数</span></span>
<span class="line"><span>public int rob(int[] nums) {</span></span>
<span class="line"><span>    // 初始化备忘录</span></span>
<span class="line"><span>    memo = new int[nums.length];</span></span>
<span class="line"><span>    Arrays.fill(memo, -1);</span></span>
<span class="line"><span>    // 强盗从第 0 间房子开始抢劫</span></span>
<span class="line"><span>    return dp(nums, 0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回 dp[start..] 能抢到的最大值</span></span>
<span class="line"><span>private int dp(int[] nums, int start) {</span></span>
<span class="line"><span>    if (start &gt;= nums.length) {</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 避免重复计算</span></span>
<span class="line"><span>    if (memo[start] != -1) return memo[start];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int res = Math.max(dp(nums, start + 1), </span></span>
<span class="line"><span>                    nums[start] + dp(nums, start + 2));</span></span>
<span class="line"><span>    // 记入备忘录</span></span>
<span class="line"><span>    memo[start] = res;</span></span>
<span class="line"><span>    return res;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>这就是自顶向下的动态规划解法，我们也可以略作修改，写出<strong>自底向上</strong>的解法：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> int rob(int[] nums) {</span></span>
<span class="line"><span>    int n = nums.length;</span></span>
<span class="line"><span>    // dp[i] = x 表示：</span></span>
<span class="line"><span>    // 从第 i 间房子开始抢劫，最多能抢到的钱为 x</span></span>
<span class="line"><span>    // base case: dp[n] = 0</span></span>
<span class="line"><span>    int[] dp = new int[n + 2];</span></span>
<span class="line"><span>    for (int i = n - 1; i &gt;= 0; i--) {</span></span>
<span class="line"><span>        dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return dp[0];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>我们又发现状态转移只和<code>dp[i]</code>最近的两个状态有关，所以可以进一步优化，将空间复杂度降低到 O(1)。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int rob(int[] nums) {</span></span>
<span class="line"><span>    int n = nums.length;</span></span>
<span class="line"><span>    // 记录 dp[i+1] 和 dp[i+2]</span></span>
<span class="line"><span>    int dp_i_1 = 0, dp_i_2 = 0;</span></span>
<span class="line"><span>    // 记录 dp[i]</span></span>
<span class="line"><span>    int dp_i = 0; </span></span>
<span class="line"><span>    for (int i = n - 1; i &gt;= 0; i--) {</span></span>
<span class="line"><span>        dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);</span></span>
<span class="line"><span>        dp_i_2 = dp_i_1;</span></span>
<span class="line"><span>        dp_i_1 = dp_i;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return dp_i;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>以上的流程，在我们 <a href="http://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&amp;mid=2247484731&amp;idx=1&amp;sn=f1db6dee2c8e70c42240aead9fd224e6&amp;chksm=9bd7fb33aca07225bee0b23a911c30295e0b90f393af75eca377caa4598ffb203549e1768336&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">动态规划详解</a> 中详细解释过，相信大家都能手到擒来了。我认为很有意思的是这个问题的 follow up，需要基于我们现在的思路做一些巧妙的应变。</p><h3 id="house-robber-ii" tabindex="-1">House Robber II <a class="header-anchor" href="#house-robber-ii" aria-label="Permalink to &quot;House Robber II&quot;">​</a></h3><p>这道题目和第一道描述基本一样，强盗依然不能抢劫相邻的房子，输入依然是一个数组，但是告诉你<strong>这些房子不是一排，而是围成了一个圈</strong>。</p><p>也就是说，现在第一间房子和最后一间房子也相当于是相邻的，不能同时抢。比如说输入数组<code>nums=[2,3,2]</code>，算法返回的结果应该是 3 而不是 4，因为开头和结尾不能同时被抢。</p><p>这个约束条件看起来应该不难解决，我们前文 <a href="http://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&amp;mid=2247484525&amp;idx=1&amp;sn=3d2e63694607fec72455a52d9b15d4e5&amp;chksm=9bd7fa65aca073734df90b45054448e09c14e6e35ad7b778bff62f9bd6c2b4f6e1ca7bc4f844&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">单调栈 Monotonic Stack 的使用</a> 说过一种解决环形数组的方案，那么在这个问题上怎么处理呢？</p><p>首先，首尾房间不能同时被抢，那么只可能有三种不同情况：要么都不被抢；要么第一间房子被抢最后一间不抢；要么最后一间房子被抢第一间不抢。</p><p><img src="`+r+`" alt="image-20211125233412822"></p><p>那就简单了啊，这三种情况，哪种的结果最大，就是最终答案呗！不过，其实我们不需要比较三种情况，**只要比较情况二和情况三就行了，**<strong>因为这两种情况对于房子的选择余地比情况一大呀，房子里的钱数都是非负数，所以选择余地大，最优决策结果肯定不会小</strong>。</p><p>所以只需对之前的解法稍作修改即可：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public int rob(int[] nums) {</span></span>
<span class="line"><span>    int n = nums.length;</span></span>
<span class="line"><span>    if (n == 1) return nums[0];</span></span>
<span class="line"><span>    return Math.max(robRange(nums, 0, n - 2), </span></span>
<span class="line"><span>                    robRange(nums, 1, n - 1));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 仅计算闭区间 [start,end] 的最优结果</span></span>
<span class="line"><span>int robRange(int[] nums, int start, int end) {</span></span>
<span class="line"><span>    int n = nums.length;</span></span>
<span class="line"><span>    int dp_i_1 = 0, dp_i_2 = 0;</span></span>
<span class="line"><span>    int dp_i = 0;</span></span>
<span class="line"><span>    for (int i = end; i &gt;= start; i--) {</span></span>
<span class="line"><span>        dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);</span></span>
<span class="line"><span>        dp_i_2 = dp_i_1;</span></span>
<span class="line"><span>        dp_i_1 = dp_i;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return dp_i;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>至此，第二问也解决了。</p><h3 id="house-robber-iii" tabindex="-1">House Robber III <a class="header-anchor" href="#house-robber-iii" aria-label="Permalink to &quot;House Robber III&quot;">​</a></h3><p>第三题又想法设法地变花样了，此强盗发现现在面对的房子不是一排，不是一圈，而是一棵二叉树！房子在二叉树的节点上，相连的两个房子不能同时被抢劫：</p><p><img src="`+c+`" alt="image-20211125233430737"></p><p>整体的思路完全没变，还是做抢或者不抢的选择，取收益较大的选择。甚至我们可以直接按这个套路写出代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Map&lt;TreeNode, Integer&gt; memo = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>public int rob(TreeNode root) {</span></span>
<span class="line"><span>    if (root == null) return 0;</span></span>
<span class="line"><span>    // 利用备忘录消除重叠子问题</span></span>
<span class="line"><span>    if (memo.containsKey(root)) </span></span>
<span class="line"><span>        return memo.get(root);</span></span>
<span class="line"><span>    // 抢，然后去下下家</span></span>
<span class="line"><span>    int do_it = root.val</span></span>
<span class="line"><span>        + (root.left == null ? </span></span>
<span class="line"><span>            0 : rob(root.left.left) + rob(root.left.right))</span></span>
<span class="line"><span>        + (root.right == null ? </span></span>
<span class="line"><span>            0 : rob(root.right.left) + rob(root.right.right));</span></span>
<span class="line"><span>    // 不抢，然后去下家</span></span>
<span class="line"><span>    int not_do = rob(root.left) + rob(root.right);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int res = Math.max(do_it, not_do);</span></span>
<span class="line"><span>    memo.put(root, res);</span></span>
<span class="line"><span>    return res;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>这道题就解决了，时间复杂度 O(N)，<code>N</code>为数的节点数。</p><p>但是这道题让我觉得巧妙的点在于，还有更漂亮的解法。比如下面是我在评论区看到的一个解法：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int rob(TreeNode root) {</span></span>
<span class="line"><span>    int[] res = dp(root);</span></span>
<span class="line"><span>    return Math.max(res[0], res[1]);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* 返回一个大小为 2 的数组 arr</span></span>
<span class="line"><span>arr[0] 表示不抢 root 的话，得到的最大钱数</span></span>
<span class="line"><span>arr[1] 表示抢 root 的话，得到的最大钱数 */</span></span>
<span class="line"><span>int[] dp(TreeNode root) {</span></span>
<span class="line"><span>    if (root == null)</span></span>
<span class="line"><span>        return new int[]{0, 0};</span></span>
<span class="line"><span>    int[] left = dp(root.left);</span></span>
<span class="line"><span>    int[] right = dp(root.right);</span></span>
<span class="line"><span>    // 抢，下家就不能抢了</span></span>
<span class="line"><span>    int rob = root.val + left[0] + right[0];</span></span>
<span class="line"><span>    // 不抢，下家可抢可不抢，取决于收益大小</span></span>
<span class="line"><span>    int not_rob = Math.max(left[0], left[1])</span></span>
<span class="line"><span>                + Math.max(right[0], right[1]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return new int[]{not_rob, rob};</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>时间复杂度 O(N)，空间复杂度只有递归函数堆栈所需的空间，不需要备忘录的额外空间。</p><p>你看他和我们的思路不一样，修改了递归函数的定义，略微修改了思路，使得逻辑自洽，依然得到了正确的答案，而且代码更漂亮。这就是我们前文 <a href="http://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&amp;mid=2247484469&amp;idx=1&amp;sn=e8d321c8ad62483874a997e9dd72da8f&amp;chksm=9bd7fa3daca0732b316aa0afa58e70357e1cb7ab1fe0855d06bc4a852abb1b434c01c7dd19d6&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">动态规划：不同的定义产生不同的解法</a> 所说过的动态规划问题的一个特性。</p><p>实际上，这个解法比我们的解法运行时间要快得多，虽然算法分析层面时间复杂度是相同的。原因在于此解法没有使用额外的备忘录，减少了数据操作的复杂性，所以实际运行效率会快。</p><p>这样，打家劫舍系列问题就全部解决了，其实也没多难吧？</p>`,46),m=[b];function o(u,d,h,g,_,f){return a(),n("div",null,m)}const x=s(t,[["render",o]]);export{k as __pageData,x as default};
