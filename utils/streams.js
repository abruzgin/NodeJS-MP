import fs from "fs";
import path from "path";
import https from "https";
import { promisify } from "util";
import minimist from "minimist";
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

// task 7
const csvToJSONFileNames = ["csvToJSONFile", , "csvJSONFile"];
const csvToJSONFile = (fileName) => {
  const extName = path.extname(fileName);
  if (extName.toLowerCase() !== '.csv') return ;

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
const readdir = promisify(fs.readdir);
const cssBundleNames = ["cssBundle", "cssBundler", "css", "bundler"];
const cssBundle = (dirname) => {
  const cssUrl = "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css";
  readdir(dirname)
    .then((files) => {
      if (!files || (files instanceof Array && files.length === 0)) {
        console.info("No .css files to bundle".bgRed.white)
        return ;
      }

      const writer = fs.createWriteStream(`${dirname}/bundle.css`, { flags: "a"});
      files.map((file) => {
        if (path.extname(file).toLowerCase() === ".css" && file !== "bundle.css") {
          fs.createReadStream(`${dirname}/${file}`)
            .pipe(through2(function(chunk, enc, cb) {
              const css = chunk.toString() + "\n";
              this.push(css);
              cb();
            }))
            .pipe(writer);
        }
      });

      const httpWriter = fs.createWriteStream(`${dirname}/bundle.css`, { flags: "a"});
      httpWriter.on("finish", () => console.log("Closing writing".bgRed.white))
      https.get(cssUrl, (res) => {
        res.pipe(httpWriter);
      });
    })
    .catch(err => console.log(err));
}

const helpText = ("This tool will help you to run some stream utilities.\n" + 
                "Just provide next options when calling a file to run your operation:\n\n").cyan +
                ("--action, -a       Put here a method you want to call\n" + 
                "--file, -f         Provide here a file you want to be operated with action\n" + 
                "--path, -p         For CSS bundling only; path to CSS files to concatenate\n" + 
                "--help, -h         Call me for help =)\n").rainbow;

const args = minimist(process.argv.slice(2), config.streamsMinimistOpts);

const runStreamTasks = (cliArgs) => {
  const argsKeys = Object.keys(cliArgs);
  argsKeys.forEach((arg, i) => {
    if (i === 1 && (arg === 'h' || arg === 'help')) {
      console.info(helpText);
    }
  });
  
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

if (args && !module.parent) runStreamTasks(args);

export default runStreamTasks;
