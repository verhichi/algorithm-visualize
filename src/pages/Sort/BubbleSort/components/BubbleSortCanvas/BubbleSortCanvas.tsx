import React, { useContext, useRef, useEffect, useState } from 'react'
import { Rect, Group } from 'react-konva'
import Konva from 'konva'
import { Rect as RectType } from 'konva/types/shapes/Rect'
import { Group as GroupType } from 'konva/types/Group'
import Canvas from 'components/molecules/Canvas'
import { BodyWidthContext } from 'layouts/Body'
import { makeSortItemArray } from '.'

type Props = {
  numbers: number[]
  duration: number
  isSorting: boolean
  onSortEnd: () => void
}

export const BubbleSortCanvas = ({ numbers, duration, isSorting, onSortEnd }: Props) => {
  const bodyWidth = useContext(BodyWidthContext)
  const [timeoutKeys, setTimeoutKeys] = useState<number[]>([])
  const sortItemRefs = useRef<{ [key: number]: RectType | null }>({})
  const selectedItemRef = useRef<GroupType | null>()
  const sortItems = makeSortItemArray(numbers)
  const sortItemsMax = Math.max(...numbers)
  const barWidth = bodyWidth / (sortItems.length * 2)
  const selectedBarIndicatorWidth = barWidth * 0.6

  useEffect(() => () => timeoutKeys.forEach(key => window.clearTimeout(key)), [timeoutKeys])

  const rectangles = sortItems.map(({ id, number }, idx) => {
    const x = barWidth * idx * 2
    const height = 500 * (number / sortItemsMax)
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

  useEffect(() => {
    if (!isSorting) return
    const msDuration = duration / 1000
    const tempTimeoutKeys = []
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
        const key1 = window.setTimeout(() => {
          new Konva.Tween({
            node: selectedItemRef.current,
            x: jj * barWidth * 2,
            duration: msDuration,
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id1],
            fill: '#f00',
            duration: msDuration,
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id2],
            fill: '#f00',
            duration: msDuration,
          }).play()
        }, count * msDuration * 2000)

        count++
        // step2. swap & change selectedBarColor
        const key2 = window.setTimeout(() => {
          new Konva.Tween({
            node: sortItemRefs.current[id1],
            x: willSwap ? (jj + 1) * barWidth * 2 : jj * barWidth * 2,
            duration: msDuration,
            onFinish: () => {
              new Konva.Tween({
                node: sortItemRefs.current[id1],
                fill: (isLastSwapOfLap && willSwap) || isLastLap ? '#0f0' : '#aaa',
                duration: msDuration,
              }).play()
            },
          }).play()

          new Konva.Tween({
            node: sortItemRefs.current[id2],
            x: willSwap ? jj * barWidth * 2 : (jj + 1) * barWidth * 2,
            duration: msDuration,
            onFinish: () => {
              new Konva.Tween({
                node: sortItemRefs.current[id2],
                fill: (isLastSwapOfLap && !willSwap) || isLastLap ? '#0f0' : '#aaa',
                duration: msDuration,
              }).play()
            },
          }).play()

          if (isLastLap) onSortEnd()
        }, count * msDuration * 2000)

        tempTimeoutKeys.push(key1, key2)

        if (willSwap) {
          const temp = array[jj]
          array[jj] = array[jj + 1]
          array[jj + 1] = temp
        }

        if (isLastLap && isLastSwapOfLap) setTimeoutKeys([...timeoutKeys, ...tempTimeoutKeys])
      }
    }
  }, [isSorting, onSortEnd]) // eslint-disable-line

  return (
    <Canvas>
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
    </Canvas>
  )
}
