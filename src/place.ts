import getAvails from './getAvails'
import tally from './tally'

const place = (...prevs: number[]): void => {
  const avails = getAvails(prevs)

  // 如果下一行還有可放的空位，繼續試
  // 如果沒有，要已經擺了 8 個的才可以送到答案紀錄（tally）去
  // 過濾對稱與旋轉解的工作交給答案紀錄處理
  if (avails.length) avails.forEach((avail: number): void => place(...prevs, avail))
  else if (prevs.length === 8) tally(prevs)
}

export default place
