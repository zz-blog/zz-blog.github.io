import{_ as a,c as e,m as s,a as p,t as l,a5 as r,o as i}from"./chunks/framework.DwbewbAn.js";const g=JSON.parse('{"title":"爱吃香蕉的珂珂 [未完成]","description":"","frontmatter":{"title":"爱吃香蕉的珂珂 [未完成]"},"headers":[],"relativePath":"doc/算法/二分查找/爱吃香蕉的狒狒.md","filePath":"packages/doc/src/算法/二分查找/爱吃香蕉的狒狒.md","lastUpdated":1709220761000}'),t={name:"doc/算法/二分查找/爱吃香蕉的狒狒.md"},c={id:"frontmatter-title",tabindex:"-1"},b=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),o=r(`<ul><li><a href="https://leetcode.cn/problems/koko-eating-bananas/description/" target="_blank" rel="noreferrer">中 leetcode</a></li><li><a href="https://leetcode.com/problems/koko-eating-bananas/description/" target="_blank" rel="noreferrer">外 leetcode</a></li></ul><h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span> </span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例 1：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：piles = [3,6,7,11], h = 8</span></span>
<span class="line"><span>输出：4</span></span>
<span class="line"><span>示例 2：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：piles = [30,11,23,4,20], h = 5</span></span>
<span class="line"><span>输出：30</span></span>
<span class="line"><span>示例 3：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：piles = [30,11,23,4,20], h = 6</span></span>
<span class="line"><span>输出：23</span></span>
<span class="line"><span> </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 &lt;= piles.length &lt;= 104</span></span>
<span class="line"><span>piles.length &lt;= h &lt;= 109</span></span>
<span class="line"><span>1 &lt;= piles[i] &lt;= 109</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h2>`,4);function m(n,d,u,h,_,k){return i(),e("div",null,[s("h1",c,[p(l(n.$frontmatter.title)+" ",1),b]),o])}const v=a(t,[["render",m]]);export{g as __pageData,v as default};
