export const capitalize = (text) => {
  const lowerCase = text.toLowerCase();
  return `${lowerCase[0].toUpperCase()}${lowerCase.slice(1,lowerCase.length)}`
}