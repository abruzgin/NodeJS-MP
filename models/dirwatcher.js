import fs from "fs";
import { csvToJSON } from './../utils';
import Importer from './importer';

// async - flag, describing whether to emit asynchronous import call or not

export default class DirWatcher {
  constructor(emitter) {
    this.emitter = emitter;
    this.emitter.on("changed", (path, async) => {
      const importer = new Importer();
      if (async) {
        importer.import(path)
          .then(data => console.log(csvToJSON(data.toString())))
          .catch(err => console.log(err));
      } else {
        console.log(csvToJSON(importer.importSync(path).toString()));
      }
    });
  }
  watch(path, delay) {
    setTimeout(() => {
      fs.watch(path, {
        persistent: true,
      }, (event, filename) => {
        const file = `${path}\\${filename}`;
        if (event === "change") {
          this.emitter.emit("changed", file, true);
        }
      });
    }, delay);
  }
}