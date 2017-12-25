import duplicated from './helpers/duplicated'
import getDups from './helpers/getDups'

const sols = []

const tally = (newSol: number[]): void => {
  // 製造各種對稱旋轉解
  const dups = getDups(newSol)
  // tslint:disable-next-line no-shadowed-variable
  const d = sols.some(sol => dups.some(dup => duplicated(dup, sol)))

  if (!d) {
    sols.push(newSol)
    // tslint:disable no-console
    console.log(`${sols.length}.`)
    console.log(newSol)
  }
}

export default tally
