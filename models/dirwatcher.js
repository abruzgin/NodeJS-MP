import fs from "fs";
import EventEmitter from "events";
import Importer from './importer';

const emitter = new EventEmitter();

const csvToJSON = (content) => {
  const lines = content.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  lines.forEach((line, lIndex) => {
    if (lIndex !== 0) {
      const obj = {};
      const currentLine = line.replace(/(?!\B"[^"]*),(?![^"]*"\B)/g, ";").split(";");
      headers.forEach((header, hIndex) => {
        obj[header] = currentLine[hIndex];
      });
      result.push(obj);
    }
  });
  return JSON.stringify(result);
}

// async - flag, describing whether to emit asynchronous import call or not
emitter.on("changed", (path, async) => {
  const importer = new Importer();
  if (async) {
    importer.import(path)
      .then(data => console.log(csvToJSON(data.toString())))
      .catch(err => console.log(err));
  } else {
    console.log(csvToJSON(importer.importSync(path).toString()));
  }
});

export default class DirWatcher {
  watch(path, delay) {
    setTimeout(() => {
      fs.watch(path, {
        persistent: true,
      }, (event, filename) => {
        const file = `${path}\\${filename}`;
        if (event === "change") {
          emitter.emit("changed", file, true);
        }
      });
    }, delay);
  }
}