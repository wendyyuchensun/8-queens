import duplicated from './helpers/duplicated'
import getDups from './helpers/getDups'

const sols: Array<number[] | null> = []

const tally = (newSol: number[]): void => {
  // 製造各種對稱旋轉解，並測試重複
  const dups = getDups(newSol)
  const isDuplicated = sols.some((sol: number[]): boolean => {
    return dups.some((dup: number[]): boolean => duplicated(dup, sol))
  })

  if (isDuplicated) return
  sols.push(newSol)

  // tslint:disable no-console
  console.log(`${sols.length}.`)
  console.log(newSol)
}

export default tally
