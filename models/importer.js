import fs from "fs";

export default class Importer {
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