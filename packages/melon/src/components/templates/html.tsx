import { h, FC } from "@kajitsu/lemon"

export const Html: FC<{ style: string }> = ({ style, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="theme-color" content="#353" />
      <meta name="description" content="maxmellon's blog" />
      <title>maxmellon's blog</title>
      <link rel="stylesheet" href="/main.css" />
      <style>{style}</style>
    </head>
    <body>
      {children}
    </body>
  </html>
)
