import React from 'react'
import { SidebarDataType, SidebarItem } from '.'
import './styles.css'

type Props = {
  openKey: string
  onClick: (key: string) => void
  sidebarData: SidebarDataType[]
}

export const SidebarList = ({ openKey, onClick, sidebarData }: Props) => (
  <>
    {sidebarData.map((sidebarItem, idx) => (
      <SidebarItem key={idx} openKey={openKey} onClick={onClick} sidebarItem={sidebarItem} />
    ))}
  </>
)

SidebarList.defaultProps = {
  openKey: '',
}
