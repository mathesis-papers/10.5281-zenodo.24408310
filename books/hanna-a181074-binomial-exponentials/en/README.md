# When fractions turn into integers: Hanna’s A181074 conjecture

The sequence begins $1,1,2,5,23,231,5405,\ldots$. Nothing looks unusual until you see how it is made: first divide by $n$, then take an exponential, whose expansion introduces factorials in the denominator. Why should every coefficient be an integer? Paul D. Hanna asked exactly this in the October 2, 2010 Comments of [OEIS A181074](https://oeis.org/A181074). [Version 3 of the paper](https://doi.org/10.5281/zenodo.24408311) by Haobo Ma and Wenlin Zhang answers the question and explains why the same method works for other series.

::: {.slides src="seminar"}
:::

## Start with one coefficient

Think of $x$ as a marker of degree, not a number to substitute. We can compute the coefficient of $x^3$ using only terms of degree at most three. Call the series inside the exponential $L(x)$. Its degree is $n+k$, so the third diagonal contributes just three terms:

| $(n,k)$ | $\binom{n+k-1}{k}^{k+1}/n$ |
| --- | ---: |
| $(1,2)$ | $1$ |
| $(2,1)$ | $2$ |
| $(3,0)$ | $1/3$ |

The first two diagonals contribute $1$ and $3/2$, so $L=x+\tfrac32x^2+\tfrac{10}{3}x^3+\cdots$. In $\exp L=1+L+L^2/2+L^3/6+\cdots$, the cubic coefficient is $10/3+3/2+1/6=5$. That is satisfying, but checking even seventy-five degrees cannot explain an infinite sequence.

::: {.film src="001-integer-series"}
:::

::: {.theorem #a181074-exact title="Hanna’s A181074" lean="D5/S1/Recurrence/Algebraic/HannaA181074Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
Let $A(x)=\exp(\sum_{n\ge1,k\ge0}\binom{n+k-1}{k}^{k+1}x^{n+k}/n)$. For every $m\ge0$, the coefficient $[x^m]A(x)$ is an integer. This is the A181074 integrality clause of the manuscript’s Corollary 6.
:::

## Change the formula, not the fractions

Here is a product that cannot introduce a denominator: $(1-x)^{-1}(1-x^2)^{-1}(1-x^3)^{-3}$. Expand each reciprocal by a geometric series, using three copies for the last factor. Its first four coefficients are $1,1,2,5$. If Hanna’s exponential is an infinite product like this with integer exponents, all degrees are handled at once. A negative exponent parameter $h$ causes no trouble: $(1-x^j)^{-h}$ is then an integer polynomial. This representation is called an Euler product.

Put $g_m=m[x^m]L(x)$. We have $g_1=1,g_2=3,g_3=10$. Taking the formal logarithm of $A=\prod_{j\ge1}(1-x^j)^{-h_j}$ gives $g_m=\sum_{j\mid m}jh_j$. For instance $h_2=(3-1)/2=1$ and $h_3=(10-1)/3=3$. In general Möbius inversion gives $mh_m=\sum_{d\mid m}\mu(d)g_{m/d}$. The function $\mu(d)$ is zero when a prime square divides $d$; otherwise it gives each choice of distinct prime factors the sign $(-1)$ to the power of the number chosen.

::: {.remark #array-criterion title="Where the integer exponents come from (manuscript Lemma 4)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s4"}
For an integer array $F(n,k)$ with $n\ge1,k\ge0$, suppose $n\mid kF(n,k)$ and, for each prime $p$, $F(pn,pk)\equiv F(n,k)\pmod{p^{v_p(n)+1}}$. Here $v_p(n)$ counts the copies of $p$ in $n$. Then $g_m=\sum_{n=1}^m(m/n)F(n,m-n)$ is integral and $g_{pm}\equiv g_m\pmod{p^{v_p(m)+1}}$ (a Dold congruence). Möbius inversion yields integral $h_m$ and the exponential equals the Euler product.

Each summand is $F+kF/n$. In $g_{pm}$ the summands with $p\nmid n$ vanish modulo $p^{v_p(m)+1}$. Pair the others, $n=pj$, with index $j$ in $g_m$. Their array values differ by a multiple of $p^{v_p(j)+1}$, and the factor $m/j$ leaves a multiple of $p^{v_p(m)+1}$. Finally, for $p^a\Vert m$, pair $d$ and $pd$ in the inversion sum. The Dold congruence makes each paired difference divisible by $p^a$. This works for every prime dividing $m$, so the numerator is divisible by $m$ itself.
:::

## Compare array entries before expanding

Write $c(n,k)=[t^k]U(t)^n$. For $U=1+t$, choosing $t$ from exactly $k$ of the $n$ factors gives $c(n,k)=\binom nk$. For $U=1+t+t^2+\cdots$, a choice puts a nonnegative number of objects in each of $n$ labeled boxes. Distributing $k$ identical objects this way gives $\binom{n+k-1}{k}$, the base in Hanna’s formula.

::: {.remark #coefficient-lift title="Divisibility and coefficient lifting (manuscript Lemma 2)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s2"}
For any $U\in\mathbb Z[[t]]$, $n\ge1$, $k\ge0$, we have $n\mid kc(n,k)$ and, for every prime $p$, $c(pn,pk)\equiv c(n,k)\pmod{p^{v_p(n)+1}}$. The identity $t(U^n)'=ntU^{n-1}U'$ gives the first assertion. For the second, start with $U(t)^p\equiv U(t^p)\pmod p$. By the binomial theorem, raising both sides of a congruence modulo $p^j$ to the $p$th power improves the modulus to $p^{j+1}$. For $n=p^ab$ with $p\nmid b$, repeat $a$ times and raise to $b$, then compare the coefficient of $t^{pk}$. This also works for $p=2$.
:::

::: {.remark #powered-array title="The exponent moves with the entry (manuscript Lemma 3)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s3"}
All three exponent families below give arrays $F=c^E$ satisfying the two conditions of Lemma 4. Lifting compares the bases; the following proof compares the exponents. Knowing that congruences survive a fixed power is not enough when the exponent changes too.
:::

::: {.theorem #general-integrality title="Three families of moving exponents" status="written-proof" proof="pf-general" doi="10.5281/zenodo.24408311" source="Theorem 1" request="https://github.com/the-omega-institute/trureturing-requests/issues/572" mathesis="collected:hanna-a181074-binomial-exponentials:3:s1"}
Let $U\in1+t\mathbb Z[[t]]$ and $c(n,k)=[t^k]U(t)^n$. If $E=rk+s$ (integers $r,s\ge1$), $E=rn+sk+q$ (integers $r\ge1,s,q\ge0$), or $E=n+k-1$, then $\exp(\sum_{n\ge1,k\ge0}c(n,k)^{E(n,k)}x^{n+k}/n)\in1+x\mathbb Z[[x]]$. Only the third family at $(1,0)$ has exponent zero, and its base is $1$.
:::

::: {.proof #pf-general}
Positive powers preserve $n\mid kc$; at exponent zero, $k=0$ so divisibility still holds. Fix a prime $p$ and put $a=v_p(n)$. Coefficient lifting lets us replace the new base by the old base $c$ modulo $p^{a+1}$. If $k=0$, both bases are one; if $k>0$ and $c=0$, both powers are positive powers of zero after this replacement. Otherwise there are two cases:

- If $p\nmid c$, then $n\mid kc$ forces $p^a\mid k$. The exponent differences $(p-1)rk$, $(p-1)(rn+sk)$ and $(p-1)(n+k)$ are all multiples of $p^a(p-1)$, the period supplied by Euler’s theorem modulo $p^{a+1}$.
- If $p\mid c$, put $b=v_p(c)$. Then $a\le v_p(k)+b$. In the first family $E\ge k+1$ and $v_p(k)\le k-1$, so $Eb\ge a+1$. In the other two families, $k>0$ gives $E\ge n\ge p^a\ge a+1$. The new exponent never decreases, so both powers vanish modulo $p^{a+1}$.

Thus the powered array meets both conditions. Group the logarithm by $m=n+k$, then apply the Euler-product argument of manuscript Lemma 4.
:::

::: {.corollary #reflected-integrality title="Measure from the other end of the row" status="written-proof" proof="pf-reflected" doi="10.5281/zenodo.24408311" source="Corollary 5" request="https://github.com/the-omega-institute/trureturing-requests/issues/573" mathesis="collected:hanna-a181074-binomial-exponentials:3:s5"}
Let $P\in1+t\mathbb Z[t]$ have degree at most an integer $d\ge1$, with $c(n,k)=[t^k]P(t)^n$. For integers $r,s\ge1$, $\exp(\sum_{n\ge1}\sum_{k=0}^{dn}c(n,k)^{r(dn-k)+s}x^{n+k}/n)$ lies in $1+x\mathbb Z[[x]]$.
:::

::: {.proof #pf-reflected}
Extend by zero past $k=dn$; scaling preserves this support bound. Put $j=dn-k$. Then $n\mid jc$ because $n\mid kc$. After coefficient lifting compare $rpj+s$ with $rj+s$. When $j=0$ they are equal; when $c=0$ both powers of the common base are zero. If $j>0$ and $p\nmid c$, then $p^a\mid j$ and the difference $(p-1)rj$ is a multiple of the required period. If $p\mid c\ne0$, then $a\le v_p(j)+b$ and $(rj+s)b\ge(j+1)b\ge v_p(j)+b+1$. Again both powers vanish modulo $p^{a+1}$. The original condition $n\mid kc$ ensures $n\mid kF$, so Lemma 4 applies. The bound $d$ need not be the actual degree.
:::

## What else does the method cover?

::: {.remark #eight-exponentials title="Eight exponential series (manuscript Corollary 6)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
With $\binom{n+k-1}{k}$ as the base, the exponents $k+1,n,n+k-1$ give A181074, A181076 and A181078. With $\binom nk$ and $0\le k\le n$, the exponents $k+1,n-k+1,n+k,n+k+1,n$ give A181070, A181080, A181082, A181084 and A166894. Their coefficients are nonnegative integers: the logarithms in these cases have nonnegative coefficients. This last property need not hold for arbitrary signed $U$.
:::

::: {.theorem #a181070-exact title="The ordinary-binomial series A181070" lean="D5/S1/Recurrence/Algebraic/HannaA181070Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
Every coefficient of $\exp(\sum_{n\ge1}\sum_{k=0}^n\binom nk^{k+1}x^{n+k}/n)$ is integral, including the constant coefficient. This is the integrality clause for A181070 in manuscript Corollary 6.
:::

::: {.theorem #a181080-exact title="The reflected-binomial series A181080" lean="D5/S1/Recurrence/Algebraic/HannaA181080Integrality.result" mathesis="collected:hanna-a181074-binomial-exponentials:3:s6"}
Every coefficient of $\exp(\sum_{n\ge1}\sum_{k=0}^n\binom nk^{n-k+1}x^{n+k}/n)$ is integral, including the constant coefficient. This is the integrality clause for A181080 in manuscript Corollary 6.
:::

::: {.remark #eight-logarithms title="The diagonal sums have a pattern too (manuscript Corollary 7)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s7"}
Taking $xA'/A$ in the same order gives A181075, A181077, A181079, A181071, A181081, A181083, A181085 and A166895. These coefficients are integers satisfying the Dold congruences. Substitute $n=m-k$ in the formula for $g_m$: sum up to $m-1$ for the generalized binomial base, and only up to $\lfloor m/2\rfloor$ for the ordinary one. This also explains why A181079 pairs with A181078 rather than the cross-referenced A181076.
:::

::: {.corollary #bivariate-product title="Keep both coordinates in the product" status="written-proof" proof="pf-bivariate" doi="10.5281/zenodo.24408311" source="Corollary 9" request="https://github.com/the-omega-institute/trureturing-requests/issues/574" mathesis="collected:hanna-a181074-binomial-exponentials:3:s9"}
Suppose the integer array $F(n,k)$ meets both conditions of Lemma 4 and has finite support in each row. Then $B_F(x,y)=\exp(\sum_{n\ge1,k\ge0}F(n,k)x^ny^k/n)=\prod_{n\ge1,k\ge0}(1-x^ny^k)^{-h_{n,k}}$ belongs to $1+x\mathbb Z[y][[x]]$, where $h_{n,k}=n^{-1}\sum_{d\mid\gcd(n,k)}\mu(d)F(n/d,k/d)$ is an integer. This gives the four integral triangles from $F=\binom nk^n,\binom nk^{k+1},\binom{n^2}{nk},\binom{nk}{k^2}$ on $0\le k\le n$, extended by zero.
:::

::: {.proof #pf-bivariate}
Fix $p^a\Vert n$. If $p\nmid k$, all common divisors $d$ are prime to $p$ and the divisibility condition gives $p^a$ in each numerator term. If $p\mid k$, including $k=0$, pair divisors $d$ prime to $p$ with $pd$; the array congruence gives $p^a$ in their difference. Thus each $h_{n,k}$ is integral. Möbius inversion along common scaling factors and formal logarithms give the product. Finite support in each row keeps the coefficient of any fixed $x$ degree polynomial in $y$.

For the first two arrays use the moving-exponent result. For the last two set $(N,K)=(n^2,nk)$ or $(nk,k^2)$. The identity $N\mid K\binom NK$ gives the divisibility, canceling $k$ when $k>0$ in the second case. Both indices scale by $p^2$, so apply coefficient lifting twice; $v_p(N)\ge v_p(n)$, while the second array at $k=0$ is directly constant at one.
:::

::: {.remark #triangle-slices title="Read the same table in different directions (manuscript Corollary 10)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s10"}
For A209424 and A228899, set $y=1$ to get the integral row sums A167007 and A184730, or set $x=y=z$ for the antidiagonal sums A166894 and A181070. The column A209425 and central entries A209426 of A209424 are integral as well. Column one of A209424 and the subdiagonal of A228899 both equal $\sum_{j=1}^n j^{j-1}$ (A060946): keeping just the first power of $y$ gives $(1-x)^{-1}\sum_{n\ge1}n^{n-1}x^n$, directly for the column and after reflecting for the subdiagonal.
:::

::: {.remark #lowered-triangles title="One less is not safe (manuscript Corollary 11)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s11"}
Replace $k+1$ by $k$ in A228899 and the coefficient $[x^4y^2]B$ becomes $31/2$; the corresponding row sum $[x^4]B(x,1)$ becomes $85/2$. This confirms the stated nonintegrality in A228899 and A184730. Three other lowered-exponent series already give fractions $1481/2,45/2,327/2$ in degree six. A change of just one in the exponent can break the divisibility.
:::

::: {.remark #companion-limit title="The largest term sets the growth rate (manuscript Corollary 8)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s8"}
The sums defining A209428 and A166895 use terms $\binom{m-k}{k}^{m-k}$, with an extra factor $m/(m-k)\in[1,2]$ in the second sum. Their $m^2$th roots have the same limit $((1-r)/r)^{(1-r)^2/(3-4r)}$, where $r$ is the unique root in $(0,1/2)$ of $(1-2r)^{3-4r}=(1-r)^{2(1-r)}r^{1-2r}$. Stirling’s estimate turns the largest term into a maximum of a continuous function; the at most $m+1$ terms and the factor at most $2$ do not affect this root limit. This is V. Kotesovec’s formula, established separately from the divisibility argument.
:::

::: {.remark #array-maxima title="Where is the peak of a row? (manuscript Corollary 12)" mathesis="collected:hanna-a181074-binomial-exponentials:3:s12"}
The arrays $\binom nk^n$ (A209427) and $\binom nk^{k+1}$ (A219207) are integral and obey both array conditions of Lemma 4. For any maximizing column $k_n$ of row $n$ in A219207, $k_n/n\to u$, where $u$ uniquely solves $(1-u)^{2u-1}=u^{2u}$ in $(1/2,1)$. After taking logarithms and dividing by $n^2$, the limiting shape is $u[-u\log u-(1-u)\log(1-u)]$; its unique maximum determines the limit of every maximizing column.
:::

## What changed, and what did not?

[Pieter Moree’s Witt transform](https://arxiv.org/abs/math/0311194v2) and [F. Gossow’s Gauss congruences](https://arxiv.org/abs/2410.05678v2) provide the ideas for the unpowered coefficients. The Dold-to-Euler-product step also has precedents in Du, Huang and Li and in Byszewski, Graff and Ward. The key extension is preserving congruences when an exponent changes with the array index. It proves a statement about every degree rather than checking the first few OEIS entries. It neither covers arbitrary choices of exponent nor makes unrelated cross-referenced sequences part of the conclusion.

Source: Haobo Ma and Wenlin Zhang, *Proving Hanna’s conjecture in OEIS A181074, Comments (2 October 2010): extensions of Moree (2003) and Gossow (2024)*, [version 3](https://doi.org/10.5281/zenodo.24408311), CC BY 4.0.
