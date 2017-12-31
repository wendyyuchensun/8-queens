import rotateModes from './rotateModes'
import symModes from './symModes'

type Mode = (indxs: number[]) => number[]

const getDups = (sol: number[]): Array<number[] | null> => {
  let dups: Array<number[] | null> = []
  const syms = symModes.map((mode: Mode): number[] => mode(sol))

  syms.forEach((sym: number[]): void => {
    dups = dups.concat(rotateModes.map((mode: Mode): number[] => mode(sym)))
  })

  return dups
}

export default getDups
