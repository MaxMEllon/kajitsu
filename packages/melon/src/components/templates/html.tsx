import { h, FC } from "@kajitsu/lemon"

export const Html: FC<{ style: string }> = ({ style, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <title>maxmellon's blog</title>
      <link rel="stylesheet" href="/main.css" />
      <style>{style}</style>
    </head>
    <body>
      {children}
    </body>
  </html>
)
