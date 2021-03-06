import assert from 'assert'
import { Tokenizer, Token } from '../tokenizer'

describe("tokenizer", () => {
  it.skip("works", () => {
    const text = `# hoge`
    const tokenizer = new Tokenizer(text)
    const iterator = tokenizer.tokenize()
    let result: Array<Token> = []
    let itr: IteratorResult<Token> = iterator.next()
    while (!itr.done) {
      console.log(itr.value)
      result.push(itr.value)
      itr = iterator.next()
    }
    assert.deepStrictEqual(result, [
      {
        type: 'SHARP',
        literal: '#',
      },
      {
        type: 'PLAIN',
        literal: 'hoge',
      },
      {
        type: 'EOS',
        literal: 'EOS'
      }
    ])
  })
})
