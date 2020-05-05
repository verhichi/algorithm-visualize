import React, { useContext, useState, useRef } from 'react'
import { Stage, Layer, Rect, Group } from 'react-konva'
import Konva from 'konva'
import Text from 'components/atoms/Text'
import { initNumberArray, makeSortItemArray } from '.'
import { Rect as RectType } from 'konva/types/shapes/Rect'
import { Group as GroupType } from 'konva/types/Group'
import { BodyWidthContext } from 'layouts/Body'
import './styles.css'

const BubbleSort = () => {
  const width = useContext(BodyWidthContext)
  const [isSorting, setIsSorting] = useState(false)
  const sortItemRefs = useRef<{ [key: number]: RectType | null }>({})
  const selectedItemRef = useRef<GroupType | null>()
  const sortItems = makeSortItemArray(initNumberArray)

  const rectangles = sortItems.map(({ id, number }, idx) => {
    return (
      <Rect
        key={id}
        x={idx * 100}
        y={50}
        ref={el => (sortItemRefs.current[id] = el)}
        width={50}
        height={number}
        fill="#aaa"
      />
    )
  })

  const handleClick = () => {
    setIsSorting(true)
    const duration = 0.15
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
        setTimeout(() => {
          new Konva.Tween({
            node: selectedItemRef.current,
            x: jj * 100,
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
        setTimeout(() => {
          new Konva.Tween({
            node: sortItemRefs.current[id1],
            x: willSwap ? (jj + 1) * 100 : jj * 100,
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
            x: willSwap ? jj * 100 : (jj + 1) * 100,
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
      <Text variant="h4">Bubble Sort</Text>
      <button onClick={handleClick}>SORT</button>
      <div className="canvas-container">
        <Stage width={width} height={window.innerHeight}>
          <Layer>
            <Group ref={el => (selectedItemRef.current = el)}>
              {isSorting && (
                <>
                  <Rect x={10} y={10} width={30} height={10} fill="#f00" />
                  <Rect x={110} y={10} width={30} height={10} fill="#f00" />
                </>
              )}
            </Group>
            {rectangles}
          </Layer>
        </Stage>
      </div>
    </>
  )
}

export default BubbleSort
