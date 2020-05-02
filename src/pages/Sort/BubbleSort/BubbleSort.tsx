import React from 'react'
import Text from 'components/atoms/Text'
import { initNumberArray, bubbleSort } from '.'

const BubbleSort = () => (
  <>
    <Text variant="h4">Bubble Sort</Text>
    <Text>{JSON.stringify(initNumberArray)}</Text>
    <Text>{JSON.stringify(bubbleSort(initNumberArray))}</Text>
  </>
)

export default BubbleSort
