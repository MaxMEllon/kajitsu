import { h, FC } from "@kajitsu/lemon";

const snipet1 = `
let result = exclaim(capitalize(doubleSay(&quot;hello&quot;)));
result //=&gt; &quot;Hello, hello!&quot;

let result = &quot;hello&quot;
&nbsp;&nbsp;|&gt; doubleSay
&nbsp;&nbsp;|&gt; capitalize
&nbsp;&nbsp;|&gt; exclaim
`.trim();

const snipet2 = `
function doubleSay (str) {
&nbsp;&nbsp;return str + &quot;, &quot; + str;
}
async function capitalize (str) {
&nbsp;&nbsp;let response = await
&nbsp;&nbsp; &nbsp; &nbsp;capitalizeOnTheServer(str);
&nbsp;&nbsp;return response.getCapitalized();
}
function exclaim (str) {
&nbsp;&nbsp;return str + &#039;!&#039;;
}

let result = &quot;hello&quot;
&nbsp;&nbsp;|&gt; doubleSay
&nbsp;&nbsp;|&gt; capitalize
&nbsp;&nbsp;|&gt; exclaim;

// result =&gt; &quot;[Object Promise]&quot;
`.trim();

const snipet3 = `
let result = await ("hello"
    |> doubleSay
    |> capitalize)
  |> exclaim
`.trim();

const snipet4 = `
let result = "hello"
  |> doubleSay
  |> await capitalize
  |> exclaim;
`.trim();

const snipet5 = `
let result = "hello"
  |> doubleSay
  |> (await capitalize)
  |> exclaim;
`.trim();

const snipet6 = `
let result = "hello"
  |> doubleSay
  |> await
  |> capitalize
  |> exclaim;
`.trim();

const snipet7 = `
let promise = "hello"
  |> doubleSay
  |> await
exclaim(capitalize(promise))
`.trim();

const snipet8 = `
await
  asyncFn()
`.trim();

const snipet9 = `
let promise = "hello"
  |> doubleSay
  |> await;
exclaim(capitalize(promise))
`.trim();

const snipet10 = `
let promise = "hello"
  |> doubleSay
  |> await
exclaim(capitalize(promise));
`.trim();

const snipet11 = `
// Basic Usage
x |>> f     //-->   f(x)
x |> f(^)  //-->   f(x)

x |>> f(y)     //-->   f(y)(x)
x |> f(y)(^)  //-->   Syntax Error

// 2+ Arity Usage
x |> f(^, 10)   //-->  f(x,10)

// Async solution (does not require special casing)
x |> await f(^)       //-->  await f(x)
x |> await f(^) |> g  //-->  g(await f(x))

// Other expressions
f(x) |> ^.data           //-->  f(x).data
f(x) |> ^[^.length-1]    //-->  let temp=f(x), temp[temp.length-1]
f(x) |> { result: ^ }    //-->  { result: f(x) }
`.trim();

const snipet12 = `
// Basic Usage
x |> f     //-->   f(x)
x |> f(^)  //-->   f(x)

// 2+ Arity Usage
x |> f(y)     //-->   Syntax Error
x |> f(y, ^)  //-->   f(y, x)
x |> f(^, y)  //-->   f(x, y)
x |> f(y)(^)  //-->   f(y)(x)

// Async Solution (Note this would not require special casing)
x |> await f(^)       //-->  await f(x)
x |> await f(^) |> g  //-->  g(await f(x))

// Arbitrary Expressions
f(x) |> ^.data           //-->  f(x).data
f(x) |> ^[^.length-1]    //-->  let temp=f(x), temp[temp.length-1]
f(x) |> { result: ^ }    //-->  { result: f(x) }
`.trim();

const snipet13 = `
value |> fn(10, ?)
`.trim();

const snipet14 = `
value |> fn(10, ? ? cond1(?) : defaultValue)
`.trim();

const snipet15 = `
value |> fn(10, ? ?? defaultValue)
`.trim();

const snipet16 = `
value |> fn(10, ? ?? ? ? ? : ?)
                ~ ~~ ~ ~ ~ ~ ~
                |  |_|_|_|_|_|_______ nullish coalescing operator
                |    | | | | |
                |____._|_._|_.____ placeholder of pipeline
                       |   |
                       |___.___ conditional ternary operator
`.trim();

const snipet17 = `
value |> fn(20 % %)
`.trim();

