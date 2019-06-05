import React from 'react'
import Gaussian from './Gaussian2'

export default class Layout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: [1]
    }
  }

  render = () =>
    <div>
      <Gaussian
        value={this.state.value.slice()}
      />
    </div>
}
