export const upperCaseFirstLetter = (val) => {
  if(!val) return ''
  else return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}