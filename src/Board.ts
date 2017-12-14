export default class Board {
  private static modes = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]

  public board: Array<[number, number]>

  constructor() {
    this.board = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.board.push([i, j])
      }
    }
  }

  public removeOccupied(occupiedSpace: number[]): void {
    if (this.validSpace(occupiedSpace)) {
      const matchFunc = this.matchFuncFact(occupiedSpace)
      const targetIndx = this.board.findIndex(matchFunc)
      if (targetIndx > -1) this.board.splice(targetIndx, 1)
    }
  }

  public removeAllOccupied(layedSpace: [number, number]): void {
    this.removeOccupied(layedSpace)

    Board.modes.forEach(mode => {
      let neighborSpace = this.getNeighborSpace(layedSpace, mode)
      while (this.validSpace(neighborSpace)) {
        this.removeOccupied(neighborSpace)
        neighborSpace = this.getNeighborSpace(neighborSpace, mode)
      }
    })
  }

  private validSpace(space: number[]): boolean {
    return !(space.some(indx => indx < 0 || indx >= 8))
  }

  private matchFuncFact(occupiedSpace: number[]) {
    return (leftSpace: number[]): boolean => leftSpace[0] === occupiedSpace[0] && leftSpace[1] === occupiedSpace[1]
  }

  private getNeighborSpace(space: number[], mode: number[]): number[] {
    return [space[0] + mode[0], space[1] + mode[1]]
  }
}
