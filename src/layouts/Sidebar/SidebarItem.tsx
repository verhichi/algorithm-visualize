import React from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { SidebarDataType } from '.'
import './styles.css'

type Props = {
  openKey: string
  onClick: (key: string) => void
  sidebarItem: SidebarDataType
}

export const SidebarItem = ({ openKey, onClick, sidebarItem: { label, collapseKey, childrenData } }: Props) => {
  const isOpen = childrenData && openKey === collapseKey
  return (
    <>
      <List component="div" disablePadding>
        <ListItem button onClick={() => collapseKey && onClick(collapseKey)}>
          <ListItemText primary={label} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      {childrenData && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {childrenData.map(({ label, to = '/' }, idx) => (
              <Link key={idx} to={to}>
                <ListItem button className="nested">
                  <ListItemText primary={label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

SidebarItem.defaultProps = {
  openKey: '',
}
