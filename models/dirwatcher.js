import fs from "fs";

// async - flag, describing whether to emit asynchronous import call or not

export default class DirWatcher {
  constructor(emitter) {
    this.emitter = emitter;
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