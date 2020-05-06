import React, { useState, ChangeEvent } from 'react'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import Input from 'components/molecules/Input'
import BubbleSortCanvas from './components/organisms/BubbleSortCanvas'
import { initArrayString, parseStringToNumberArray } from '.'
import './styles.css'

const BubbleSort = () => {
  const [isSorting, setIsSorting] = useState(false)
  const [numberArrayString, setNumberArrayString] = useState(initArrayString)
  const [duration, setDuration] = useState(100)
  const numbers = parseStringToNumberArray(numberArrayString)

  const handleChangeNumberArrayString = (e: ChangeEvent<HTMLInputElement>) => setNumberArrayString(e.target.value)
  const handleChangeDuration = (e: ChangeEvent<HTMLInputElement>) => setDuration(parseInt(e.target.value))

  const handleClickSort = () => setIsSorting(true)
  const handleSortEnd = () => setIsSorting(false)

  return (
    <>
      <Text className="mt-1 mb-4" variant="h4">
        Bubble Sort
      </Text>

      <section className="mb-4">
        <Text variant="h6">Abstract</Text>
        <Text variant="body2">
          The Bubble Sort is probably the most simple of the sort algorithms.
          <br />
          <br />
          If the given array has to be sorted in ascending order, then bubble sort will start by comparing the first
          element of the array with the second element, if the first element is greater than the second element, it will
          swap both the elements, and then move on to compare the second and the third element, and so on.
        </Text>
      </section>

      <section className="mb-4">
        <Text variant="h6">Complexity</Text>
        <Text variant="body2">
          The time complexity of Bubble Sort is O(n2). The main advantage of Bubble Sort is the simplicity of the
          algorithm.
          <br />
          The space complexity for Bubble Sort is O(1), because only a single additional memory space is required.
        </Text>
      </section>

      <section>
        <Text variant="h6">Visualization</Text>
        <Input
          className="mb-2"
          label="Comma separated list of numbers"
          value={numberArrayString}
          onChange={handleChangeNumberArrayString}
          variant="filled"
          fullWidth
          disabled={isSorting}
        />
        <Input
          className="mb-2"
          label="Time per Step(ms)"
          type="number"
          value={duration}
          onChange={handleChangeDuration}
          variant="filled"
          disabled={isSorting}
        />
        <Button className="mb-4" variant="contained" color="primary" onClick={handleClickSort} disabled={isSorting}>
          See Bubble Sort in action
        </Button>
        <BubbleSortCanvas numbers={numbers} duration={duration} isSorting={isSorting} onSortEnd={handleSortEnd} />
      </section>
    </>
  )
}

export default BubbleSort
