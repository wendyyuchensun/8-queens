import duplicated from './helpers/duplicated'
import getDups from './helpers/getDups'

const sols: Array<number[] | null> = []

type tallyCb = (sol: number[]) => any

const tally = (newSol: number[], cb: tallyCb | undefined): void => {
  // 製造各種對稱旋轉解，並測試重複
  const dups = getDups(newSol)
  const isDuplicated = sols.some((sol: number[]): boolean => {
    return dups.some((dup: number[]): boolean => duplicated(dup, sol))
  })

  if (isDuplicated) return
  sols.push(newSol)

  if (cb) {
    cb(newSol)
  } else {
    console.log(`${sols.length}.`)
    console.log(newSol)
  }
}

export default tally
