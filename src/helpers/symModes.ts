type SymMode = (indxs: number[]) => number[]

// 原版
const symMode0: SymMode = (indxs: number[]) => indxs

// 上下翻
const symMode1: SymMode = (indxs: number[]) => indxs.map(indx => 7 - indx)

// 左右翻
const symMode2: SymMode = (indxs: number[]) => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[i] = indxs[7 - i]
  return newIndxs
}

// 上下 + 左右
const symMode4: SymMode = (indxs: number[]) => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[7 - indxs[i]] = i
  return newIndxs.map(indx => 7 - indx)
}

// 全部
const symModes: SymMode[] = [symMode0, symMode1, symMode2, symMode4]

export default symModes
