import { SortItemType } from '..'

export const bubbleSort = (array: number[]) => {
  const returnArray = [...array]
  const n = array.length
  for (let ii = 0; ii < n - 1; ii++) {
    for (let jj = 0; jj < n - ii - 1; jj++) {
      if (returnArray[jj] > returnArray[jj + 1]) {
        const temp = returnArray[jj]
        returnArray[jj] = returnArray[jj + 1]
        returnArray[jj + 1] = temp
      }
    }
  }
  return returnArray
}

export const makeSortItemArray = (array: number[]): SortItemType[] => array.map((number, idx) => ({ id: idx, number }))
