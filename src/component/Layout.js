import React from 'react'
import Entry from './Entry'
import Gaussian from './Gaussian'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import Koya from '../koya_clear.png'

export default class Layout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // mat: Array.from(new Array(5), () => Array(5).fill('')),
      left: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9]
      ],
      right: [1, 1, 1, 1, 1],
      size: 2,
      arrangedArr:[]
    }
  }

  onChange = (e, i, m) => {
    // console.log(`e : ${e} i : ${i} m : ${m}`)
    let left = this.state.left.slice(),
        right = this.state.right.slice()
    if (m === this.state.size) {
      right[i] = e.target.value
      this.setState({right: right})
    } else {
      left[i][m] = e.target.value
      this.setState({left: left})
    }
    this.makeArrangedArr(left, right, this.state.size)
  }

  makeArrangedArr = (left, right, size) => {
    const arrangedArr = 
      left
        .slice(0, size)
        .map(elem => elem.slice(0, size))
        .map((elem,index) => {
          elem.push(right[index])
          return elem
        })
    this.setState({arrangedArr: arrangedArr})
  }

  componentWillMount () {
    this.makeArrangedArr(this.state.left, this.state.right, this.state.size)
  }

  render(){
    const countOfNull = this.state.arrangedArr.filter(e => e === '').length
    const arrangedArrCopy = JSON.parse(JSON.stringify(this.state.arrangedArr))

    return(
      <div>
        <Title>Gaussian Elimination</Title>
        <form className="dropDown" autoComplete="off">
          <FormControl className="dropDownContents">
            <InputLabel htmlFor="age-simple">Size</InputLabel>
            <Select
              value={this.state.size}
              onChange={ e => {
                this.setState({size: e.target.value})
                this.makeArrangedArr(this.state.left, this.state.right, e.target.value)
              }}
              inputProps={{
                name: 'size',
                id: 'size-switch',
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </form>
        <EntryContainer>
          <Entry
            arr={this.state.arrangedArr}
            size={this.state.size}
            onChange={(e, i, m) => this.onChange(e, i, m)}
          />
        </EntryContainer>
        <hr/>
        <KoyaImgFrame><KoyaImg src={Koya} /></KoyaImgFrame>
        <pre>
          <GausContainer>
            <Gaussian
              mat={arrangedArrCopy}
              size={this.state.size}
              countOfNull={countOfNull}
            />
          </GausContainer>
        </pre>
      </div>
    )
  }
}

const Title = styled.h1`
  display: inline-block;
  font-size: 30px;
  border-bottom: solid 2px gray;
  margin-bottom: 30px;
`
const EntryContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  white-space: nowrap;
`
const KoyaImgFrame = styled.div`
  position: absolute;
  top: 0px;
  right: 20px;
  width: 150px;
  height: 300px;
  animation: wing 1s ease infinite alternate;
  @keyframes wing {
    0% {
      transform: rotate(20deg)
    }
    100% {
      transform: rotate(-20deg)
    }
  }
`
const KoyaImg = styled.img`
  width: 100%;
`
const GausContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 14px;
`