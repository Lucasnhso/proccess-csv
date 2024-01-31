import { Readable, Transform, Writable } from 'node:stream';
import readline from 'node:readline';
import { csvToArray, csvItemToObject, snakeToCamelCase } from './utils/index.js';

export async function readFileStream(streamFile) {
  const dataLine = readline.createInterface({
    input: streamFile
  })
  let lineIndex = 0;
  let keys
  for await(let line of dataLine) {
    // console.log('linha', lineIndex, line);
    const splitedLine = line.split(',')
    if(lineIndex === 0) {
      keys = splitedLine.map(key => snakeToCamelCase(key));
    } else {
      const objItem = csvItemToObject(splitedLine, keys);
      // console.log(objItem);
    }
    lineIndex++;
  }
}