export default class Record {
  public current: any
  public previous: any

  constructor(current: any, previous: any) {
    this.current = current
    this.previous = previous
  }

  public getAllTakenSpots(): Array<[number, number]> {
    const spots: Array<[number, number]> = [this.current]
    let current = this

    while (current.previous) {
      spots.push(current.previous.current)
      current = current.previous
    }

    return spots.reverse()
  }
}
