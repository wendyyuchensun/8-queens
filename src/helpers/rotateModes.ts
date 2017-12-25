// 原版
const rotateMode0 = (indxs: number[]): number[] => indxs

// 右翻 1 次
const rotateMode1 = (indxs: number[]): number[] => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[7 - indxs[i]] = i
  return newIndxs
}

// 右翻 2 次
const rotateMode2 = (indxs: number[]): number[] => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[indxs[7 - i]] = 7 - i
  return newIndxs
}

// 右翻 3 次
const rotateMode3 = (indxs: number[]): number[] => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[indxs[i]] = 7 - i
  return newIndxs
}

// 全部
const rotateModes = [rotateMode0, rotateMode1, rotateMode2, rotateMode3]

export default rotateModes
