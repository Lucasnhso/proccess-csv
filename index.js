import { readFileSync, createReadStream} from 'node:fs';

import { readFileStream } from './readFileStream.js'
import { csvToArray } from './utils/csvToArray.js';

const csvFileName = 'train.csv';
const csvFilePath = `./files/${csvFileName}`;

function processFileWithoutStream(bufferFile) {
  const stringFile = bufferFile.toString();
  const proccessedFile = csvToArray(stringFile)
  // console.log(proccessedFile);
}

async function main() {
  const bufferFile = readFileSync(csvFilePath)
  console.time('noStream');
  processFileWithoutStream(bufferFile)
  console.timeEnd('noStream');

  const streamFile = createReadStream(csvFilePath)
  console.time('stream');
  await readFileStream(streamFile)
  console.timeEnd('stream');

}
main()