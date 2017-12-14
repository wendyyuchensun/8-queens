import Board from './Board'
import Record from './Record'

const ans = []

const constructBoardFrom = (record: Record): Array<[number, number]> => {
  const board = new Board()

  if (record.current) {
    let currentRecord = record
    while (currentRecord && currentRecord.current) {
      board.removeAllOccupied(currentRecord.current)
      currentRecord = currentRecord.previous
    }
  }

  return board.board
}

const getSymmetricalAns = ([x, y]: [number, number]): Array<[number, number]> => {
  return [
    [x, y],
    [7 - x, y],
    [x, 7 - y],
    [7 - x, 7 - y],
  ]
}

const duplicate = (ans1: Array<[number, number]>, ans2: Array<[number, number]>): boolean => {
  // TODO
  // no need to check length since all checked ans has len of 8
  return ans1.every(spot1 => ans2.some(spot2 => spot1[0] === spot2[0] && spot1[1] === spot2[1]))
}

const notDuplicateAns = (existingAnsRepo: Array<Array<[number, number]>>, newAns: Array<[number, number]>): boolean => {
  for (const existingAns of existingAnsRepo) {
    if (duplicate(existingAns, newAns)) return false
  }

  return true
}

const lay = (spot: any): void => {
  const leftSpots = constructBoardFrom(spot)

  if (leftSpots.length === 1) {
    const newRecord = new Record(leftSpots[0], spot)
    const allTakenSpots = newRecord.getAllTakenSpots()

    // denote answer
    if (allTakenSpots.length === 8 && notDuplicateAns(ans, allTakenSpots)) {
      ans.push(allTakenSpots)
    }
  } else {
    leftSpots.forEach(leftSpot => {
      const newRecord = new Record(leftSpot, spot)
      lay(newRecord)
    })
  }
}

export default lay
