import { h, FC } from "@kajitsu/lemon"

type Props = {
  style?: string
  extendsHead?: h.JSX.Element
}

export const Html: FC<Props> = ({ extendsHead, style, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#353" />
      <meta name="description" content="maxmellon's blog" />
      <title>maxmellon's blog</title>
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="/main.css" />
      <link rel="apple-touch-icon" href="/icon-512x512.png" />
      {extendsHead}
      <style>{style}</style>
    </head>
    <body>
      {children}
    </body>
    {process.env.NODE_ENV === 'production' && <script async src="/register.js" />}
  </html>
)
