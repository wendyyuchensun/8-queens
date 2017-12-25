// 扣掉 prev 的對角線
// 與所有 prevs

const getUnavails = (prevs: number[]) => {
  const prevLen = prevs.length

  const tmp = prevs.map((prev, indx) => {
    const offset = prevLen - indx
    return [prev + offset, prev - offset]
  }).reduce((acc, pair) => acc.concat(pair), [])
    .filter(indx => indx < 8 && indx > -1) // 對角線
    .concat(prevs) // prevs

  return new Set(tmp)
}

const getAvails = (prevs: number[]): any[] => {
  let indxs = [0, 1, 2, 3, 4, 5, 6, 7]

  if (!prevs.length) return indxs

  const unavails = getUnavails(prevs)

  unavails.forEach((_, unavailIndx) => indxs = indxs.filter(indx => indx !== unavailIndx))

  return indxs
}

export default getAvails;
