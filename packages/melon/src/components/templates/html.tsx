import { h, FC } from "@kajitsu/lemon"

type Props = {
  style?: string
}

export const Html: FC<Props> = ({ style, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="theme-color" content="#353" />
      <meta name="description" content="maxmellon's blog" />
      <title>maxmellon's blog</title>
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="/main.css" />
      <link rel="apple-touch-icon" href="/icon-512x512.png" />
      <style>{style}</style>
    </head>
    <body>
      {children}
    </body>
    {process.env.NODE_ENV === 'production' && <script async src="/register.js" />}
  </html>
)
