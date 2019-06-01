// 引数は2重配列。返り値は引数の少数第3位までのパディングされた文字列
const arrayRounder = arr =>
  arr.map(elemOuter =>
    elemOuter.map(elemInner => {
      if (elemInner < 10000) {
        if (elemInner !== 0) elemInner = Math.round(elemInner * 1000) / 1000
        return (`       ` + elemInner).slice(-8)
      } else {
        return Math.round(elemInner)
      }
    }))

const rounder = num => { if (num !== 0) return Math.round(num * 1000) / 1000 }

const addMatrix = ({ matrix, matrixSize }) => {
  const strMatrix = arrayRounder(matrix)
  switch (matrixSize) {
    case 2 :
      outputStr +=
        `| ${strMatrix[0][0]} ${strMatrix[0][1]} | ${strMatrix[0][2]} |\n` +
        `| ${strMatrix[1][0]} ${strMatrix[1][1]} | ${strMatrix[1][2]} |\n\n`
      break

    case 3 :
      outputStr +=
        `| ${strMatrix[0][0]} ${strMatrix[0][1]} ${strMatrix[0][2]} | ${strMatrix[0][3]} |\n` +
        `| ${strMatrix[1][0]} ${strMatrix[1][1]} ${strMatrix[1][2]} | ${strMatrix[1][3]} |\n` +
        `| ${strMatrix[2][0]} ${strMatrix[2][1]} ${strMatrix[2][2]} | ${strMatrix[2][3]} |\n\n`
      break
  }
}

const rowReduction = (matrix, matrixSize) => {
  let Mat = {
    matrix: ``,
    matrixSize: 0,
    operationType: 0,
    row: 0,
    subTargetRow: 0
  }

  Mat.matrix = matrix
  Mat.matrixSize = matrixSize

  addMatrix(Mat)

  outputStr += `----------------------------------------------------\n\n`

  let tempMatrix

  switch (Mat.matrixSize) {
    case 2 :
      tempMatrix = [[0, 0], [0, 0]]
      break

    case 3 :
      tempMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
      break
  }

  for (Mat.row = 1; Mat.row <= Mat.matrixSize; Mat.row++) {
    const rowCross = Mat.matrix[Mat.row - 1][Mat.row - 1]

    if (Mat.row < Mat.matrixSize && rowCross === 0 && Mat.matrix[Mat.row][Mat.row - 1] !== 0) { // 対角要素が0なら入れ替え
      Mat.operationType = 1 // ${row}行目と${row + 1}行目を入れ替える
      printer(Mat)
      for (let column = 0; column <= Mat.matrixSize; column++) {
        tempMatrix[Mat.row - 1][column] = Mat.matrix[Mat.row - 1][column]
        Mat.matrix[Mat.row - 1][column] = Mat.matrix[Mat.row][column]
        Mat.matrix[Mat.row][column] = tempMatrix[Mat.row - 1][column]
      }
    }
    if (rowCross !== 0 && rowCross !== 1) {
      Mat.operationType = 2 // row-1 行目を matrix[row-1][row-1] で割わる
      printer(Mat)
      for (let column = 0; column <= Mat.matrixSize; column++) {
        Mat.matrix[Mat.row - 1][column] = Mat.matrix[Mat.row - 1][column] / rowCross
      }
    }

    // ここまででMat.rowの対角成分は1になっている

    for (Mat.subTargetRow = 1; Mat.subTargetRow <= Mat.matrixSize; Mat.subTargetRow++) {
      if (Mat.subTargetRow !== Mat.row && Mat.matrix[Mat.subTargetRow - 1][Mat.row - 1] !== 0 && rowCross !== 0) {
        if (Mat.matrix[Mat.subTargetRow - 1][Mat.row - 1] === 1) {
          Mat.operationType = 3 // ${row - 1}行目から${row}行目を引く 1倍させないため
          printer(Mat)
        } else if (Mat.matrix[Mat.subTargetRow - 1][Mat.row - 1] !== 0) {
          Mat.operationType = 4 // ${row - 1}行目から${matrix[row - 1][row]}倍した${row}行目を引く
          printer(Mat)
        } else {
          continue
        }

        const times = Mat.matrix[Mat.subTargetRow - 1][Mat.row - 1]

        for (let column = Mat.row - 1; column <= Mat.matrixSize; column++) {
          Mat.matrix[Mat.subTargetRow - 1][column] = Mat.matrix[Mat.subTargetRow - 1][column] - times * Mat.matrix[Mat.row - 1][column]
        }
      }
    }
  }

  outputStr += `----------------------------------------------------\n\n`

  addMatrix(Mat)

  rankDiscriminator(Mat)
}

const printer = ({ matrix, matrixSize, operationType, row, subTargetRow }) => {
  let strMatrix = arrayRounder(matrix)

  for (let m = 0; m < matrixSize; m++) {
    switch (matrixSize) {
      case 2 :
        outputStr += `\n| ${strMatrix[m][0]} ${strMatrix[m][1]} | ${strMatrix[m][2]} |`
        break
      case 3 :
        outputStr += `\n| ${strMatrix[m][0]} ${strMatrix[m][1]} ${strMatrix[m][2]} | ${strMatrix[m][3]} |`
        break
    }
    if (m === row - 1) {
      switch (operationType) {
        case 1 :
          outputStr += `  ${row}行目と${row + 1}行目を入れ替える`
          break
        case 2 :
          outputStr += `  ${row}行目を${rounder(matrix[row - 1][row - 1])}で割わる`
          break
        case 3 :
          outputStr += `  ${subTargetRow}行目から${row}行目を引く`
          break
        case 4 :
          outputStr += `  ${subTargetRow}行目から${rounder(matrix[subTargetRow - 1][row - 1])}倍した${row}行目を引く`
          break
      }
    }
  }
  outputStr += '\n\n'
}

const rankDiscriminator = ({ matrix, matrixSize }) => {
  // 引数は正方行列

  let rank = matrixSize
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (matrix[row][column] !== 0) break
      if (column === matrixSize - 1) rank -= 1
    }
  }
  if (rank === 0) {
    outputStr += `ランクは${rank}で解が存在しない零行列。\n`
  } else if (rank !== matrixSize) {
    if (matrix[matrixSize - 1][matrixSize] === 0) outputStr += `ランクは${rank}で,解が無数に存在する。\n`
    else outputStr += `ランクは${rank}で、解が存在しない。\n`
  } else {
    outputStr += `ランクは${rank}で唯一解が存在する。\n`
  }
}

let outputStr = ``

let X = [
  [0, 0, 0, 0],
  [0, 1, 0, 3],
  [0, 0, 0, 1]
]
let matrixSize = 3
rowReduction(X, matrixSize)

console.log(outputStr)
