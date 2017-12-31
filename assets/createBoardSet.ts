let no = 1

const createNo = (): HTMLElement => {
  const noRoot = document.createElement('DIV')
  noRoot.classList.add('no')
  noRoot.innerHTML = no.toString()

  no++

  return noRoot
}

const createSqr = (black: boolean, queen: boolean): HTMLElement => {
  const sqr = document.createElement('DIV')
  sqr.classList.add('sqr')

  if (black) sqr.classList.add('black')
  if (queen) sqr.innerHTML = '♛'

  return sqr
}

const createRow = (rowIdx: number, queenIndx: number): HTMLElement => {
  const rowRoot = document.createElement('DIV')
  rowRoot.classList.add('row')

  for (let i = 0; i < 8; i++) {
    const black = (i % 2) === (rowIdx % 2)
    const queen = i === queenIndx
    const sqr = createSqr(black, queen)

    rowRoot.appendChild(sqr)
  }

  return rowRoot
}

const createBoard = (sol: number[]): HTMLElement => {
  const boardRoot = document.createElement('DIV')
  boardRoot.classList.add('board')

  for (let i = 0; i < 8; i++) boardRoot.appendChild(createRow(i, sol[i]))

  return boardRoot
}

const createTip = (...indxs: number[]): HTMLElement => {
  const tip = document.createElement('DIV')
  tip.classList.add('tip')
  tip.innerHTML = `(${indxs.join(', ')})`

  return tip
}

const createTips = (sol: number[]): HTMLElement => {
  const tipsRoot = document.createElement('DIV')
  tipsRoot.classList.add('tips')

  for (let i = 0; i < 8; i++) tipsRoot.appendChild(createTip(sol[i], i))

  return tipsRoot
}

const createBoardSet = (sol: number[]): HTMLElement => {
  const boardSet = document.createElement('DIV')
  boardSet.classList.add('board-set')

  boardSet.appendChild(createNo())
  boardSet.appendChild(createBoard(sol))
  boardSet.appendChild(createTips(sol))

  return boardSet
}

export default createBoardSet
