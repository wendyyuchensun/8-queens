import place from './place'

type tallyCb = (sol: number[]) => any

const game = (cb: tallyCb): void => {
  const begin = (new Date()).getTime()

  place(cb)

  const end = (new Date()).getTime()
  // tslint:disable-next-line no-console
  console.log(`Time used: approx. ${((end - begin) / 1000).toFixed(2)} sec`)
}

export default game
