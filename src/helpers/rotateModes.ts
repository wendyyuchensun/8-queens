type rotateMode = (indxs: number[]) => number[]

// 原版
const rotateMode0: rotateMode = (indxs: number[]) => indxs

// 右翻 1 次
const rotateMode1: rotateMode = (indxs: number[]) => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[7 - indxs[i]] = i
  return newIndxs
}

// 右翻 2 次
const rotateMode2: rotateMode = (indxs: number[]) => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[indxs[7 - i]] = 7 - i
  return newIndxs
}

// 右翻 3 次
const rotateMode3: rotateMode = (indxs: number[]) => {
  const newIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newIndxs[indxs[i]] = 7 - i
  return newIndxs
}

// 全部
const rotateModes: rotateMode[] = [rotateMode0, rotateMode1, rotateMode2, rotateMode3]

export default rotateModes
