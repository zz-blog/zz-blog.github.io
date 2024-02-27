import{_ as a,c as e,m as s,a as p,t as l,U as r,o as t}from"./chunks/framework.9QHaLlVJ.js";const k=JSON.parse('{"title":"搜索插入位置","description":"","frontmatter":{"title":"搜索插入位置"},"headers":[],"relativePath":"doc/算法/二分查找/搜索插入位置.md","filePath":"packages/doc/src/算法/二分查找/搜索插入位置.md","lastUpdated":1705929298000}'),i={name:"doc/算法/二分查找/搜索插入位置.md"},c={id:"frontmatter-title",tabindex:"-1"},o=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),b=r(`<ul><li><a href="https://leetcode.cn/problems/search-insert-position/description/" target="_blank" rel="noreferrer">中 leetcode</a></li><li><a href="https://leetcode.com/problems/search-insert-position/description/" target="_blank" rel="noreferrer">外 leetcode</a></li></ul><h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请必须使用时间复杂度为 O(log n) 的算法。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例 1:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入: nums = [1,3,5,6], target = 5</span></span>
<span class="line"><span>输出: 2</span></span>
<span class="line"><span>示例 2:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入: nums = [1,3,5,6], target = 2</span></span>
<span class="line"><span>输出: 1</span></span>
<span class="line"><span>示例 3:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入: nums = [1,3,5,6], target = 7</span></span>
<span class="line"><span>输出: 4</span></span>
<span class="line"><span> </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 &lt;= nums.length &lt;= 104</span></span>
<span class="line"><span>-104 &lt;= nums[i] &lt;= 104</span></span>
<span class="line"><span>nums 为 无重复元素 的 升序 排列数组</span></span>
<span class="line"><span>-104 &lt;= target &lt;= 104</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h2><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2>`,5);function m(n,d,u,h,_,f){return t(),e("div",null,[s("h1",c,[p(l(n.$frontmatter.title)+" ",1),o]),b])}const v=a(i,[["render",m]]);export{k as __pageData,v as default};
