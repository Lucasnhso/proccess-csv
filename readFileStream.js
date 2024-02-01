import { Readable, Transform, Writable } from 'node:stream';
import readline from 'node:readline';
import { csvToArray, csvItemToObject, snakeToCamelCase } from './utils/index.js';

export async function readFileStream(streamFile) {
  const dataLine = readline.createInterface({
    input: streamFile
  })
  let lineIndex = 0;
  let keys

  await new Promise((resolve, reject) => {
    dataLine
      .on('line', (line) => {
        // console.log(input)
        const splitedLine = line.split(',')
        if(lineIndex === 0) {
          keys = splitedLine.map(key => snakeToCamelCase(key));
        } else {
          const objItem = csvItemToObject(splitedLine, keys);
          // console.log(objItem);
        }
        lineIndex++;
      })
      .on('close', () => {
        resolve()
      })
      .on('error', (err) => {
        console.log('erro', err)
      })
  })
}