import{_ as i,c as a,l as t,a as n,t as g,a4 as o,o as s}from"./chunks/framework.CzsDe1xi.js";const k=JSON.parse('{"title":"git知识点","description":"","frontmatter":{"title":"git知识点"},"headers":[],"relativePath":"doc/DevOps/Git/知识点.md","filePath":"packages/doc/src/DevOps/Git/知识点.md","lastUpdated":1715528341000}'),r={name:"doc/DevOps/Git/知识点.md"},c={id:"frontmatter-title",tabindex:"-1"},m=t("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),d=o(`<h2 id="version-查看git版本init-初始化版本库config-参数设置。常用参数-user-name-user-email-color-ui-alias-core-editor选项-system-global-空-local-查-list-l-e-打开配置文件-改-重新设置删-unsethelp-git帮助-help-查看命令的选项help-命令-打开帮助文件-查看命令的具体信息" tabindex="-1">version: 查看git版本 init:初始化版本库 config：参数设置。 常用参数：user.name user.email color.ui alias core.editor 选项：--system --global 空（--local） 查：--list -l -e(打开配置文件) 改：重新设置 删：--unset help:git帮助 --help 查看命令的选项 help 命令：打开帮助文件，查看命令的具体信息 <a class="header-anchor" href="#version-查看git版本init-初始化版本库config-参数设置。常用参数-user-name-user-email-color-ui-alias-core-editor选项-system-global-空-local-查-list-l-e-打开配置文件-改-重新设置删-unsethelp-git帮助-help-查看命令的选项help-命令-打开帮助文件-查看命令的具体信息" aria-label="Permalink to &quot;version: 查看git版本
init:初始化版本库
config：参数设置。
        常用参数：user.name  user.email color.ui alias core.editor
        选项：--system   --global  空（--local）
        查：--list -l -e(打开配置文件)
        改：重新设置
        删：--unset 
help:git帮助
     --help 查看命令的选项
     help 命令：打开帮助文件，查看命令的具体信息&quot;">​</a></h2><h1 id="add-文件名-把修改后的文件加入缓存-stage-status-查看状态-红字为修改但未缓存-绿字为修改且已缓存-都未提交到版本库commit-m-message-缓存中的内容提交到版本库-且留言messagelog-查看历史记录。-n-查看从最新开始的n条记录-pretty-oneline-以一行模式查看历史记录branch-查看分支-绿色为当前所在分支branch-分支名1-分支名2-在分支2的当前节点创建分支1checkout-分支名-切换到指定分支上rebase-分支名1-分支名2-把分支1合并到分支2上-以后会用专门命令-branch-分支名-d-删除指定分支-注意-注意-不要删除当前所在分支tag-查看有哪些标签tag-标签名-在当前节点创建标签branch-分支名-标签名-从指定标签处恢复分支archive-format-压缩格式-prefix-目录名-需发布的位置-压缩包文件名" tabindex="-1">add 文件名:把修改后的文件加入缓存（stage） status:查看状态，红字为修改但未缓存，绿字为修改且已缓存，都未提交到版本库 commit -m &quot;message&quot;:缓存中的内容提交到版本库，且留言message log:查看历史记录。 -n,查看从最新开始的n条记录； --pretty=oneline，以一行模式查看历史记录 branch:查看分支，绿色为当前所在分支 branch 分支名1 分支名2：在分支2的当前节点创建分支1 checkout 分支名：切换到指定分支上 rebase 分支名1 分支名2：把分支1合并到分支2上（以后会用专门命令） branch 分支名 -d：删除指定分支，注意-注意，不要删除当前所在分支 tag:查看有哪些标签 tag 标签名：在当前节点创建标签 branch 分支名 标签名：从指定标签处恢复分支 archive --format=压缩格式 --prefix=目录名/ 需发布的位置 &gt; 压缩包文件名 <a class="header-anchor" href="#add-文件名-把修改后的文件加入缓存-stage-status-查看状态-红字为修改但未缓存-绿字为修改且已缓存-都未提交到版本库commit-m-message-缓存中的内容提交到版本库-且留言messagelog-查看历史记录。-n-查看从最新开始的n条记录-pretty-oneline-以一行模式查看历史记录branch-查看分支-绿色为当前所在分支branch-分支名1-分支名2-在分支2的当前节点创建分支1checkout-分支名-切换到指定分支上rebase-分支名1-分支名2-把分支1合并到分支2上-以后会用专门命令-branch-分支名-d-删除指定分支-注意-注意-不要删除当前所在分支tag-查看有哪些标签tag-标签名-在当前节点创建标签branch-分支名-标签名-从指定标签处恢复分支archive-format-压缩格式-prefix-目录名-需发布的位置-压缩包文件名" aria-label="Permalink to &quot;add 文件名:把修改后的文件加入缓存（stage）
status:查看状态，红字为修改但未缓存，绿字为修改且已缓存，都未提交到版本库
commit -m &quot;message&quot;:缓存中的内容提交到版本库，且留言message
log:查看历史记录。
    -n,查看从最新开始的n条记录；
    --pretty=oneline，以一行模式查看历史记录
branch:查看分支，绿色为当前所在分支
branch 分支名1 分支名2：在分支2的当前节点创建分支1
checkout 分支名：切换到指定分支上
rebase 分支名1 分支名2：把分支1合并到分支2上（以后会用专门命令）
branch 分支名 -d：删除指定分支，注意-注意，不要删除当前所在分支
tag:查看有哪些标签
tag 标签名：在当前节点创建标签
branch 分支名 标签名：从指定标签处恢复分支
archive --format=压缩格式 --prefix=目录名/ 需发布的位置 &gt; 压缩包文件名&quot;">​</a></h1><h1 id="add-把工作目录中的变化加入缓存区-i-互动模式-1-status查看缓存区状态-stage已缓存-unstage未缓存-2-update把已追踪的文件变化加入缓存区-3-revert把缓存区内容清除-4-add-untracked把未追踪文件加入缓存区-5-patch比较工作目录和版本库异同-进而选择如何处理y加入-n不加入-q退出-6-diff比较缓存区和版本库的异同-a-把工作目录中的所有变化-都加入缓存区-p-等同于-i中的-5-diff-1、不加参数-比较工作目录和缓存2、-cached-比较版本库和缓存3、head-比较版本库和工作目录提交方法-1、git-add-文件名-git-commit-m2、git-commit-a-m-工作目录中的所有变化都一次提交到版本库-3、git-commit-m-文件名-把指定文件提交到版本库-2和3的方法都需要文件已经被追踪撤销提交-git-reset-hard-soft-head-nhard-提交和提交的变化都撤销soft-只撤销提交-变化保留在缓存区n-指定撤销的步数文件改名-git-mv-旧文件名-新文件名-新文件会加入缓存区-需要一次提交-文件删除-git-rm-文件名文件恢复-git-checkout-版本号-再创建分支文件忽略-1、设置-git-info-exclude-添加欲忽略的文件名-不会被扩散2、创建-gitignore-添加欲忽略的文件名-可以扩散3、设置core-excludesfile-a文件名-添加欲忽略的文件名到a中" tabindex="-1">add:把工作目录中的变化加入缓存区 -i：互动模式（1）status查看缓存区状态，stage已缓存，unstage未缓存 （2）update把已追踪的文件变化加入缓存区 （3）revert把缓存区内容清除 （4）add untracked把未追踪文件加入缓存区 （5）patch比较工作目录和版本库异同，进而选择如何处理 y加入,n不加入,q退出 （6）diff比较缓存区和版本库的异同 -A：把工作目录中的所有变化，都加入缓存区 -p:等同于-i中的（5） diff: 1、不加参数，比较工作目录和缓存 2、--cached，比较版本库和缓存 3、head，比较版本库和工作目录 提交方法：1、git add 文件名/git commit -m 2、git commit -a -m(工作目录中的所有变化都一次提交到版本库) 3、git commit -m 文件名（把指定文件提交到版本库） 2和3的方法都需要文件已经被追踪 撤销提交：git reset --hard(soft) head~n hard,提交和提交的变化都撤销 soft，只撤销提交，变化保留在缓存区 n,指定撤销的步数 文件改名：git mv 旧文件名 新文件名（新文件会加入缓存区，需要一次提交） 文件删除：git rm 文件名 文件恢复：git checkout 版本号，再创建分支 文件忽略：1、设置.git/info/exclude，添加欲忽略的文件名，不会被扩散 2、创建.gitignore，添加欲忽略的文件名，可以扩散 3、设置core.excludesfile “A文件名”，添加欲忽略的文件名到A中 <a class="header-anchor" href="#add-把工作目录中的变化加入缓存区-i-互动模式-1-status查看缓存区状态-stage已缓存-unstage未缓存-2-update把已追踪的文件变化加入缓存区-3-revert把缓存区内容清除-4-add-untracked把未追踪文件加入缓存区-5-patch比较工作目录和版本库异同-进而选择如何处理y加入-n不加入-q退出-6-diff比较缓存区和版本库的异同-a-把工作目录中的所有变化-都加入缓存区-p-等同于-i中的-5-diff-1、不加参数-比较工作目录和缓存2、-cached-比较版本库和缓存3、head-比较版本库和工作目录提交方法-1、git-add-文件名-git-commit-m2、git-commit-a-m-工作目录中的所有变化都一次提交到版本库-3、git-commit-m-文件名-把指定文件提交到版本库-2和3的方法都需要文件已经被追踪撤销提交-git-reset-hard-soft-head-nhard-提交和提交的变化都撤销soft-只撤销提交-变化保留在缓存区n-指定撤销的步数文件改名-git-mv-旧文件名-新文件名-新文件会加入缓存区-需要一次提交-文件删除-git-rm-文件名文件恢复-git-checkout-版本号-再创建分支文件忽略-1、设置-git-info-exclude-添加欲忽略的文件名-不会被扩散2、创建-gitignore-添加欲忽略的文件名-可以扩散3、设置core-excludesfile-a文件名-添加欲忽略的文件名到a中" aria-label="Permalink to &quot;add:把工作目录中的变化加入缓存区
    -i：互动模式（1）status查看缓存区状态，stage已缓存，unstage未缓存
		（2）update把已追踪的文件变化加入缓存区
		（3）revert把缓存区内容清除
		（4）add untracked把未追踪文件加入缓存区
		（5）patch比较工作目录和版本库异同，进而选择如何处理
                     y加入,n不加入,q退出
		（6）diff比较缓存区和版本库的异同
    -A：把工作目录中的所有变化，都加入缓存区
    -p:等同于-i中的（5）
diff:  1、不加参数，比较工作目录和缓存
       2、--cached，比较版本库和缓存
       3、head，比较版本库和工作目录
提交方法：1、git add 文件名/git commit -m
          2、git commit -a -m(工作目录中的所有变化都一次提交到版本库)
          3、git commit -m 文件名（把指定文件提交到版本库）
		2和3的方法都需要文件已经被追踪
撤销提交：git reset --hard(soft) head~n
          hard,提交和提交的变化都撤销
          soft，只撤销提交，变化保留在缓存区
          n,指定撤销的步数
文件改名：git mv 旧文件名 新文件名（新文件会加入缓存区，需要一次提交）
文件删除：git rm 文件名
文件恢复：git checkout 版本号，再创建分支
文件忽略：1、设置.git/info/exclude，添加欲忽略的文件名，不会被扩散
          2、创建.gitignore，添加欲忽略的文件名，可以扩散
          3、设置core.excludesfile “A文件名”，添加欲忽略的文件名到A中&quot;">​</a></h1><h1 id="创建分支-1、git-branch-分支名-在当前头指针处创建分支2、git-branch-分支名1-分支名2-在分支2处创建分支13、git-checkout-b-分支名1-分支名2-创建并切换到新分支14、git-branch-分支名-版本号-在指定节点处创建新分支查看分支-git-branch-绿色为当前所在分支分支改名-git-branch-m-m-旧分支名-新分支名-m-改为版本库中没有的分支名-m-可以改为版本库中已有的分支名-已有分支会被覆盖-慎用-删除分支-git-branch-d-d-分支名不能删除头指针所在分支-d-删除已完全合并过的分支-d-不论是否合并过-都可以删除分支恢复分支-git-branch-分支名-版本号合并分支-1、直接合并-git-merge-被合并分支名-合并到当前分支-2、压合合并-git-merge-squash-被合并分支名-合并到当前分支-3、拣选合并-git-cherry-pick-版本号-n-没有-n-合并指定版本号节点-n-多次拣选指定节点到缓存区-然后再提交" tabindex="-1">创建分支：1、git branch 分支名 在当前头指针处创建分支 2、git branch 分支名1 分支名2 在分支2处创建分支1 3、git checkout -b 分支名1 分支名2 创建并切换到新分支1 4、git branch 分支名 版本号 在指定节点处创建新分支 查看分支：git branch，绿色为当前所在分支 分支改名：git branch -m（M） 旧分支名 新分支名 -m:改为版本库中没有的分支名； -M:可以改为版本库中已有的分支名，已有分支会被覆盖，慎用！ 删除分支：git branch -d(D) 分支名 不能删除头指针所在分支 -d:删除已完全合并过的分支 -D:不论是否合并过，都可以删除分支 恢复分支：git branch 分支名 版本号 合并分支：1、直接合并：git merge 被合并分支名（合并到当前分支） 2、压合合并：git merge --squash 被合并分支名 （合并到当前分支） 3、拣选合并：git cherry-pick 版本号 （-n） 没有-n,合并指定版本号节点 -n,多次拣选指定节点到缓存区，然后再提交 <a class="header-anchor" href="#创建分支-1、git-branch-分支名-在当前头指针处创建分支2、git-branch-分支名1-分支名2-在分支2处创建分支13、git-checkout-b-分支名1-分支名2-创建并切换到新分支14、git-branch-分支名-版本号-在指定节点处创建新分支查看分支-git-branch-绿色为当前所在分支分支改名-git-branch-m-m-旧分支名-新分支名-m-改为版本库中没有的分支名-m-可以改为版本库中已有的分支名-已有分支会被覆盖-慎用-删除分支-git-branch-d-d-分支名不能删除头指针所在分支-d-删除已完全合并过的分支-d-不论是否合并过-都可以删除分支恢复分支-git-branch-分支名-版本号合并分支-1、直接合并-git-merge-被合并分支名-合并到当前分支-2、压合合并-git-merge-squash-被合并分支名-合并到当前分支-3、拣选合并-git-cherry-pick-版本号-n-没有-n-合并指定版本号节点-n-多次拣选指定节点到缓存区-然后再提交" aria-label="Permalink to &quot;创建分支：1、git branch 分支名  在当前头指针处创建分支
          2、git branch 分支名1 分支名2  在分支2处创建分支1
          3、git checkout -b 分支名1 分支名2 创建并切换到新分支1
          4、git branch 分支名 版本号 在指定节点处创建新分支
查看分支：git branch，绿色为当前所在分支
分支改名：git branch -m（M） 旧分支名 新分支名
          -m:改为版本库中没有的分支名；
          -M:可以改为版本库中已有的分支名，已有分支会被覆盖，慎用！
删除分支：git branch -d(D) 分支名
           不能删除头指针所在分支
          -d:删除已完全合并过的分支
          -D:不论是否合并过，都可以删除分支
恢复分支：git branch 分支名 版本号
合并分支：1、直接合并：git merge 被合并分支名（合并到当前分支）
          2、压合合并：git merge --squash 被合并分支名 （合并到当前分支）
          3、拣选合并：git cherry-pick 版本号 （-n）
          没有-n,合并指定版本号节点
          -n,多次拣选指定节点到缓存区，然后再提交&quot;">​</a></h1><h1 id="一、查看git日志1、显示最近的n次提交-git-log-n2、显示日志的格式-git-log-pretty-onlinegit-log-pretty-format-可以通过git-help-log查看-二、指定日志显示范围1、显示日志的时间范围-git-log-since-after-2022-3-18-git-log-until-before-2022-3-18-2、显示的版本范围-git-log-老版本号-新版本号-从老版本号-1显示到新版本号之间的日志-git-log-版本号-从版本号-1显示到最后一次提交-git-log-版本号-从初次提交显示到版本号-3、版本号操作符-n-表示从当前版本回退n个版本-每一个-表示回退一个版本三、比较差异1、比较所有被追踪文件在指定版本和最新版本之间的差异-git-diff-版本号2、比较所有被追踪文件在指定版本1和指定版本2之间的差异-git-diff-版本号1-版本号23、依次比较历史上所有版本之间的差异git-log-p四、跟踪内容1、查看指定文件中每一行的提交信息-git-blame-文件名2、查看指定文件中指定行的提交信息-git-blame-l-行号-行号-文件名git-blame-l-行号-n-文件名3、查看指定文件中的复制信息-git-blame-文件名-m-复制信息要求三行或以上4、跨文件-查看指定文件中的复制信息-git-blame-c-c-文件名5、显示文件间复制历史记录-git-log-c-c-p" tabindex="-1">一、查看git日志 1、显示最近的N次提交：git log -N 2、显示日志的格式：git log --pretty=online git log --pretty=format:&quot;%**&quot; （%**可以通过git help log查看） 二、指定日志显示范围 1、显示日志的时间范围：git log --since(after)=&quot;2022.3.18&quot; git log --until(before)=&quot;2022.3.18&quot; 2、显示的版本范围：git log 老版本号..新版本号（从老版本号+1显示到新版本号之间的日志） git log 版本号.. （从版本号+1显示到最后一次提交） git log 版本号 （从初次提交显示到版本号） 3、版本号操作符：~N：表示从当前版本回退N个版本 ^:每一个^表示回退一个版本 三、比较差异 1、比较所有被追踪文件在指定版本和最新版本之间的差异： git diff 版本号 2、比较所有被追踪文件在指定版本1和指定版本2之间的差异： git diff 版本号1..版本号2 3、依次比较历史上所有版本之间的差异 git log -p 四、跟踪内容 1、查看指定文件中每一行的提交信息：git blame 文件名 2、查看指定文件中指定行的提交信息：git blame -L 行号，行号 文件名 git blame -L 行号，+/-n 文件名 3、查看指定文件中的复制信息：git blame 文件名 -M，复制信息要求三行或以上 4、跨文件，查看指定文件中的复制信息：git blame -C -C 文件名 5、显示文件间复制历史记录：git log -C -C -p <a class="header-anchor" href="#一、查看git日志1、显示最近的n次提交-git-log-n2、显示日志的格式-git-log-pretty-onlinegit-log-pretty-format-可以通过git-help-log查看-二、指定日志显示范围1、显示日志的时间范围-git-log-since-after-2022-3-18-git-log-until-before-2022-3-18-2、显示的版本范围-git-log-老版本号-新版本号-从老版本号-1显示到新版本号之间的日志-git-log-版本号-从版本号-1显示到最后一次提交-git-log-版本号-从初次提交显示到版本号-3、版本号操作符-n-表示从当前版本回退n个版本-每一个-表示回退一个版本三、比较差异1、比较所有被追踪文件在指定版本和最新版本之间的差异-git-diff-版本号2、比较所有被追踪文件在指定版本1和指定版本2之间的差异-git-diff-版本号1-版本号23、依次比较历史上所有版本之间的差异git-log-p四、跟踪内容1、查看指定文件中每一行的提交信息-git-blame-文件名2、查看指定文件中指定行的提交信息-git-blame-l-行号-行号-文件名git-blame-l-行号-n-文件名3、查看指定文件中的复制信息-git-blame-文件名-m-复制信息要求三行或以上4、跨文件-查看指定文件中的复制信息-git-blame-c-c-文件名5、显示文件间复制历史记录-git-log-c-c-p" aria-label="Permalink to &quot;一、查看git日志
1、显示最近的N次提交：git log -N
2、显示日志的格式：git log --pretty=online
                  git log --pretty=format:&quot;%**&quot; （%**可以通过git help log查看）
二、指定日志显示范围
1、显示日志的时间范围：git log --since(after)=&quot;2022.3.18&quot;
                      git log --until(before)=&quot;2022.3.18&quot;
2、显示的版本范围：git log 老版本号..新版本号（从老版本号+1显示到新版本号之间的日志）
                  git log 版本号..         （从版本号+1显示到最后一次提交）
                  git log 版本号           （从初次提交显示到版本号）
3、版本号操作符：~N：表示从当前版本回退N个版本
                 ^:每一个^表示回退一个版本
三、比较差异
1、比较所有被追踪文件在指定版本和最新版本之间的差异：
                   git diff 版本号
2、比较所有被追踪文件在指定版本1和指定版本2之间的差异：
                   git diff 版本号1..版本号2
3、依次比较历史上所有版本之间的差异
                   git log -p
四、跟踪内容
1、查看指定文件中每一行的提交信息：git blame 文件名
2、查看指定文件中指定行的提交信息：git blame -L 行号，行号 文件名
                                  git blame -L 行号，+/-n 文件名
3、查看指定文件中的复制信息：git blame 文件名 -M，复制信息要求三行或以上
4、跨文件，查看指定文件中的复制信息：git blame -C -C 文件名
5、显示文件间复制历史记录：git log -C -C -p&quot;">​</a></h1><h1 id="五、修改历史记录1、增补提交-git-commit-m-message-amend-修改最会一次提交的留言为messagegit-commit-c-版本号-amend-修改最会一次提交的留言为指定版本号的提交留言git-commit-c-版本号-amend-以指定版本号的留言为模板-启动编辑器-修改最后一次留言增补提交时-按照文件提交的三种方式进行-则既修改留言又提交文件。2、反转提交-git-revert-版本号-n-数字-no-edit-通过创建一个新提交来抵消历史上的某次提交反转提交不能用-m留言-使用文本编辑器编辑默认留言-也可以直接使用默认留言-no-edit-暂存多次反转-一起提交。-n-连续多次反转相邻的提交-数字-避免翻转时出现冲突-最好按顺序反转-出现冲突时-可用-add-冲突文件名-消解3、穿越历史-git-rebase-i-版本号-进入rebase互动模式-在文本编辑器中旧记录在上显示从版本号-1到最新的所有历史记录按照每一记录前的命令-pick-reword-squash-edit-从版本号-1到现在-重构历史记录修改历史留言-互动模式中-在要修改留言的记录前-使用reword-在之后弹出的编辑器中编辑新留言删除历史记录-互动模式中-删掉欲删除的历史记录行改变历史记录顺序-互动模式中-修改命令为pick的历史记录行顺序增加历史记录-互动模式中-插入命令为pick的历史记录行-必须存在的历史记录-有正确的版本号-合并历史记录-在欲合并的历史记录前使用squash命令-则该记录会和上一条记录合并-且弹出修改留言窗口拆分历史记录-互动模式中-在要拆分的记录前-使用edit-在回到历史版本后-使用reset-soft撤销一步-然后分步提交两次git-rebase-continue继续重构历史记录-也可-abort放弃此次rebase" tabindex="-1">五、修改历史记录 1、增补提交：git commit -m &quot;message&quot; --amend 修改最会一次提交的留言为message git commit -C 版本号 --amend 修改最会一次提交的留言为指定版本号的提交留言 git commit -c 版本号 --amend 以指定版本号的留言为模板，启动编辑器，修改最后一次留言 增补提交时，按照文件提交的三种方式进行，则既修改留言又提交文件。 2、反转提交：git revert 版本号 -n -数字 --no-edit 通过创建一个新提交来抵消历史上的某次提交 反转提交不能用-m留言，使用文本编辑器编辑默认留言，也可以直接使用默认留言 （--no-edit） 暂存多次反转，一起提交。（-n） 连续多次反转相邻的提交 （-数字） 避免翻转时出现冲突，最好按顺序反转，出现冲突时，可用“add 冲突文件名”消解 3、穿越历史：git rebase -i 版本号 进入rebase互动模式,在文本编辑器中旧记录在上显示从版本号+1到最新的所有历史记录 按照每一记录前的命令（pick,reword,squash,edit）从版本号+1到现在，重构历史记录 修改历史留言：互动模式中，在要修改留言的记录前，使用reword，在之后弹出的编辑器中编辑新留言 删除历史记录：互动模式中，删掉欲删除的历史记录行 改变历史记录顺序：互动模式中，修改命令为pick的历史记录行顺序 增加历史记录：互动模式中，插入命令为pick的历史记录行 （必须存在的历史记录，有正确的版本号） 合并历史记录：在欲合并的历史记录前使用squash命令，则该记录会和上一条记录合并，且弹出修改留言窗口 拆分历史记录：互动模式中，在要拆分的记录前，使用edit， 在回到历史版本后，使用reset --soft撤销一步，然后分步提交两次 git rebase --continue继续重构历史记录，也可--abort放弃此次rebase. <a class="header-anchor" href="#五、修改历史记录1、增补提交-git-commit-m-message-amend-修改最会一次提交的留言为messagegit-commit-c-版本号-amend-修改最会一次提交的留言为指定版本号的提交留言git-commit-c-版本号-amend-以指定版本号的留言为模板-启动编辑器-修改最后一次留言增补提交时-按照文件提交的三种方式进行-则既修改留言又提交文件。2、反转提交-git-revert-版本号-n-数字-no-edit-通过创建一个新提交来抵消历史上的某次提交反转提交不能用-m留言-使用文本编辑器编辑默认留言-也可以直接使用默认留言-no-edit-暂存多次反转-一起提交。-n-连续多次反转相邻的提交-数字-避免翻转时出现冲突-最好按顺序反转-出现冲突时-可用-add-冲突文件名-消解3、穿越历史-git-rebase-i-版本号-进入rebase互动模式-在文本编辑器中旧记录在上显示从版本号-1到最新的所有历史记录按照每一记录前的命令-pick-reword-squash-edit-从版本号-1到现在-重构历史记录修改历史留言-互动模式中-在要修改留言的记录前-使用reword-在之后弹出的编辑器中编辑新留言删除历史记录-互动模式中-删掉欲删除的历史记录行改变历史记录顺序-互动模式中-修改命令为pick的历史记录行顺序增加历史记录-互动模式中-插入命令为pick的历史记录行-必须存在的历史记录-有正确的版本号-合并历史记录-在欲合并的历史记录前使用squash命令-则该记录会和上一条记录合并-且弹出修改留言窗口拆分历史记录-互动模式中-在要拆分的记录前-使用edit-在回到历史版本后-使用reset-soft撤销一步-然后分步提交两次git-rebase-continue继续重构历史记录-也可-abort放弃此次rebase" aria-label="Permalink to &quot;五、修改历史记录
1、增补提交：git commit -m &quot;message&quot; --amend     修改最会一次提交的留言为message
             git commit -C 版本号 --amend        修改最会一次提交的留言为指定版本号的提交留言
	    git commit -c 版本号 --amend         以指定版本号的留言为模板，启动编辑器，修改最后一次留言
            增补提交时，按照文件提交的三种方式进行，则既修改留言又提交文件。
2、反转提交：git revert 版本号 -n -数字 --no-edit                    通过创建一个新提交来抵消历史上的某次提交
            反转提交不能用-m留言，使用文本编辑器编辑默认留言，也可以直接使用默认留言 （--no-edit）
            暂存多次反转，一起提交。（-n）
            连续多次反转相邻的提交   （-数字）
            避免翻转时出现冲突，最好按顺序反转，出现冲突时，可用“add 冲突文件名”消解 
3、穿越历史：git rebase -i 版本号  进入rebase互动模式,在文本编辑器中旧记录在上显示从版本号+1到最新的所有历史记录
                                  按照每一记录前的命令（pick,reword,squash,edit）从版本号+1到现在，重构历史记录
            修改历史留言：互动模式中，在要修改留言的记录前，使用reword，在之后弹出的编辑器中编辑新留言
            删除历史记录：互动模式中，删掉欲删除的历史记录行
            改变历史记录顺序：互动模式中，修改命令为pick的历史记录行顺序
            增加历史记录：互动模式中，插入命令为pick的历史记录行 （必须存在的历史记录，有正确的版本号）
            合并历史记录：在欲合并的历史记录前使用squash命令，则该记录会和上一条记录合并，且弹出修改留言窗口
            拆分历史记录：互动模式中，在要拆分的记录前，使用edit，
                          在回到历史版本后，使用reset --soft撤销一步，然后分步提交两次
                          git rebase --continue继续重构历史记录，也可--abort放弃此次rebase.&quot;">​</a></h1><h2 id="一、保存工作目录和缓存区1、git-stash-save-message-保存当前的目录-已追踪-和缓存区-若不加save-则使用最后一次commit的留言保存若工作目录或缓存区没有变化-则不能保存保存后-工作目录和缓存区都变成没有变化2、git-stash-list-列出当前各个保存的列表3、git-stash-show-保存号-显示某个保存的变化情况若不加保存号-则显示最后一次保存的变化4、git-statsh-apply-index-保存号-工作目录恢复到某个保存状态-对应的保存不删除5、git-statsh-pop-index-保存号-工作目录恢复到某个保存状态-对应的保存会删除-index参数决定是否恢复缓存区恢复后是将保存的状态叠加到现在commit状态若工作目录中有未commit的变化-则不能恢复6、git-stash-drop-保存号-删除某次保存若不加保存号-则删除最后一次保存7、git-stash-clear-删除全部保存" tabindex="-1">一、保存工作目录和缓存区 1、git stash save &quot;message&quot; 保存当前的目录（已追踪）和缓存区, 若不加save，则使用最后一次commit的留言保存 若工作目录或缓存区没有变化，则不能保存 保存后，工作目录和缓存区都变成没有变化 2、git stash list 列出当前各个保存的列表 3、git stash show 保存号 显示某个保存的变化情况 若不加保存号，则显示最后一次保存的变化 4、git statsh apply (--index) 保存号 工作目录恢复到某个保存状态，对应的保存不删除 5、git statsh pop (--index) 保存号 工作目录恢复到某个保存状态，对应的保存会删除 --index参数决定是否恢复缓存区 恢复后是将保存的状态叠加到现在commit状态 若工作目录中有未commit的变化，则不能恢复 6、git stash drop 保存号 删除某次保存 若不加保存号，则删除最后一次保存 7、git stash clear 删除全部保存 <a class="header-anchor" href="#一、保存工作目录和缓存区1、git-stash-save-message-保存当前的目录-已追踪-和缓存区-若不加save-则使用最后一次commit的留言保存若工作目录或缓存区没有变化-则不能保存保存后-工作目录和缓存区都变成没有变化2、git-stash-list-列出当前各个保存的列表3、git-stash-show-保存号-显示某个保存的变化情况若不加保存号-则显示最后一次保存的变化4、git-statsh-apply-index-保存号-工作目录恢复到某个保存状态-对应的保存不删除5、git-statsh-pop-index-保存号-工作目录恢复到某个保存状态-对应的保存会删除-index参数决定是否恢复缓存区恢复后是将保存的状态叠加到现在commit状态若工作目录中有未commit的变化-则不能恢复6、git-stash-drop-保存号-删除某次保存若不加保存号-则删除最后一次保存7、git-stash-clear-删除全部保存" aria-label="Permalink to &quot;一、保存工作目录和缓存区 
1、git stash save &quot;message&quot;           保存当前的目录（已追踪）和缓存区,
                                      若不加save，则使用最后一次commit的留言保存
                             	      若工作目录或缓存区没有变化，则不能保存
                                      保存后，工作目录和缓存区都变成没有变化
2、git stash list                     列出当前各个保存的列表
3、git stash show 保存号              显示某个保存的变化情况
                                      若不加保存号，则显示最后一次保存的变化
4、git statsh apply (--index) 保存号  工作目录恢复到某个保存状态，对应的保存不删除 
5、git statsh pop   (--index) 保存号  工作目录恢复到某个保存状态，对应的保存会删除
                                      --index参数决定是否恢复缓存区
                                      恢复后是将保存的状态叠加到现在commit状态
                                      若工作目录中有未commit的变化，则不能恢复
6、git stash drop 保存号               删除某次保存
                                      若不加保存号，则删除最后一次保存 
7、git stash clear                     删除全部保存&quot;">​</a></h2><p>一、git命令扩展 1、git log --stat 在显示历史记录的同时，给出每次提交相对上次提交的变化统计信息 2、git diff --stat 在显示版本间差异的同时，给出的差异的统计信息 3、git log --graph 以图形的方式，显示分支上带合并过程的历史记录 若进行过rebase -i修改过历史，则不再算作合并过程 4、git reset 文件名 把指定文件从缓存区撤出，若不加文件名，则清空缓存区 5、git status -s 以简略模式显示工作目录状态 红M：已追踪，未缓存 绿M：已追踪，已缓存 绿A：未追踪，已缓存 红??：未追踪，未缓存 6、git clean [-n][-f][-d][-x][-X] -n：显示将要被删除的未追踪文件列表 -f：删除未追踪、未忽略的文件，是否需要加-f，可以在config参数里设置 -d：也删除包含未追踪文件的目录 -x：也删除被忽略的文件 -X：只删除被忽略的文件 7、git gc 压缩整理版本库，缩小版本库占用空间，提高检索效率 8、git reflog 显示head在历史上的变化过程</p>`,8);function l(e,h,u,b,p,f){return s(),a("div",null,[t("h1",c,[n(g(e.$frontmatter.title)+" ",1),m]),d])}const x=i(r,[["render",l]]);export{k as __pageData,x as default};
