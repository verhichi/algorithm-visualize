import React, { useRef, useEffect, useState, ReactNode } from 'react'
import { BodyWidthContext, getBodyWidth } from '.'
import './styles.css'

type Props = {
  children: ReactNode
}

const Body = ({ children }: Props) => {
  const [width, setWidth] = useState(0)
  const bodyRef = useRef(null)

  useEffect(() => setWidth(getBodyWidth(bodyRef.current)), [bodyRef])

  useEffect(() => {
    const handleResize = () => setWidth(getBodyWidth(bodyRef.current))

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // eslint-disable-line

  return (
    <BodyWidthContext.Provider value={width}>
      <main ref={bodyRef} className="body">
        {children}
      </main>
    </BodyWidthContext.Provider>
  )
}

export default Body
