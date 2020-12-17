const tokens = new Map<string, string>([
  ['[', 'L_SQUARE'],
  [']', 'R_SQUARE'],
  ['`', 'BACKQUOTE'],
  ['*', 'ASTAH'],
  ['(', 'L_BRACE'],
  [')', 'R_BRACE'],
  ['#', 'SHARP'],
  [';', 'SEMICORON']
])

const EOS = '#-- EOS --#'

const whitespaces = new Set([
  ' ',
  '\n',
  '\r',
  '\t'
])

export type Token = {
  type: string
  literal: string
}

export class Tokenizer {
  private rawText: string
  // walk by code point
  private readPosition: number = 0;
  // current code point
  private char: string
  private isEnd: boolean = false

  constructor(input: string) {
    this.rawText = input
    this.char = String.fromCodePoint(0)
  }

  *tokenize(): Generator<Token, boolean, Token> {
    while (!this.isEnd) {
      console.log(this.readPosition)
      this.read()
      this.skipWhiteSpace()
      const maybeToken = tokens.get(this.char)
      let token: Token
      if (this.char === EOS) {
        token = {
          type: 'EOS',
          literal: 'EOS',
        }
      } else if (typeof maybeToken === 'undefined') {
        this.readPlainText()
        token = {
          type: 'PLAIN',
          literal: this.char.toString()
        }
      } else {
        token = {
          type: maybeToken,
          literal: this.char.toString()
        }
      }
      yield token
    }
    return true
  }

  skipWhiteSpace() {
    while (whitespaces.has) {
      this.read()
    }
  }

  readPlainText() {
    while (!tokens.has(this.char) || !whitespaces.has(this.char)) {
      const codePoint = this.rawText.codePointAt(this.readPosition)
      if (!codePoint) return
      this.char += String.fromCodePoint(codePoint)
      this.readPosition++
    }
  }

  read() {
    const codePoint = this.rawText.codePointAt(this.readPosition)
    // is end of text if code point is undefined.
    if (typeof codePoint === 'undefined') {
      this.char = EOS
      this.isEnd = true
    } else {
      this.char = String.fromCodePoint(codePoint)
    }
    this.readPosition++
  }
}
