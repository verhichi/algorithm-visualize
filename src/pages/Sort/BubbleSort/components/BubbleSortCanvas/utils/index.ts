import { SortItemType } from '..'

export const parseStringToNumberArray = (arrayString: string): number[] =>
  arrayString
    .split(',')
    .map(string => parseInt(string.trim()))
    .filter(Boolean)

export const makeSortItemArray = (array: number[]): SortItemType[] => array.map((number, idx) => ({ id: idx, number }))
