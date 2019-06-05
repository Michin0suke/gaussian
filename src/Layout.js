import React from 'react'

export default class Layout extends React.Component {
  render () {
    let list = []
    let data = [
      { text: '1' },
      { text: '2' }
    ]

    for (let i in data) {
      list.push(<li>{data[i].text}</li>)
    }

    return (
      <ul>
        {list}
      </ul>
    )
  }
}