'use strict'

import * as React from 'react'

export default class Spot extends React.Component {
  public props: any

  public render() {
    return (
      <div className={ `spot${ this.props.gray ? ' gray' : '' }` }>
        { this.renderInnerIconNode() }
      </div>
    )
  }

  private renderInnerIconNode() {
    return this.props.occupied
      ? <div className="queen">♛</div>
      : null
  }
}
