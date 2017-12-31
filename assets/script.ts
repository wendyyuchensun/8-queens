import game from '../src/game'
import createBoardSet from './createBoardSet'

const root = document.querySelector('main')
const tallyCb = (sol: number[]): HTMLElement => root.appendChild(createBoardSet(sol))

game(tallyCb)
