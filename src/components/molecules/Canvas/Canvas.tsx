import React, { useRef, useContext, ReactNode } from 'react'
import { Stage, Layer } from 'react-konva'
import { BodyWidthContext } from 'layouts/Body'
import clsx from 'clsx'

type Props = {
  className?: string
  children: ReactNode
  height?: number
}

const Canvas = ({ children, height, className }: Props) => {
  const canvasContainer = useRef<HTMLDivElement>(null)
  const bodyWidth = useContext(BodyWidthContext)

  return (
    <div ref={canvasContainer} className={clsx('canvas-container', className)}>
      <Stage width={bodyWidth} height={height}>
        <Layer>{children}</Layer>
      </Stage>
    </div>
  )
}

Canvas.defaultProps = {
  height: 500,
}

export default Canvas
