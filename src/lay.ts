import Board from './Board'
import Record from './Record'

const ans = []
const symmetricModes = [
  [0, 0],
  [7, 0],
  [0, 7],
  [7, 7],
]

const rotateModes = [
  ([x, y]: [number, number]): [number, number] => [x, y],
  ([x, y]: [number, number]): [number, number] => [7 - y, x],
  ([x, y]: [number, number]): [number, number] => [7 - y, 7 - x],
  ([x, y]: [number, number]): [number, number] => [y, 7 - x],
]

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

const getSymmetricalAns = (firstAns: Array<[number, number]>) => {
  return symmetricModes.map(mode => {
    return firstAns.map(spot => {
      const x = mode[0] ? (mode[0] - spot[0]) : spot[0]
      const y = mode[1] ? (mode[1] - spot[1]) : spot[1]
      return [x, y]
    })
  })
}

const getRotateAns = (firstAns: Array<[number, number]>) => {
  return rotateModes.map(mode => {
    return firstAns.map(spot => mode(spot))
  })
}

const duplicate = (ans1: Array<[number, number]>, ans2): boolean => {
  // no need to check length since all checked ans has len of 8
  return ans1.every(spot1 => ans2.some(spot2 => spot1[0] === spot2[0] && spot1[1] === spot2[1]))
}

const notDuplicateAns = (existingAnsRepo: Array<Array<[number, number]>>, newAns: Array<[number, number]>): boolean => {
  const allSymAns = getSymmetricalAns(newAns)
  const allRotateAns = getRotateAns(newAns)

  for (const symAns of allSymAns) {
    for (const existingAns of existingAnsRepo) {
      if (duplicate(existingAns, symAns)) return false
    }
  }

  for (const rotateAns of allRotateAns) {
    for (const existingAns of existingAnsRepo) {
      if (duplicate(existingAns, rotateAns)) return false
    }
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
      console.log(ans.length)
      console.log(allTakenSpots)
    }
  } else {
    leftSpots.forEach(leftSpot => {
      const newRecord = new Record(leftSpot, spot)
      lay(newRecord)
    })
  }
}

export default lay
