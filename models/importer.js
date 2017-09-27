import fs from "fs";
import { csvToJSON } from './../utils';

export default class Importer {
  constructor(emitter) {
    emitter.on("changed", (path, async) => {
      if (async) {
        this.import(path)
          .then(data => console.log(csvToJSON(data.toString())))
          .catch(err => console.log(err));
      } else {
        console.log(csvToJSON(this.importSync(path).toString()));
      }
    });
  }
  import(path) {
    return new Promise((resolve, reject) => {
      return fs.readFile(path, (error, data) => {
        if (error) return reject(error);
        return resolve(data);
      });
    })
  }

  importSync(path) {
    return fs.readFileSync(path);
  }
}