import React from 'react'
import styled from 'styled-components'

const Entry = props => {
  const strList = ['a', 'b', 'c', 'd', 'e']
  let outputArr = []
  for (let i = 0; i < props.size; i++) {
    for (let m = 0; m <= props.size; m++) {
      const key = `${i}${m}`
      // console.log(`props.arr[${i}][${m}] : ${props.arr[i][m]}`)
      if (m === props.size) {
        outputArr.push(' =',
          <Input
            value={props.arr[i][m]}
            key={key}
            type='text'
            onChange={(e) => props.onChange(e, i, m)}
          />
        )
      } else {
        if (m !== 0) {
          outputArr.push(' +')
        }
        outputArr.push(
          <Input
            value={props.arr[i][m]}
            key={key}
            type='text'
            onChange={(e) => props.onChange(e, i, m)}
          />,
          <Mini key={key + '001'}>
            <MiniStr key={key + '002'}>{strList[m]}</MiniStr>
            <MiniNum key={key}>{i + 1}</MiniNum>
          </Mini>
        )
      }
    }
    outputArr.push(<br key={i}/>)
  }
  return (
    <div>
      {outputArr}
    </div>
  )
}

export default Entry

const Input = styled.input`
  margin: 6px;
  width: 40px;
`
const Mini = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 0 1px;
`
const MiniStr = styled.span`
  font-size: 14px;
`
const MiniNum = styled.span`
  position: absolute;
  font-size: 7px;
  top: 5px;
  padding: 2px;
`

