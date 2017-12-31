import place from './place'

type tallyCb = (sol: number[]) => any
type timeLogCb = (time: number | string) => any

const game = (cb?: tallyCb, timeCb?: timeLogCb): void => {
  const begin = (new Date()).getTime()

  place(cb)

  const end = (new Date()).getTime()
  const timeUsed = ((end - begin) / 1000).toFixed(2)

  if (timeCb) {
    timeCb(timeUsed)
  } else {
    console.log(`Time used: approx. ${timeUsed} sec`)
  }
}

export default game
