import { h, FC } from "@kajitsu/lemon";

export const Article: FC = () => (
  <article id="markdown-root">
    <h1>node modules なし blog を作っている話</h1>
    <p>
      今年の9月頃から，no dependencies で blog を作っています．(devDependencies には，jest と TypeScript を入れています)
      正直，フレームワークを使えば blog くらいならすぐ作れるだろうと思っていたのと，
      フレームワークの使い方を覚えることが自分の成長に大きくつながるとは感じることができず， やっていて楽しい +
      学習する余地がありそうな no dependencies で blog を作ることにしました．
    </p>
    <p>
      リポジトリはこちらです <a href="https://github.com/MaxMEllon/kajitsu">maxmellon/kajitsu</a>
    </p>
    <h2>機能要件を考える</h2>
    <p>ざっくり，自分がほしいなと思った要件を整理すると，</p>
    <ul>
      <li>markdown で記事を書きたい</li>
      <li>blog だけじゃなくて cookie や Cache-Controll header などを検証できる sandbox 環境も併設したい</li>
      <li>Client Side で JavaScript は極力動かさない</li>
      <li>jsx で，ある程度型が効くように</li>
      <li>ただシンプルに html を返すだけで良い，それ以外は一旦後回し</li>
    </ul>
    <p>みたいな感じになった．なので，上記の要件を満たすために以下のモジュールを自作することにした．</p>
    <ul>
      <li>node web framework</li>
      <li>jsx (client side の runtime コードなしでもいい)</li>
      <li>CSS-in-JS (これは，必要かどうかはおいておいて作ってみたかった)</li>
      <li>markdown parser</li>
    </ul>
    <h2>どこまでできたか</h2>
    <h3>node web framework</h3>
    <p>
      express に近いようなインターフェースで作ってみた 現状，ヘルパー的な method がとにかく少なく，毎度 Content-Type
      を自分で書く必要があったりとまだまだ改善の余地がたくさんある． 使い勝手は以下のような感じ
    </p>
    <pre>
      <code>{`// logger middleware
suica.use(async (_ctx, req, _res, next) =&gt; ${"{"}
  console.log(req.method, req.url)
  await next()
${"}"})

suica.use("/", async (_ctx, _req, res) =&gt; ${"{"} 
  res.setHeader("Content-Type", "text/html")
  res.write(\`&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;\`)
  res.end();
${"}"});

!(async () =&gt; ${"{"}
  for await (const [req, res] of on(createServer().listen(3000), "request"))
    suica.run(req, res);
${"}"})();
`}</code>
    </pre>
    <p>
      post リクエストが来たときに，何もしないと body が Buffer 型で入っており，非常に扱いにくいという点． request header
      の content-type を見て，その content-type から Readble から chunk をまとめて適切な object に変換する必要があった．
      何気なく普段使っている express の body-parser ってそういうものなのねという発見があった．
    </p>
    <h3>jsx</h3>
    <p>
      client side の レンダリングの実装は間に合わなかった（今後やる予定） jsx
      自体を作るのは思っている以上に簡単だったが，どちらかというと html および
      その周辺の知識が乏しさに気がつくきっかけとなった
      <br />
      React のような設計指針はなく，シンプルに jsx でテンプレートを書きたい程度にしか思っていない．
    </p>
    <p>
      whatwg html semantics
      の仕様をみながら，どの要素がなんの属性を持つことができるのかを手を動かしながら学べたのは非常に勉強になった．
      <a href="https://html.spec.whatwg.org/multipage/dom.html#global-attributes">Global Attributes</a> や，
      <a href="https://html.spec.whatwg.org/multipage/microdata.html#microdata">マイクロデータ</a>，{" "}
      <a href="https://www.w3.org/TR/wai-aria-1.1/">WAI-ARIA</a>，各要素のセマンティクス，正しい html
      とはなにか，いかに普段我々の書く html が雑なものかを考えさせられるきっかけになった．
    </p>
    <h3>CSS-in-JS</h3>
    <p>
      これに至っては，なんとなく動くものは作れたが... コンポーネント軸で開発をすすめると セレクタ詳細度
      がごちゃついて辛いのはわかるけれどそれを解決するのが CSS-in-JS なのかは割と今でも疑問．
      <br />↓ こんな感じで一応普通に使える
    </p>
    <pre>
      <code>{`export const Header: FC = ({ children }) => (
  &lt;Header&gt;
    {headerContents}
  &lt;/Header&gt;
);

const Header = styled('header')\`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--header-color);
  height: 40px;
  color: white;
\``}</code>
    </pre>
    <h3>markdown-parser</h3>
    <p>
      アドベントカレンダーリリースまでに間に合わなかった．
      正規表現でやるような実装にはしたくなく，パーサーを名乗るのであればちゃんと字句解析，意味解析をしようとしている．
      いまは，簡単な字句解析までができている．
    </p>
    <p>また，jsx で markdown を扱うとき次のように無駄な処理が入ることに課題を感じていた</p>
    <pre>
      <code>{`markdown - [parse] - AST(?) -> [render] -> html -> [parse] -> VDOM - [render] -> html`}</code>
    </pre>
    <p>
      markdown の AST 定めて その AST を VDOM に変換できれば，無駄にhtml を parseする必要がなくなる． jsx, VDOM
      を自作しているからこそできることだと思う
    </p>
    <pre>
      <code>{`markdown - [parse] -> AST -> [process] -> VDOM -> [render] -> html`}</code>
    </pre>
    <p>
      VDOM を使っているのに，VDOM ではなく，html を パースしてよしなに加工したり，critcal path をあれこれしたりする
      無駄なことをしているツールが世の中に多いので，もっと VDOM に親和性が高い linter であったり，optimizer
      であったりを作る必要があるなと感じている．それには，html を json で表記するような標準の format
      が必要なのかもしれない？
    </p>
    <h2>これからやること</h2>
    <h3>エンハンス開発</h3>
    <ul>
      <li>自作 jsx によって作られたコンポーネントカタログ (ちょっとだけ動くくらいまで作っている)</li>
      <li>テストランナーの自作</li>
      <li>VDOM linter</li>
      <li>新しいjsx定義への変更</li>
      <li>
        brotli するための middleware (for 自作 node web fromework)
        <ul>
          <li>zlib に入ったのは本当にありがたい</li>
          <li>もちろん gzip, deflate への fallback も実装する</li>
        </ul>
      </li>
      <li>markdown内の syntax highlighter 実装</li>
    </ul>
    <h3>ログ基盤の構築</h3>
    <p>
      インフラ周りのツールを自作するかどうかは悩んでいるが，もうリリースしてしまったので取り急ぎ fluentd から Cloud
      Logging にログを流し込めるようにしたい これは，年内にも終わらせる
    </p>
    <h3>サーバ監視</h3>
    <p>mackerel が個人だと無料で使えて良さそう</p>
    <h3>CSP のレポート先エンドポイントの実装</h3>
    <p>個人的にどんな CSP違反 が起きているのか見てみたい</p>
    <h2>感想</h2>
    <p>
      html を node
      で返すというフレームワークを使えば秒でおわりそうなものを，仕様を読み込んだりしながら三ヶ月くらいかけて作ってきました．
      何より一番よかったのはすごく楽しかったという点．なかなか，業務ではこういった開発はできないのでとても新鮮でよかったところです．
      この開発を通して，世の中に出ている ライブラリがどのように作られていたりとか，html
      の仕様とか学習できたのじゃないかと思います．
      そして，いかに標準APIを使いこなせていないか，知らないかが明らかになりました．
      また，ライブラリを採択するときにも，内部実装をみて筋が良いかどうかを判断するというのがこの開発を通して増えてきたと思う．
      例えば，正規表現ベースのマークダウン系のライブラリだったり，オブザーバブルパターンを実装するためだけに Proxy
      を使っているものだったりと，「本当にそれ必要？」ってより具体的に問うことが以前に比べると成長できた点じゃないかなとおもいます．
    </p>
    <p>
      この開発では，whatwg の仕様を読むことのきっかけにはなったが，肝心の JavaScript
      の仕様を読むきっかけにはならなかったので， 今後は，JavaScript
      の仕様にも目を通して手続き一つ一つにも疑問を問いかけながら開発を楽しんでいきたいなと思いました．
    </p>
    <p>
      そして，仕様を読むきっかけになるというのは初めてスタート地点に立てたことであり，このレベルで満足せずもっと仕様を読み込んで
      真の意味で<em>「正しいものを正しく作る」</em>エンジニアを目指していきたい ．
    </p>
  </article>
);
