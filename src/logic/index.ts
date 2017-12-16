'use strict'

import lay from './lay'
import Record from './Record'

// 只需要測一排就夠了
window.onload = () => {
  const startTime = Date.now()

  for (let i = 0; i < 3; i++) {
    const init = new Record([0, i], null)
    lay(init)
  }

  const endTime = Date.now()
  const timeLapse = Math.round((endTime - startTime) / (1000 * 60))
}
