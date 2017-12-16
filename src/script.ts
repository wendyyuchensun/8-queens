import './style/style.scss'
// import './logic'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import BoardSet from './presentation/BoardSet'

const sample = [
  [1, 1],
  [2, 2],
  [3, 4],
  [4, 3],
  [6, 5],
  [5, 6],
  [7, 0],
  [4, 7],
]

for (let i = 1; i < 7; i++) {
  const node = document.querySelector(`.sample${i}`)
  ReactDOM.render(React.createElement(BoardSet, { occupiedSpots: sample}), node)
}

Array.from(document.querySelectorAll('.coord-tip')).forEach((tip: any) => {
  const x = parseInt(tip.dataset.x, 10)
  const y = parseInt(tip.dataset.y, 10)
  const queen = tip.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]
    .childNodes[y].childNodes[x].querySelector('.queen')

  tip.addEventListener('mouseover', () => queen.classList.add('hl'))
  tip.addEventListener('mouseout', () => queen.classList.remove('hl'))

  queen.addEventListener('mouseover', () => tip.classList.add('hl'))
  queen.addEventListener('mouseout', () => tip.classList.remove('hl'))

})
