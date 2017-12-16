// tslint:disable max-classes-per-file
'use strict'

import * as React from 'react'
import Spot from './Spot'

const xor = (x: number, y: number): boolean => (x || y) && !(x && y)

class Row extends React.Component {
  public props: any

  public render() {
    const { rowIndx, occupiedSpot } = this.props

    const spots = (new Array(8)).fill(0).map((col, colIndx) => {
      return React.createElement(Spot, {
        gray: xor(rowIndx % 2, colIndx % 2),
        key: colIndx,
        occupied: colIndx === occupiedSpot,
      })
    })

    return (
      <div className="row">
        { spots }
      </div>
    )
  }
}

class Board extends React.Component {
  public static pendingNode = <div className="pending">pending...</div>
  public props: any

  public render() {
    if (this.props.pending) return Board.pendingNode

    const rows = (new Array(8)).fill(0)
      .map((row, rowIndx) => {
        return React.createElement(Row, {
          key: `row-${rowIndx}`,
          occupiedSpot: this.props.occupiedSpots.find(([x, y]: [number, number]) => y === rowIndx)[0],
          rowIndx,
        })
      })

    return (
      <div className="board">
        { rows }
      </div>
    )
  }
}

let key = 0

const renderRulerNodes = () => (new Array(8)).fill(0).map((col, colIndx) => {
  key++
  return <div className="coord" key={ key }>
    <div className="coord-num">{ colIndx }</div>
  </div>
})

const topRulerNode = [<div className="coord" key="empty"></div>].concat(renderRulerNodes())

const rulerNode = renderRulerNodes()

const coordList = (coord: [number, number], indx: number) => {
  return (
    <div className="coord-tip" key={ indx } data-x={ coord[0] } data-y={ coord[1] }>
      { coord.join(', ') }
    </div>
  )
}

let num = 0;

export default class BoardSet extends React.Component {
  public props: any

  public render() {
    const board = React.createElement(Board, { occupiedSpots: this.props.occupiedSpots })
    const coordNodes = this.props.occupiedSpots.map((spot: [number, number], indx: number) => coordList(spot, indx))

    if (this.props.pending) return board

    num++;

    return (
      <div className="board-set-container">
        <div className="ans-no">
           <span>{ num }</span>
        </div>
        <div className="board-set">
          <div className="top-ruler">{ topRulerNode }</div>
          <div className="bottom-ruler-board">
            <div className="left-ruler">{ rulerNode }</div>
            { board }
          </div>
        </div>
        <div className="coord-list">
          <div className="coord-list-inner">
            { coordNodes }
          </div>
        </div>
      </div>
    )
  }
}
