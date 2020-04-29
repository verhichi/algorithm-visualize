import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Text from 'components/atoms/Text'
import { SidebarList, sidebarData } from '.'
import './styles.css'

const Sidebar = () => {
  const [open, setOpen] = useState('')
  const handleClick = (key: string) => setOpen(open === key ? '' : key)

  return (
    <nav className="sidebar">
      <Link to="/">
        <Text className="sidebar-header">Algorithm Visualize</Text>
      </Link>
      <SidebarList openKey={open} onClick={handleClick} sidebarData={sidebarData} />
    </nav>
  )
}

export default Sidebar
