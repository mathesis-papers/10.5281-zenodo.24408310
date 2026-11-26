# 分数怎样变成整数：Hanna 的 A181074 猜想

设想你得到一条数列：$1,1,2,5,23,231,5405,\ldots$。如果只看前几项，它像一条普通的整数数列。但它的公式先除以 $n$，再取指数；而指数展开还要除以阶乘。Paul D. Hanna 在 2010 年 10 月 2 日的 [OEIS A181074](https://oeis.org/A181074) 评论中问：这些分母为什么总能消掉？Haobo Ma 和 Wenlin Zhang 的[原论文第 3 版](https://doi.org/10.5281/zenodo.24408311)证明它们确实会消掉，还找到了同样适用的更多公式。

::: {.slides src="seminar"}
:::

## 先看三次方

把 $x$ 当作记录次数的符号，而不是要代入的数。取 $x^3$ 的系数，只需要看次数不超过 $3$ 的项。先把 Hanna 公式中取指数前的级数写作 $L(x)$。次数是 $n+k$，所以在第三条斜线上，只有三对 $(n,k)$ 有贡献：

| $(n,k)$ | $\binom{n+k-1}{k}^{k+1}/n$ |
| --- | ---: |
| $(1,2)$ | $1$ |
| $(2,1)$ | $2$ |
| $(3,0)$ | $1/3$ |

前两条斜线给出 $1$ 和 $3/2$，所以 $L=x+\tfrac32 x^2+\tfrac{10}{3}x^3+\cdots$。由 $\exp L=1+L+L^2/2+L^3/6+\cdots$，三次项系数是 $10/3+3/2+1/6=5$。逐项算当然可以，但只算到第三次甚至第七十五次，都不能回答“每一项是否如此”。

::: {.film src="001-integer-series"}
:::

::: {.theorem #a181074-exact title="Hanna 的 A181074" lean="D5/S1/Recurrence/Algebraic/HannaA181074Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
令 $A(x)=\exp(\sum_{n\ge1,k\ge0}\binom{n+k-1}{k}^{k+1}x^{n+k}/n)$。对每个 $m\ge0$，$[x^m]A(x)$ 都是整数。这是原文推论 6 的 A181074 整数性分句。
:::

## 怎样让分母没有机会出现？

先看一个保证整数的乘积：$(1-x)^{-1}(1-x^2)^{-1}(1-x^3)^{-3}$，它的每个因子都有整数系数。前两个因子通过几何级数展开；第三个就是三个 $(1-x^3)^{-1}$ 相乘。乘积的前四项正好是 $1+x+2x^2+5x^3$。只要能把 Hanna 的指数改写成类似乘积，而且每个指数都是整数，所有次数就同时解决了。负的指数参数也没有问题：当 $h<0$ 时，$(1-x^j)^{-h}$ 是整数多项式。这个乘积叫欧拉乘积。

令 $g_m=m[x^m]L(x)$。这给出 $g_1=1,g_2=3,g_3=10$。若 $A=\prod_{j\ge1}(1-x^j)^{-h_j}$，取形式对数就得到 $g_m=\sum_{j\mid m}jh_j$。例如 $h_2=(3-1)/2=1$，$h_3=(10-1)/3=3$。要处理任意 $m$，用莫比乌斯反演：$mh_m=\sum_{d\mid m}\mu(d)g_{m/d}$。这里 $\mu(d)$ 在 $d$ 含平方素因子时为零，否则给不同素因子的每一种选择加上正负号。

::: {.remark #array-criterion title="整数指数从哪里来？（原文引理 4）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s4"}
对整数数组 $F(n,k)$（$n\ge1,k\ge0$），若 $n\mid kF(n,k)$，且每个素数 $p$ 都满足 $F(pn,pk)\equiv F(n,k)\pmod{p^{v_p(n)+1}}$，那么 $g_m=\sum_{n=1}^m (m/n)F(n,m-n)$ 为整数，并满足 $g_{pm}\equiv g_m\pmod{p^{v_p(m)+1}}$（Dold 同余）。上述莫比乌斯反演给出整数 $h_m$，指数级数等于欧拉乘积。

为什么？每项等于 $F+kF/n$。比较 $g_{pm}$ 与 $g_m$ 时，$p\nmid n$ 的项都被 $p^{v_p(m)+1}$ 整除；剩余项用 $n=pj$ 与旧斜线配对。相差的数组值含 $p^{v_p(j)+1}$，乘上 $m/j$ 后仍含 $p^{v_p(m)+1}$。最后若 $p^a\mid m$ 且 $a=v_p(m)$，反演和式中 $d$ 与 $pd$ 的两项相减，Dold 同余使差能被 $p^a$ 整除。每个素因子都如此，所以能除以整个 $m$。
:::

## 要比较的是数组，不是展开式

写 $c(n,k)=[t^k]U(t)^n$。对 $U=1+t$，从 $n$ 个因子各选 $1$ 或 $t$，得到 $c(n,k)=\binom nk$。对 $U=1+t+t^2+\cdots$，$c(n,k)$ 则数出把 $k$ 个相同物件分给 $n$ 个有标号盒子的方案，允许盒子为空，所以是 $\binom{n+k-1}{k}$。这就找回了表格中的数。

::: {.remark #coefficient-lift title="系数的整除与提升（原文引理 2）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s2"}
对任意 $U\in\mathbb Z[[t]]$、$n\ge1$、$k\ge0$，有 $n\mid kc(n,k)$；每个素数 $p$ 都满足 $c(pn,pk)\equiv c(n,k)\pmod{p^{v_p(n)+1}}$。第一条来自 $t(U^n)'=ntU^{n-1}U'$。第二条先用 $U(t)^p\equiv U(t^p)\pmod p$，再反复用二项式定理：原来相差 $p^j$ 的级数取 $p$ 次方后相差 $p^{j+1}$。若 $n=p^ab$ 且 $p\nmid b$，迭代 $a$ 次再取 $b$ 次方，比较 $t^{pk}$ 的系数即可。这一步连 $p=2$ 也适用。
:::

::: {.remark #powered-array title="指数随格点移动（原文引理 3）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s3"}
下述三种指数得到的 $F=c^E$ 都满足引理 4 的两条条件。关键是同时改变底数和指数：系数提升处理底数，接下来的证明处理指数。若只知道固定幂保持同余，还不够。
:::

::: {.theorem #general-integrality title="三类变化指数的整数性" status="written-proof" proof="pf-general" doi="10.5281/zenodo.24408311" source="Theorem 1" request="https://github.com/the-omega-institute/trureturing-requests/issues/572" mathesis="collected:hanna-a181074-binomial-exponentials:3:s1"}
设 $U\in1+t\mathbb Z[[t]]$，$c(n,k)=[t^k]U(t)^n$。若 $E=rk+s$（整数 $r,s\ge1$），或 $E=rn+sk+q$（整数 $r\ge1,s,q\ge0$），或 $E=n+k-1$，则 $\exp(\sum_{n\ge1,k\ge0}c(n,k)^{E(n,k)}x^{n+k}/n)\in1+x\mathbb Z[[x]]$。唯一可能的零指数出现在第三类的 $(1,0)$，其底数为 $1$。
:::

::: {.proof #pf-general}
正指数保留 $n\mid kc$；零指数时 $k=0$，整除仍成立。固定素数 $p$，记 $a=v_p(n)$。系数提升允许把新格点的底数换成旧底数 $c$（模 $p^{a+1}$）。若 $k=0$，两个底数都是 $1$；若 $k>0$ 且 $c=0$，两个指数都为正。其余情形分两类：

- $p\nmid c$：由 $n\mid kc$ 推出 $p^a\mid k$。指数差分别是 $(p-1)rk$、$(p-1)(rn+sk)$、$(p-1)(n+k)$，都包含欧拉定理所需的周期 $p^a(p-1)$。
- $p\mid c\ne0$：令 $b=v_p(c)$，则 $a\le v_p(k)+b$。在第一类，$E\ge k+1$ 且 $v_p(k)\le k-1$，所以 $Eb\ge a+1$；另两类在 $k>0$ 时有 $E\ge n\ge p^a\ge a+1$。两个幂都被 $p^{a+1}$ 整除，因为新指数不小于旧指数。

这样证明了所需的数组同余。按 $m=n+k$ 收集同次项，再用原文引理 4 的欧拉乘积论证即可。
:::

::: {.corollary #reflected-integrality title="从另一端量距离" status="written-proof" proof="pf-reflected" doi="10.5281/zenodo.24408311" source="Corollary 5" request="https://github.com/the-omega-institute/trureturing-requests/issues/573" mathesis="collected:hanna-a181074-binomial-exponentials:3:s5"}
若 $P\in1+t\mathbb Z[t]$ 的次数至多为整数 $d\ge1$，令 $c(n,k)=[t^k]P(t)^n$。对任意整数 $r,s\ge1$，$\exp(\sum_{n\ge1}\sum_{k=0}^{dn} c(n,k)^{r(dn-k)+s}x^{n+k}/n)$ 在 $1+x\mathbb Z[[x]]$ 中。
:::

::: {.proof #pf-reflected}
在 $k>dn$ 处把数组补零；缩放保持支集边界。令 $j=dn-k$，则 $n\mid jc$，因为 $n\mid kc$。系数提升后只需比较指数 $rpj+s$ 与 $rj+s$；若 $j=0$ 它们相同，若 $c=0$ 两个正幂都为零。对 $j>0$ 且 $p\nmid c$，$p^a\mid j$，所以指数差 $(p-1)rj$ 足够。对 $p\mid c\ne0$，$a\le v_p(j)+b$ 且 $(rj+s)b\ge(j+1)b\ge v_p(j)+b+1$，因此两个幂都消失于模 $p^{a+1}$。整除条件仍由 $n\mid kc$ 保证；用引理 4 完成证明。这也解释了为何次数上界不必等于实际次数。
:::

## 同一种方法能走多远？

::: {.remark #eight-exponentials title="八条指数数列（原文推论 6）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
广义二项式底数 $\binom{n+k-1}{k}$ 的指数 $k+1,n,n+k-1$ 对应 A181074、A181076、A181078。普通底数 $\binom nk$ 在 $0\le k\le n$ 的指数 $k+1,n-k+1,n+k,n+k+1,n$ 对应 A181070、A181080、A181082、A181084、A166894。它们的系数都是非负整数：这些特例取指数前的级数系数非负。任意有负系数的 $U$ 没有这个非负性保证。
:::

::: {.theorem #a181070-exact title="普通二项式级数 A181070" lean="D5/S1/Recurrence/Algebraic/HannaA181070Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
$\exp(\sum_{n\ge1}\sum_{k=0}^n\binom nk^{k+1}x^{n+k}/n)$ 的每个系数都是整数，包括常数项。这是原文推论 6 中 A181070 的整数性分句。
:::

::: {.theorem #a181080-exact title="反射二项式级数 A181080" lean="D5/S1/Recurrence/Algebraic/HannaA181080Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
$\exp(\sum_{n\ge1}\sum_{k=0}^n\binom nk^{n-k+1}x^{n+k}/n)$ 的每个系数都是整数，包括常数项。这是原文推论 6 中 A181080 的整数性分句。
:::

::: {.remark #eight-logarithms title="斜线和本身也有规律（原文推论 7）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s7"}
对前述八条数列依次取 $xA'/A$，得到 A181075、A181077、A181079、A181071、A181081、A181083、A181085、A166895。这些系数是整数且满足 Dold 同余。令 $n=m-k$：广义二项式情形从 $k=0$ 加到 $m-1$；普通二项式情形只加到 $\lfloor m/2\rfloor$。这也解释了为什么 A181079 配对 A181078，而不是有些交叉引用写的 A181076。
:::

::: {.corollary #bivariate-product title="保留两个坐标的欧拉乘积" status="written-proof" proof="pf-bivariate" doi="10.5281/zenodo.24408311" source="Corollary 9" request="https://github.com/the-omega-institute/trureturing-requests/issues/574" mathesis="collected:hanna-a181074-binomial-exponentials:3:s9"}
设整数数组 $F(n,k)$ 满足引理 4 的两条条件，且每行只有有限个非零项。则 $B_F(x,y)=\exp(\sum_{n\ge1,k\ge0}F(n,k)x^ny^k/n)=\prod_{n\ge1,k\ge0}(1-x^ny^k)^{-h_{n,k}}$ 属于 $1+x\mathbb Z[y][[x]]$，其中 $h_{n,k}=n^{-1}\sum_{d\mid\gcd(n,k)}\mu(d)F(n/d,k/d)$ 为整数。取 $F=\binom nk^n,\binom nk^{k+1},\binom{n^2}{nk},\binom{nk}{k^2}$（$0\le k\le n$，其余补零），就得到原文四个整数三角形。
:::

::: {.proof #pf-bivariate}
设 $p^a\Vert n$。若 $p\nmid k$，任一公因子 $d$ 都与 $p$ 互素，整除条件保证每个反演项含 $p^a$。若 $p\mid k$（包括 $k=0$），把不含 $p$ 的 $d$ 与 $pd$ 配对；数组同余使差含 $p^a$。于是 $h_{n,k}$ 为整数。对共同的缩放因子做莫比乌斯反演，取形式对数即可验证乘积；每个 $x$ 次数只有有限个 $y$ 次数参与。

前两个三角形直接用已证的幂数组。后两个分别用 $(N,K)=(n^2,nk),(nk,k^2)$。$N\mid K\binom NK$ 给出所需整除（第二个在 $k>0$ 时约掉一个 $k$，$k=0$ 直接成立）。两个坐标都缩放 $p^2$，用两次系数提升；$v_p(N)\ge v_p(n)$，而第二个的 $k=0$ 项恒为 $1$。
:::

::: {.remark #triangle-slices title="同一张表，沿不同方向读（原文推论 10）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s10"}
对 A209424、A228899 令 $y=1$，就得到整数行和 A167007、A184730；令 $x=y=z$，得到反对角线和 A166894、A181070。A209424 的列 A209425 与中央项 A209426 也是整数。A209424 的第一列和 A228899 的次对角线都是 $\sum_{j=1}^n j^{j-1}$（A060946）；原因是只保留一次 $y$，普通第一列的生成式为 $(1-x)^{-1}\sum_{n\ge1}n^{n-1}x^n$，反射 $y$ 后同样适用。
:::

::: {.remark #lowered-triangles title="把指数减一，并不保险（原文推论 11）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s11"}
若在 A228899 中把 $k+1$ 改成 $k$，则 $[x^4y^2]B=31/2$，对应的行和 $[x^4]B(x,1)=85/2$。这确认了 A228899 与 A184730 评论中已有的非整数性断言。另有三个单变量的降幂例子在六次项分别给出 $1481/2,45/2,327/2$，而不是整数。相差一个单位的指数，足以破坏整除。
:::

::: {.remark #companion-limit title="最大的项决定增长率（原文推论 8）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s8"}
在 A209428 与 A166895 的和式中，项为 $\binom{m-k}{k}^{m-k}$，后一数列还乘 $m/(m-k)\in[1,2]$。对两者取 $m^2$ 次根，极限相同，即 $((1-r)/r)^{(1-r)^2/(3-4r)}$，其中 $r$ 是 $(0,1/2)$ 内满足 $(1-2r)^{3-4r}=(1-r)^{2(1-r)}r^{1-2r}$ 的唯一根。原文用 Stirling 估计把离散最大项变成连续函数的最大值；至多 $m+1$ 项以及不超过 $2$ 的权重，在这个根次下都不改变极限。极限公式来自 V. Kotesovec，不是整除论证的推论。
:::

::: {.remark #array-maxima title="行中最高处会移动（原文推论 12）" mathesis="collected:hanna-a181074-binomial-exponentials:3:s12"}
A209427 的 $\binom nk^n$ 与 A219207 的 $\binom nk^{k+1}$ 是整数数组，并满足引理 4 的整除与缩放同余。若 $k_n$ 是 A219207 第 $n$ 行任意最大项的位置，则 $k_n/n\to u$；$u$ 是 $(1/2,1)$ 内方程 $(1-u)^{2u-1}=u^{2u}$ 的唯一根。原因是取对数并除以 $n^2$ 后，极限形状为 $u[-u\log u-(1-u)\log(1-u)]$；它的唯一峰决定了所有最大项位置的极限。
:::

## 这项工作接在哪里？

[Pieter Moree 的 Witt 变换](https://arxiv.org/abs/math/0311194v2)与 [F. Gossow 的 Gauss 同余](https://arxiv.org/abs/2410.05678v2)已经给出了未取变化幂时所需的思想。把 Dold 同余换成欧拉乘积也不是新原理：Du、Huang、Li 以及 Byszewski、Graff、Ward 给出了相关表述。这篇论文的关键是证明指数随格点改变时，同余仍然保留。它给出了所有次数的结论，而不只是核对 OEIS 的有限项；它也没有宣称每一种指数都有效，或把邻近的 OEIS 条目当作本题的结果。

原文：Haobo Ma、Wenlin Zhang，*Proving Hanna's conjecture in OEIS A181074, Comments (2 October 2010): extensions of Moree (2003) and Gossow (2024)*，[第 3 版](https://doi.org/10.5281/zenodo.24408311)，CC BY 4.0。
