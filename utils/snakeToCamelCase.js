export function snakeToCamelCase(str) {
  return str
    .replace(/_([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/_/g, '')
    .replace(/^./, firstChar => firstChar.toLowerCase());
}