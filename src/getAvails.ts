// 扣掉 prev 的對角線
// 與所有 prevs

const getUnavails = (prevs: number[]): Set => {
  const prevLen = prevs.length

  const tmpSet: number[] =
    prevs.map((prev: number, indx: number): number[] => {
      const offset = prevLen - indx
      return [prev + offset, prev - offset]
    }).reduce((acc: number[], pair: number[]): number[] => acc.concat(pair), [])
      .filter((indx: number): Array<number | null> => indx < 8 && indx > -1) // 對角線
      .concat(prevs) // prevs

  return new Set(tmpSet)
}

const getAvails = (prevs: number[]): Array<number | null> => {
  let indxs = [0, 1, 2, 3, 4, 5, 6, 7]

  if (!prevs.length) return indxs

  const unavails = getUnavails(prevs)

  unavails.forEach((_, unavailIndx: number): void => {
    indxs = indxs.filter((indx: number): boolean => indx !== unavailIndx)
  })

  return indxs
}

export default getAvails;
