import fs from "fs";
import path from "path";
import https from "https";
import { promisify } from "util";
import minimist from "minimist";
import through2 from "through2";
import colors from 'colors';
import config from "./../config";
import { streamsCssUrl, streamsCssBundleFile, streamsHelpText } from "../constants";
import { csvToJSON } from './';

const readdir = promisify(fs.readdir);

// task 4
const extractFileDataNames = ["extract", "extractFileData", "printFileData", "getFileData"];
export const extractFileData = (fileName) => {
  const reader = fs.createReadStream(fileName);
  reader.pipe(process.stdout);
  reader.on('end', () => console.info('End of file'.blue))
}

// task 5
const inputOutputNames = ["inputOutput", "input-output", "io"];
export const inputOutput = () => {
  process.stdin
    .pipe(through2(function (chunk, enc, cb) {
      const str = chunk.toString();
      const upperStr = str.toUpperCase();
      this.push(upperStr);
      cb();
    }))
    .pipe(process.stdout);
}

// task 6
const csvToJSONConsoleNames = ["csvToJSONConsole", "csvToJSONOut", "csvJSON"];
export const csvToJSONOut = (fileName) => {
  const extName = path.extname(fileName);
  if (extName.toLowerCase() !== config.exts.csv) {
    return ;
  }
  fs.createReadStream(fileName)
    .pipe(through2(function (chunk, enc, cb) {
      const str = chunk.toString();
      const json = csvToJSON(str);
      this.push(json);
      cb();
    }))
    .pipe(process.stdout);
}

// task 7
const csvToJSONFileNames = ["csvToJSONFile", "csvJSONFile"];
export const csvToJSONFile = (fileName) => {
  const extName = path.extname(fileName);
  if (extName.toLowerCase() !== config.exts.csv) {
    return ;
  }

  const baseName = path.basename(fileName, extName);
  const pathName = path.dirname(fileName);
  const writer = fs.createWriteStream(`${pathName}/${baseName}.json`);

  writer.on("finish", () => console.info(`${baseName}.json was created`.bgRed.bgYellow));

  fs.createReadStream(fileName)
    .pipe(through2(function (chunk, enc, cb) {
      const str = chunk.toString();
      const json = csvToJSON(str);
      const fixedJson = json.replace(/\s/g, "");
      this.push(fixedJson);
      cb();
    }))
    .pipe(writer);
}

// task 8
const cssBundleNames = ["cssBundle", "cssBundler", "css", "bundler"];
export const cssBundle = (dirname) => {
  readdir(dirname)
    .then((files) => {
      if (!files || (files instanceof Array && files.length === 0)) {
        console.info("No .css files to bundle".bgRed.white);
        return ;
      }
      const writer = fs.createWriteStream(`${dirname}/bundle.css`, { flags: "a"});
      files.map((file) => {
        if (path.extname(file).toLowerCase() === config.exts.css && file !== streamsCssBundleFile) {
          fs.createReadStream(`${dirname}/${file}`)
            .pipe(through2(function(chunk, enc, cb) {
              const css = `${chunk.toString()}\n`;
              this.push(css);
              cb();
            }))
            .pipe(writer);
        }
      });

      const httpWriter = fs.createWriteStream(`${dirname}/bundle.css`, { flags: "a"});
      httpWriter.on("finish", () => console.log("Closing writing".bgRed.white))
      https.get(streamsCssUrl, (res) => {
        res.pipe(httpWriter);
      });
    })
    .catch(err => console.log(err));
}

const args = minimist(process.argv.slice(2), config.streamsMinimistOpts);

const runStreamTasks = (cliArgs) => {
  const argsKeys = Object.keys(cliArgs);
  const indexOfHelp = argsKeys.findIndex(el => el === 'h' || el === 'help');

  if (argsKeys.includes('h') && indexOfHelp === 1) {
    console.info(streamsHelpText.bgBlue.white);
  }
  
  if (argsKeys.length < 2) {
    console.info('No args found. If you donno what to do, add a "-h" or "--help" flag');
  }
  
  if(extractFileDataNames.includes(cliArgs.a) && cliArgs.f) {
    extractFileData(cliArgs.f);
  }
  
  if(inputOutputNames.includes(cliArgs.a)) {
    inputOutput();
  }
  
  if(csvToJSONConsoleNames.includes(cliArgs.a) && cliArgs.f) {
    csvToJSONOut(cliArgs.f);
  }
  
  if(csvToJSONFileNames.includes(cliArgs.a) && cliArgs.f) {
    csvToJSONFile(cliArgs.f);
  }
  
  if(cssBundleNames.includes(cliArgs.a) && cliArgs.p) {
    cssBundle(cliArgs.p);
  }
}

if (!module.parent) runStreamTasks(args);

export default runStreamTasks;
