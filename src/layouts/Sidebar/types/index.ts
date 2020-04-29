export type SidebarDataType = {
  label: string
  to?: string
  collapseKey?: string
  childrenData?: Omit<SidebarDataType, 'collapseKey' | 'childrenData'>[]
}
