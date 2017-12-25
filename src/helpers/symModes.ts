// 原版
const symMode0 = (indxs: number[]): number[] => indxs

// 上下翻
const symMode1 = (indxs: number[]): number[] => indxs.map(indx => 7 - indx)

// 左右翻
const symMode2 = (indxs: number[]): number[] => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[i] = indxs[7 - i]
  return newIndxs
}

// 上下 + 左右
const symMode4 = (indxs: number[]): number[] => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[7 - indxs[i]] = i
  return newIndxs.map(indx => 7 - indx)
}

// 全部
const symModes = [symMode0, symMode1, symMode2, symMode4]

export default symModes
