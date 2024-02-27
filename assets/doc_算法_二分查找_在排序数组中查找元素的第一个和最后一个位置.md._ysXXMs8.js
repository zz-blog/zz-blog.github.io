import{_ as a,c as e,m as s,a as p,t as l,U as r,o as t}from"./chunks/framework.9QHaLlVJ.js";const k=JSON.parse('{"title":"在排序数组中查找元素的第一个和最后一个位置","description":"","frontmatter":{"title":"在排序数组中查找元素的第一个和最后一个位置"},"headers":[],"relativePath":"doc/算法/二分查找/在排序数组中查找元素的第一个和最后一个位置.md","filePath":"packages/doc/src/算法/二分查找/在排序数组中查找元素的第一个和最后一个位置.md","lastUpdated":1705929298000}'),i={name:"doc/算法/二分查找/在排序数组中查找元素的第一个和最后一个位置.md"},c={id:"frontmatter-title",tabindex:"-1"},o=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),b=r(`<ul><li><a href="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/" target="_blank" rel="noreferrer">中 leetcode</a></li><li><a href="https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/" target="_blank" rel="noreferrer">外 leetcode</a></li></ul><h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果数组中不存在目标值 target，返回 [-1, -1]。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例 1：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：nums = [5,7,7,8,8,10], target = 8</span></span>
<span class="line"><span>输出：[3,4]</span></span>
<span class="line"><span>示例 2：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：nums = [5,7,7,8,8,10], target = 6</span></span>
<span class="line"><span>输出：[-1,-1]</span></span>
<span class="line"><span>示例 3：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：nums = [], target = 0</span></span>
<span class="line"><span>输出：[-1,-1]</span></span>
<span class="line"><span> </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>0 &lt;= nums.length &lt;= 105</span></span>
<span class="line"><span>-109 &lt;= nums[i] &lt;= 109</span></span>
<span class="line"><span>nums 是一个非递减数组</span></span>
<span class="line"><span>-109 &lt;= target &lt;= 109</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>已知结论：</p><ul><li>数组中有重复元素</li><li>非递减，整体递增，中间有重复元素</li></ul><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h2><p>相比 搜索旋转排序数组 题目，只是多了重复元素，使用相同的解法完全没问题，这道题目意义在于能否尽量减少比较次数。</p><p>所以精髓在于优先通过重复元素缩小查找区间，其余逻辑不变。</p><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,10);function m(n,d,u,_,h,f){return t(),e("div",null,[s("h1",c,[p(l(n.$frontmatter.title)+" ",1),o]),b])}const x=a(i,[["render",m]]);export{k as __pageData,x as default};
