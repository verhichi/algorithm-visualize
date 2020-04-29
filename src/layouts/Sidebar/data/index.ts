import { SidebarDataType } from '..'

export const sidebarData: SidebarDataType[] = [
  {
    label: 'Sort',
    collapseKey: 'SORT',
    childrenData: [
      {
        label: 'Bubble Sort',
        to: '/sort/bubble-sort',
      },
      {
        label: 'Quick Sort',
        to: '/sort/quick-sort',
      },
      {
        label: 'Merge Sort',
        to: '/sort/merge-sort',
      },
      {
        label: 'Heap Sort',
        to: '/sort/heap-sort',
      },
      {
        label: 'Insertion Sort',
        to: '/sort/insertion-sort',
      },
      {
        label: 'Selection Sort',
        to: '/sort/selection-sort',
      },
      {
        label: 'Tree Sort',
        to: '/sort/tree-sort',
      },
    ],
  },
  {
    label: 'Search',
    collapseKey: 'SEARCH',
    childrenData: [
      {
        label: 'Linear Sort',
        to: '/search/linear-search',
      },
      {
        label: 'Binary Search',
        to: '/search/binary-search',
      },
    ],
  },
]
