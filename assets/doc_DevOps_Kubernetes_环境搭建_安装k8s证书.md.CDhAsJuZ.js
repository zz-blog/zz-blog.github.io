import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.CzsDe1xi.js";const g=JSON.parse('{"title":"安装k8s证书","description":"","frontmatter":{},"headers":[],"relativePath":"doc/DevOps/Kubernetes/环境搭建/安装k8s证书.md","filePath":"packages/doc/src/DevOps/Kubernetes/环境搭建/安装k8s证书.md","lastUpdated":1702458087000}'),n={name:"doc/DevOps/Kubernetes/环境搭建/安装k8s证书.md"},l=e(`<h1 id="安装k8s证书" tabindex="-1">安装k8s证书 <a class="header-anchor" href="#安装k8s证书" aria-label="Permalink to &quot;安装k8s证书&quot;">​</a></h1><ul><li><a href="https://blog.csdn.net/weixin_54104864/article/details/131228589" target="_blank" rel="noreferrer">参考网址</a></li></ul><p>检查证书</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubeadm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> certs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> check-expiration</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubeadm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config=kubeadm.yaml</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubeadm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> certs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> renew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config=kubeadm.yaml</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kube-apiserver</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kube-controller-manager</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kube-scheduler</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其他节点更新</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>kubeadm upgrade node experimental-control-plane</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="完成" tabindex="-1">完成 <a class="header-anchor" href="#完成" aria-label="Permalink to &quot;完成&quot;">​</a></h2><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         STATUS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ROLES</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           AGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     VERSION</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">k8s-master</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Ready</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   control-plane</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   27m4s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      v1.28.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">k8s-node1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Ready</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">non</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          19m12s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     v1.28.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">k8s-node2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Ready</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">non</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          15m35s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     v1.28.2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,11),t=[l];function p(h,k,r,d,c,F){return a(),i("div",null,t)}const u=s(n,[["render",p]]);export{g as __pageData,u as default};