export const Article: FC<{ nonce?: string }> = ({ nonce }) => (
  <article id="mr">
    <h1>
      tc39/proposal-pipeline-operator の<wbr />
      過去と現状
    </h1>
    <h2>
      pipeline-operator の<wbr /> ドラフトを
      <wbr />
      振り返る
    </h2>
    <p>
      <a href="https://github.com/tc39/proposal-pipeline-operator">tc39/proposal-pipeline-operator</a> の<wbr />
      リポジトリができた時点の，
      <wbr /> （厳密には Stage-1 になった時点） pipeline operator の<wbr /> syntax を<wbr />
      簡単におさらいしてみましょう．
      <wbr />
    </p>
    <pre>
      <code>{snipet1}</code>
    </pre>
    <p>
      F# や Elixir などに触れているひとは，
      <wbr />
      馴染み深いものかもしれません．
      <wbr />
      その他の，
      <wbr />
      関数型プログラミング言語では，
      <wbr />
      記法や振る舞いに若干の差異はあるものの，
      <wbr />
      類似の
      <wbr /> pipeline があると思います．
      <wbr />
    </p>
    <p>
      <code>c(b(a))</code> のような関数呼び出しがネストしたケースで，
      <wbr />
      <code>a |&gt; b |&gt; c</code> と，
      <wbr />
      より直感的に書けることができるようになります．
      <wbr />
    </p>
    <p>
      この仕様としては，
      <wbr />
      このオペレーターは，
      <wbr />
      優先度は <code>,</code> より強く，
      <wbr />
      その他のオペレーターより弱いです．
      <wbr />
      そして，
      <wbr />
      Unary-Function 前提で考えられていました．
      <wbr /> 上記のような pipeline は，
      <wbr />
      これより F#-style pipeline として扱われていきます．
      <wbr />
    </p>
    <h2>長い期間 Stage-1 にとどまり続けた理由</h2>
    <p>
      pipeline-operator は 2017年に Stage-1 になってから 三年間 Stage-2 に上がることはありませんでした．
      <wbr />
      この記事では，
      <wbr />
      なぜ上がるのが難しかったかに焦点を
      <wbr />
      当てて紹介していきます．
      <wbr />
    </p>
    <h3>F#-style pipeline における ASI との競合</h3>
    <p>
      非同期を
      <wbr /> pipeline で扱いたいモチベーションから ASI で起きた予期せぬ問題までの流れを
      <wbr /> コードと順に追っていきます．
      <wbr />
    </p>
    <pre>
      <code>{snipet2}</code>
    </pre>
    <p>
      普通に pipeline を<wbr />
      活用すると，
      <wbr /> 途中に promise を<wbr />
      返す処理があった場合，
      <wbr /> その promise が解決されずに次の処理に渡されてしまいます．
      <wbr /> これを
      <wbr />
      解決しようとすると,
    </p>
    <pre>
      <code>{snipet3}</code>
    </pre>
    <p>
      この様になってしまいます．
      <wbr />
      しかし，
      <wbr />
      これはあまり直感的ではないです それを
      <wbr />
      解決するために pipeline 下での await を<wbr />
      許すとこのように書けるようになります．
      <wbr />
    </p>
    <pre>
      <code>{snipet4}</code>
    </pre>
    <p>
      ここで新たに生じた問題が，
      <wbr />
      上のコードと下のコードで全く別の
      <wbr />
      意味になってしまうということです．
      <wbr />
    </p>
    <pre>
      <code>{snipet5}</code>
    </pre>
    <p>
      その問題を
      <wbr />
      回避するために，
      <wbr />
      <code>|&gt; await</code> という構文が提案されました．
      <wbr />
    </p>
    <pre>
      <code>{snipet6}</code>
    </pre>
    <p>
      <code>|&gt; await</code> という構文を
      <wbr />
      導入しようとしたときに ASI の問題が生じました
    </p>
    <pre>
      <code>{snipet7}</code>
    </pre>
    <p>
      既存の async / await では，
      <wbr />
      await 前の改行が許されており，
      <wbr />
    </p>
    <pre>
      <code>{snipet8}</code>
    </pre>
    <p>
      と記述することができます．
      <wbr /> ここから，
      <wbr />
    </p>
    <pre>
      <code>{snipet9}</code>
    </pre>
    <pre>
      <code>{snipet10}</code>
    </pre>
    <p>
      上記のどちらと判断すればよいかわからず，
      <wbr />
      ASI がどこにセミコロンを挿入すべきか判断がつかなくなってしまうという問題が
      <wbr />
      起きました． それらを回避するために <code>await |&gt;</code> や <code>|&gt; await |&gt;</code> なども
      <wbr />
      考えられましたが，（<code>|&gt; await</code> で終わる pipeline を許さないための構文） 結果的に，
      <wbr />
      これを解決する画期的な方法がなく，
      <wbr />
      仕様としては，
      <wbr />
      await を含むパターンを後回しにし，
      <wbr />
      それが要因の一つとなり，
      <wbr />
      Stage-2 へ上げる判断はなされませんでした．
    </p>
    <h4>
      await の問題を解決するために，
      <wbr />
      過去に drop された hack style の
      <wbr />
      復活が提案される
    </h4>
    <p>
      pipeline operator 下で，
      <wbr />
      await を扱う良い方法がない現状を
      <wbr />
      打破するために，
      <wbr />
      <a href="https://github.com/tc39/proposal-pipeline-operator/issues/4">2015年 に考えられていた hack style</a> を
      <wbr />
      復活させる提案がされました．
      <wbr />
      それを受けて，
      <wbr />
      2018年に F# style と hack style を<wbr />
      混合させた提案が２つできました．
      <wbr />
      それは，
      <wbr />{" "}
      <a href="https://github.com/tc39/proposal-pipeline-operator/wiki#proposal-3-split-mix">
        <code>&quot;split-mix pipes&quot;</code>
      </a>{" "}
      と
      <a href="https://github.com/tc39/proposal-pipeline-operator/wiki#proposal-4-smart-mix">
        <code>&quot;smart-mix pipes&quot; (proposal-smart-pipeline)</code>
      </a>{" "}
      です．
      <wbr />
    </p>
    <p>
      2つに共通している点は，
      <wbr />
      <code>Placeholder</code> を<wbr />
      定義し，
      <wbr />
      その token を<wbr />
      活用することで，
      <wbr />
      <code>await</code>, <code>yield</code> を<wbr />
      含んだケースを
      <wbr />
      対応しつつ, 前の処理で評価した結果を
      <wbr />，<wbr />
      次の処理の関数の任意の場所に適用できるというものでした．
      <wbr />
    </p>
    <p>
      <code>split-mix</code> は <code>|&gt;</code> と <code>|&gt;&gt;</code> (厳密には，
      <wbr />
      どの文字を
      <wbr />
      使うかまでは決まっていない) 2つのオペレーターに分割しているのが特徴です．
      <wbr />
      <code>smart-mix</code> は 関数を
      <wbr />
      そのまま渡すか，
      <wbr />
      <code>Placeholder</code> によってどこに適用するか，
      <wbr />
      文法を
      <wbr />
      限定するというものでした
    </p>
    <ul>
      <li>split-mix</li>
    </ul>
    <pre>
      <code>{snipet11}</code>
    </pre>
    <p>
      <code>split-mix</code> は，
      <wbr />
      （導入されたときに）各ブラウザが，
      <wbr />
      ２つのオペレーターを
      <wbr />
      実装する必要があることから，
      <wbr />
      これに賛同する人はいませんでした．
      <wbr />
    </p>
    <ul>
      <li>smart-mix</li>
    </ul>
    <pre>
      <code>{snipet12}</code>
    </pre>
    <h3>
      pipeline-operator を<wbr /> Stage-2 に上げるために再挑戦
    </h3>
    <p>
      2018年3月に，
      <wbr />
      pipeline-operator を<wbr /> Stage-2 に上げるために F# pipeline と smart-mix pipeline のそれぞれを
      <wbr />
      一緒に再度提案し tc39 に持ち込みました．
      <wbr />
      しかし，
      <wbr />
      どちらの
      <wbr />
      提案も賛同を
      <wbr />
      得ることはなく，
      <wbr />
      一部からは構文上の課題からこれを
      <wbr />
      標準化する価値はないオペレーターだと述べられました．
      <wbr />
    </p>
    <p>
      2018年7月には，
      <wbr />
      pipeline-operator にも 関係がある partial-function-application (PFA) を<wbr /> Stage-2
      に進めるべく提案されました．
      <wbr /> これに関しても，
      <wbr />
      一部から反対され続けられています．
      <wbr /> Google V8 チームからは，
      <wbr />
      開発者が PFA を<wbr />
      通して 容易にたくさんのクロージャ定義することでメモリが逼迫することを
      <wbr />
      懸念していました．
      <wbr />
    </p>
    <p>
      これにより，
      <wbr />
      PFA が stage-2 に進めないこともあって，
      <wbr />
      pipeline-operator の Stage は上がることはありませんでした．
      <wbr />
    </p>
    <p>
      @codehag 氏（Mozilla SpiderMonkey チーム）は，
      <wbr />
      pipe に関するユーザー調査を
      <wbr />
      主導していました．
      <wbr /> その結果，
      <wbr />
      smart-mix pipeline が若干好まれているようでした．
      <wbr />
      しかし，
      <wbr />
      F# pipeline の方が（実装時の）エラーが少なかったようです．
      <wbr />
      結論としては，
      <wbr />
      この結果はどちらが優位であるかを
      <wbr />
      決めるほどの優位な差はないというものでした．
      <wbr />
      これらを
      <wbr />
      総合的に踏まえて，
      <wbr />
      Mozilla SpiderMonkey チーム はそこまで，
      <wbr />
      pipeline operator の二つの提案に対して前向きではありませんでした．
      <wbr />
    </p>
    <p>
      ここから三年間に渡り，
      <wbr />
      これら二つの pipeline operater が 同意を
      <wbr />
      得られるための最善について オフライン / オンラインで議論されます．
      <wbr />
    </p>
    <h2>2021年 pipeline-operator が Stage-2 に上がるにあたって起きたこと</h2>
    <h3>State of JS 2020 にて pipeline operator が話題に上がる</h3>
    <p>
      2021年1月に State of JS 2020 にて，
      <wbr />
      「最も JavaScript に足りないものはなにか」 という設問において pipeline operator が四位にランクインしたという報告を
      <wbr />
      受けました．
      <wbr />
    </p>
    <p>
      これがきっかけの１つとなったかどうかはわかりませんが，
      <wbr />
      結果として三年間大きな動きがなかったこの proposal に動きが出てきました．
      <wbr />
    </p>
    <p>
      <img
        width="677"
        height="390"
        src="/images/loading.svg"
        data-src="/images/states-of-js-2020.png"
        alt="state-of-js-2020 results"
      />
    </p>
    <blockquote>
      <p>
        <a href="https://2020.stateofjs.com/ja-JP/opinions/">https://2020.stateofjs.com/ja-JP/opinions/</a> より
      </p>
    </blockquote>
    <p>
      2021年3月に，
      <wbr />
      これまで チャンピオンを
      <wbr />
      努めていた @littledan 氏 (Igalia) が，
      <wbr />
      他の project で時間が割けない状況であるということから，
      <wbr /> この proposal のチャンピオンが @tabatkins 氏（Google）, @rbuckton 氏 (Microsoft) が
      共同チャンピオンとして共に引き継ぐことに同意しました．
      <wbr />
    </p>
    <p>
      また，
      <wbr />
      @rbuckton (Microsoft) 氏 が これまで上がっている F#-style pipeline, hack-style pipeline, smart-mix pipeline，
      <wbr /> 三つを
      <wbr />
      比較した結果を
      <wbr /> <a href="https://gist.github.com/tabatkins/1261b108b9e6cdab5ad5df4b8021bcb5">Gist にまとめ</a>
      ，<wbr />
      「ほんの些細な違い」と結論づけています．
      <wbr /> この，
      <wbr />
      Gist での議論もとても白熱しています．
      <wbr />
    </p>
    <p>
      この，
      <wbr />
      Gist に刺激を
      <wbr />
      受けた smart-mix pipeline のドラフトを
      <wbr />
      書いている @js-choi 氏 （Indiana University）は，
      <wbr />
      smart-mix pipeline のドラフトではなく，
      <wbr /> Hack-style pipeline を<wbr />
      書くことにシフトしました．
      <wbr />
      それにより，
      <wbr />
      smart-mix pipeline は Hack-style pipeline と併合された扱いになり 取り下げられました．
      <wbr />
    </p>
    <h3>再度 Stage-2 に向けて</h3>
    <p>
      再度，
      <wbr />
      Stage-2 に向けていくつかの pipeline-operateor の style を<wbr />
      提示に向けて議論が行われていました．
      <wbr />
      その結果，
      <wbr />
      Hack-style pipeline を<wbr />
      持ち込む事になりました．
      <wbr /> それにあたり，
      <wbr />
      F#-style がいつまでも行き詰まっていることから，
      <wbr />
      Hack-style pipeline に仮合意することなりました．
      <wbr />
    </p>
    <p>
      8月31日の正式な委員会で，
      <wbr />
      プレナリーが実施されました．
      <wbr />
      @tabatkins 氏（Google）が Hack-style pipeline を<wbr />，<wbr />
      現状のチャンピオンの暫定的ななコンセンサスとして提示し，
      <wbr />
      Stage-2 に進めることを
      <wbr />
      提案しました．
      <wbr />
    </p>
    <p>
      それに対して，
      <wbr />
    </p>
    <ul>
      <li>他の proposal である bind-operator と将来的に衝突してしまうのではないか</li>
      <li>
        @codehag 氏 (Mozilla SpiderMonkey) はいずれにしても pipeline には若干後ろ向き，
        <wbr />
        ただし Stage-2 を<wbr />
        ブロックするほどではない
      </li>
    </ul>
    <p>
      という指摘がなされました．
      <wbr />
    </p>
    <p>
      これ以外に，
      <wbr />
      特に指摘もなかったため{" "}
      <strong>
        pipeline-opearator は Stage-2 に進むことになりました．
        <wbr />
      </strong>
    </p>
    <p>
      備考として，
      <wbr />
      以前 Google V8 チームから挙げられていた，
      <wbr />
      pipe と PFA を<wbr />
      用いたときに，
      <wbr />
      メモリを
      <wbr />
      逼迫する可能性についての異論はありませんでした．
      <wbr />
    </p>
    <h3>
      仕様を
      <wbr />
      固めるために <code>Placeholder</code> の トークンを
      <wbr />
      決める
    </h3>
    <p>
      2021年10月末から議論されているトピックとして，
      <wbr />
      Placeholder の token に何を
      <wbr />
      用いるかというものがあります．
      <wbr />
    </p>
    <p>
      以前は <code>?</code> が提案されていました，
      <wbr /> 現在{" "}
      <a href="https://github.com/tc39/proposal-pipeline-operator/issues/91">
        Bikeshedding the Hack topic token #91
      </a>{" "}
      にて 最終的に，
      <wbr />
      Placeholder の token に何を
      <wbr />
      用いるか議論されています．
      <wbr />
    </p>
    <h4>
      <code>?</code> が抱えている問題
    </h4>
    <p>
      <code>?</code> を<wbr /> token としたときに次のようなコードになります．
      <wbr />
    </p>
    <pre>
      <code>{snipet13}</code>
    </pre>
    <p>
      これを
      <wbr />，<wbr />
      三項演算子 や Nullish coalescing operator と組み合わせたときに，
      <wbr />
      非常に混乱を
      <wbr />
      招くコードになってしまう問題があります
    </p>
    <pre>
      <code>{snipet14}</code>
    </pre>
    <pre>
      <code>{snipet15}</code>
    </pre>
    <p>
      また，
      <wbr />
      これを
      <wbr />
      許すと，
      <wbr />
      構文的には下のコードがあり得ることになります
    </p>
    <pre>
      <code>{snipet16}</code>
    </pre>
    <h4>
      <code>%</code> が抱えている問題
    </h4>
    <p>
      <code>%</code> も <code>?</code> に近い課題を
      <wbr />
      抱えています．
      <wbr />
      <code>%</code> 単体で オペレーターとしてすでにあるので
    </p>
    <pre>
      <code>{snipet17}</code>
    </pre>
    <p>
      のようなコードが発生してしまいます，
      <wbr />
      これを
      <wbr />
      文脈から pipline-operator 下の placeholder か，
      <wbr />
      剰余を
      <wbr />
      求める <code>%</code> operator か どうか判断するのは非常に困難です．
      <wbr />
      <code>#</code> でも同様に，
      <wbr />
      クラスのメソッド内で pipeline が使われたとき，
      <wbr />
      private field か placeholder の token か，
      <wbr />
      あるいは 現在上がっている proposal の tuple か 非常に解析が難しくなってしまいます．
      <wbr />
    </p>
    <p>
      これらのことから，
      <wbr />
      独立した token が良いのではないかという意見もあります．
      <wbr />
    </p>
    <p>
      <code>##</code> や <code>()</code>, <code>$_</code>, <code>@</code>, <code>^</code> など 様々なアイデアが github
      上 の <a href="https://github.com/tc39/proposal-pipeline-operator/issues/91">issue</a> で 議論されています．
      <wbr />
      そして，
      <wbr />
      まだこれといった token は決まっていません．
      <wbr /> （<code>$</code>, <code>_</code> 及びそれらの組み合わせは，
      <wbr />
      既存のコードを
      <wbr />
      破壊する可能性があるのでなさそうです）
    </p>
    <p>
      Stage-3 の条件としては，
      <wbr />
      仕様として完成している必要があるので，
      <wbr />
      まずここが決まらないと pipeline-operator の Stage-3 は難しいでしょう．
      <wbr />
    </p>
    <h2>現状の Hack-style pipeline の仕様</h2>
    <p>
      最後に，
      <wbr />
      これらを
      <wbr />
      経てどのような proposal になったか見てみましょう．
      <wbr /> Plfaceholder が 仮に <code>%</code> になれば以下のようになります
    </p>
    <ul>
      <li>
        <code>value |&gt; foo(%)</code> for unary function calls,
      </li>
      <li>
        <code>value |&gt; foo(1, %)</code> for n-ary function calls,
      </li>
      <li>
        <code>value |&gt; %.foo()</code> for method calls,
      </li>
      <li>
        <code>value |&gt; % + 1</code> for arithmetic,
      </li>
      <li>
        <code>value |&gt; [%, 0]</code> for array literals,
      </li>
      <li>
        <code>value |&gt; &lbrace;foo: %&rbrace;</code> for object literals,
      </li>
      <li>
        <code>value |&gt; \`$&lbrace;%&rbrace;\``</code> for template literals,
      </li>
      <li>
        <code>value |&gt; new Foo(%)</code> for constructing objects,
      </li>
      <li>
        <code>value |&gt; await %</code> for awaiting promises,
      </li>
      <li>
        <code>value |&gt; (yield %)</code> for yielding generator values,
      </li>
      <li>
        <code>value |&gt; import(%)</code> for calling function-like keywords,
      </li>
    </ul>
    <h2>おわりに</h2>
    <p>
      この記事では，
      <wbr />
      pipeline-operator が Stage-1 から Stage-2 に上がるまでを
      <wbr />
      紹介しました．
      <wbr />
    </p>
    <p>
      東京Node学園祭&#39;2018 にて，
      <wbr />
      tc39 に所属している daniel さんが来日し，
      <wbr />
      発表＋参加者とのディスカッションに参加したときに 漠然と，
      <wbr />
      「JavaScript に新しい syntax を<wbr />
      導入するのは難しいのだなあ」と感じていたました．
      <wbr /> 今回，
      <wbr />
      この記事を
      <wbr />
      書くにあたって pipeline-operator について調べ，
      <wbr />
      より強くその難しさを
      <wbr />
      実感できたような気がします．
      <wbr />
    </p>
    <p>
      pipeline-operator や partial-function-application, pattern-matching, bind-operator などの仕様が JavaScript
      に実装されたときには，
      <wbr />
      とても楽しくプログラミングができそうで楽しみです．
      <wbr />
    </p>
    <h3>参考文献</h3>
    <ul>
      <li><a href="https://github.com/tc39/proposal-pipeline-operator">tc39/proposal-pipeline-operator</a></li>
      <li><a href="https://github.com/tc39/proposal-pipeline-operator/blob/main/HISTORY.md">Proposal history</a></li>
      <li><a href="https://docs.google.com/presentation/d/1qiWFzi5dkjuUVGcFXwypuQbEbZk-BV7unX0bYurcQsA/edit#slide=id.p">Pipeline operator For Stage 1 - Daniel Ehrenberg</a></li>
      <li><a href="https://github.com/tc39/proposal-pipeline-operator/issues/89">Discussion: Proposal Mixes</a></li>
      <li><a href="https://github.com/tc39/proposal-pipeline-operator/issues/91">choice of token is not a final decision</a></li>
      <li><a href="https://gist.github.com/tabatkins/1261b108b9e6cdab5ad5df4b8021bcb5">Comparing the three pipeline proposals</a></li>
      <li><a href="https://2020.stateofjs.com/ja-JP/opinions/">State of JS 2020 - 意見</a></li>
    </ul>
    <script nonce={nonce ?? ""}>{lazyload}</script>
  </article>
);

const lazyload = `
  window.addEventListener("DOMContentLoaded", function() {
    var images = [].slice.call(document.querySelectorAll("img"));
    if ("IntersectionObserver" in window) {
      var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      images.forEach(function(image) {
        lazyImageObserver.observe(image, { threshold: 0.2 });
      });
    } else {
      images.forEach(function(img) { img.src = img.dataset.src; })
    }
  }, false)
`;
