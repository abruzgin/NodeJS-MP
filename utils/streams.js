import minimist from "minimist";
import fs from "fs";
import path from "path";
import through2 from "through2";
import colors from 'colors'; // just for fun =)
import config from "./../config";
import { csvToJSON } from './';

// task 4
const extractFileDataNames = ["extract", "extractFileData", "printFileData", "getFileData"];
const extractFileData = (fileName) => {
  const reader = fs.createReadStream(fileName);
  reader.pipe(process.stdout);
  reader.on('end', () => console.info('End of file'.blue))
}

// task 5
const inputOutputNames = ["inputOutput", "input-output", "io"];
const inputOutput = () => {
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
const csvToJSONOut = (fileName) => {
  if (path.extname(fileName).toLowerCase() !== '.csv') return ;
  fs.createReadStream(fileName)
    .pipe(through2(function (chunk, enc, cb) {
      const str = chunk.toString();
      const json = csvToJSON(str);
      this.push(json);
      cb();
    }))
    .pipe(process.stdout);
}

const csvToJSONFileNames = ["csvToJSONFile", , "csvJSONFile"];
const csvToJSONFile = (fileName) => {
  const extName = path.extname(fileName);
  if (extName.toLowerCase() !== '.csv') return ;

  const baseName = path.basename(fileName, extName);
  const writer = fs.createWriteStream(`${baseName}.json`);

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

const helpText = ("This tool will help you to run some stream utilities.\n" + 
                "Just provide next options when calling a file to run your operation:\n\n").cyan +
                ("--action, -a      Put here a method you want to call\n" + 
                "--file, -f         Provide here a file you want to be operated with action\n" + 
                "--help, -h         Call me for help =)").rainbow;

const args = minimist(process.argv.slice(2), config.streamsMinimistOpts);
const argsKeys = Object.keys(args);
argsKeys.forEach((arg, i) => {
  if (i === 1 && (arg === 'h' || arg === 'help')) {
    console.info(helpText);
  }
});

if(extractFileDataNames.includes(args.a) && args.f) {
  extractFileData(args.f);
}

if(inputOutputNames.includes(args.a)) {
  inputOutput();
}

if(csvToJSONConsoleNames.includes(args.a) && args.f) {
  csvToJSONOut(args.f);
}

if(csvToJSONFileNames.includes(args.a) && args.f) {
  csvToJSONFile(args.f);
}

if (argsKeys.length < 2) {
  console.info('No args found. If you donno what to do, add a "-h" or "--help" flag');
}