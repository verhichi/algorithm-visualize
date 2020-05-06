export const parseStringToNumberArray = (arrayString: string): number[] =>
  arrayString
    .split(',')
    .map(string => parseInt(string.trim()))
    .filter(Boolean)
