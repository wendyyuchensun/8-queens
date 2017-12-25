import rotateModes from './rotateModes'
import symModes from './symModes'

const getDups = (sol: number): number[][] => {
  const dups = []
  const syms = symModes.map(mode => mode(sol))

  syms.forEach(sym => dups = dups.concat(rotateModes.map(mode => mode(sym))))

  return dups
}

export default getDups
