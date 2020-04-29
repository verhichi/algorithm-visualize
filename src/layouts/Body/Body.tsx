import React, { ReactNode } from 'react'
import './styles.css'

type Props = {
  children: ReactNode
}

const Body = ({ children }: Props) => <main className="body">{children}</main>

export default Body
