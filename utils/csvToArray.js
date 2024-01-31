import { snakeToCamelCase } from './index.js';
const csvSeparator = ','

export function csvItemToObject(csvItem, keys) {
  const objItem = {};
  for(let [i, column] of csvItem.entries()) {
    objItem[keys[i]] = column;
  }
  return objItem;
}

export function csvToArray(rawCsvData) {
  const lines = rawCsvData.replaceAll('\r', '').split('\n').map(line => line.split(csvSeparator));
    let keys = lines.shift();
    keys = keys.map(key => snakeToCamelCase(key));
    // console.log('tc', lines);

    let arrayData = [];
    for(let columns of lines) {
      const objItem = csvItemToObject(columns, keys)
      arrayData.push(objItem);
    };

    return arrayData;
}