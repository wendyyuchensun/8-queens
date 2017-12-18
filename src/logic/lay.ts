import * as React from 'react'
import * as ReactDOM from 'react-dom'

import BoardSet from '../presentation/BoardSet'

const allIndx = [0, 1, 2, 3, 4, 5, 6, 7]

const remove = (a: number[], b: number[]) => {
  return a.filter(aIndx => b.indexOf(aIndx) === -1)
}

const sols: number[][] = []

const symMode1 = (layedIndxs: number[]): number[] => layedIndxs

const symMode2 = (layedIndxs: number[]): number[] => {
  return layedIndxs.map(indx => 7 - indx)
}

const symMode3 = (layedIndx: number[]): number[] => {
  const newLayedIndxs = new Array(8)
  for (let i = 0; i < 8; i++) {
    newLayedIndxs[7 - i] = i
  }
  return newLayedIndxs
}

const symMode4 = (layedIndx: number[]): number[] => {
  const newLayedIndxs = new Array(8)
  for (let i = 0; i < 8; i++) {
    newLayedIndxs[7 - layedIndx[i]] = i
  }
  return newLayedIndxs.map(indx => 7 - indx)
}

const symModes = [symMode1, symMode2, symMode3, symMode4]

const rotateMode1 = (layedIndxs: number[]): number[] => layedIndxs

const rotateMode2 = (layedIndxs: number[]): number[] => {
  const newLayedIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newLayedIndxs[7 - layedIndxs[i]] = i
  return newLayedIndxs
}

const rotateMode3 = (layedIndxs: number[]): number[] => {
  const newLayedIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newLayedIndxs[layedIndxs[7 - i]] = 7 - i
  return newLayedIndxs
}

const rotateMode4 = (layedIndxs: number[]): number[] => {
  const newLayedIndxs = new Array(8)
  for (let i = 0; i < 8; i++) newLayedIndxs[layedIndxs[i]] = 7 - i
  return newLayedIndxs
}

const rotateModes = [rotateMode1, rotateMode2, rotateMode3, rotateMode4]

const testDuplicate = (layedIndxs: number[]): boolean => {
  const allDuplicates = rotateModes
    .map(mode => mode(layedIndxs))
    .reduce((allDuplicatesAns: number[][], indxs) => {
      symModes.forEach(symMode => allDuplicatesAns.push(symMode(indxs)))
      return allDuplicatesAns
    }, [])

  let duplicated = false

  allDuplicates.forEach(duplicate => {
    if (sols.some(sol => sol.every((s, i) => s === duplicate[i]))) {
      duplicated = true
    }
  })

  return duplicated
}

const cross = (indx: number, col: number, layCol: number): number[] => {
  const offset = layCol - col
  return [indx + offset, indx - offset]
}

const allCross = (layedIndxs: number[]): number[] => {
  let allCrossIndxs: number[] = []
  for (let i = 0; i < layedIndxs.length; i++) {
    const crossIndxs = cross(layedIndxs[i], i, layedIndxs.length)
    allCrossIndxs = allCrossIndxs.concat(crossIndxs)
  }
  return allCrossIndxs.filter(indx => indx < 8 && indx > -1)
}

let num = 0;

const place = (...layedIndxs: number[]): void => {
  const lastLayedIndx = layedIndxs[layedIndxs.length - 1]
  const leftIndxs = remove(allIndx, layedIndxs)
  const usableIndxs = remove(leftIndxs, allCross(layedIndxs))

  if (usableIndxs.length) {
    for (const usableIndx of usableIndxs) {
      place(...layedIndxs, usableIndx)
    }
  } else {
    if (layedIndxs.length === 8 && !testDuplicate(layedIndxs)) {
      num++
      console.log(layedIndxs)
      sols.push(layedIndxs)

      const allTakenSpots = layedIndxs.map((row, col) => [col, row])

      const root = document.querySelector('.root')
      const boardSet = React.createElement(BoardSet, { occupiedSpots: allTakenSpots })
      const boardNode = document.createElement('DIV')
      root.appendChild(boardNode)

      ReactDOM.render(boardSet, boardNode)
    }
  }
}

const start: number = Date.now()

place(0)
place(1)
place(2)
place(3)
place(4)
place(5)
place(6)
place(7)

const end: number = Date.now()

console.log(num)
console.log((end - start) / 1000)
