import React, { useContext, useState, useRef } from 'react'
import { Stage, Layer, Rect, Group } from 'react-konva'
import Konva from 'konva'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import { Rect as RectType } from 'konva/types/shapes/Rect'
import { Group as GroupType } from 'konva/types/Group'
import { initNumberArray, makeSortItemArray } from '.'
import { BodyWidthContext } from 'layouts/Body'
import './styles.css'

const BubbleSort = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)
  const canvasContainerHeight = 500
  const bodyWidth = useContext(BodyWidthContext)
  const [isSorting, setIsSorting] = useState(false)
  const sortItemRefs = useRef<{ [key: number]: RectType | null }>({})
  const selectedItemRef = useRef<GroupType | null>()
  const sortItems = makeSortItemArray(initNumberArray)
  const sortItemsMax = Math.max(...initNumberArray)
  const barWidth = bodyWidth / (sortItems.length * 2)
  const selectedBarIndicatorWidth = barWidth * 0.6

  const rectangles = sortItems.map(({ id, number }, idx) => {
    const x = barWidth * idx * 2
    const height = canvasContainerHeight * (number / sortItemsMax)
    return (
      <Rect
        key={id}
        x={x}
        y={50}
        ref={el => (sortItemRefs.current[id] = el)}
        width={barWidth}
        height={height}
        fill="#aaa"
      />
    )
  })

  const handleClick = () => {
    if (isSorting) return
    setIsSorting(true)
    const duration = 0.1
    const array = [...sortItems]
    const n = array.length
    let count = 0
    for (let ii = 0; ii < n - 1; ii++) {
      const isLastLap = ii === n - 2

      for (let jj = 0; jj < n - ii - 1; jj++) {
        count++
        const isLastSwapOfLap = jj + 1 === n - ii - 1
        const willSwap = array[jj].number > array[jj + 1].number
        const id1 = array[jj].id
        const id2 = array[jj + 1].id

        // step1. move selected & change selectedBarColor
        window.setTimeout(() => {
          new Konva.Tween({
            node: selectedItemRef.current,
            x: jj * barWidth * 2,
            duration,
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id1],
            fill: '#f00',
            duration,
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id2],
            fill: '#f00',
            duration,
          }).play()
        }, count * duration * 2000)

        count++
        // step2. swap & change selectedBarColor
        window.setTimeout(() => {
          new Konva.Tween({
            node: sortItemRefs.current[id1],
            x: willSwap ? (jj + 1) * barWidth * 2 : jj * barWidth * 2,
            duration,
            onFinish: () => {
              new Konva.Tween({
                node: sortItemRefs.current[id1],
                fill: (isLastSwapOfLap && willSwap) || isLastLap ? '#0f0' : '#aaa',
                duration,
              }).play()
            },
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id2],
            x: willSwap ? jj * barWidth * 2 : (jj + 1) * barWidth * 2,
            duration,
            onFinish: () => {
              new Konva.Tween({
                node: sortItemRefs.current[id2],
                fill: (isLastSwapOfLap && !willSwap) || isLastLap ? '#0f0' : '#aaa',
                duration,
              }).play()
            },
          }).play()

          if (isLastLap) setIsSorting(false)
        }, count * duration * 2000)

        if (willSwap) {
          const temp = array[jj]
          array[jj] = array[jj + 1]
          array[jj + 1] = temp
        }
      }
    }
  }

  return (
    <>
      <Text className="mb-4" variant="h4">
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
          <br />
          The space complexity for Bubble Sort is O(1), because only a single additional memory space is required
        </Text>
      </section>

      <section>
        <Text variant="h6">Visualization</Text>
        <Button className="mb-4" variant="contained" color="primary" onClick={handleClick} disabled={isSorting}>
          See Bubble Sort in action
        </Button>
        <div ref={canvasContainer} className="canvas-container">
          <Stage width={bodyWidth} height={canvasContainerHeight}>
            <Layer>
              <Group ref={el => (selectedItemRef.current = el)}>
                {isSorting && (
                  <>
                    <Rect
                      x={selectedBarIndicatorWidth * 0.2}
                      y={10}
                      width={selectedBarIndicatorWidth}
                      height={10}
                      fill="#f00"
                    />
                    <Rect
                      x={barWidth * 2 + selectedBarIndicatorWidth * 0.4}
                      y={10}
                      width={selectedBarIndicatorWidth}
                      height={10}
                      fill="#f00"
                    />
                  </>
                )}
              </Group>
              {rectangles}
            </Layer>
          </Stage>
        </div>
      </section>
    </>
  )
}

export default BubbleSort
