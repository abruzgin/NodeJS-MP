import path from "path";
import EventEmitter from "events";
import minimist from "minimist";
import config from "./config";
import { runStreamTasks } from './utils';
import { User, Product, DirWatcher, Importer } from "./models";

const emitter = new EventEmitter();

const user = new User();
const product = new Product();
const importer = new Importer(emitter);
const dirwatcher = new DirWatcher(emitter);

console.log(config.name);
dirwatcher.watch(path.join(__dirname, "data"), 500);

const cliArgs = minimist(process.argv.slice(2), config.streamsMinimistOpts);
if (Object.keys(cliArgs).length > 1) runStreamTasks(cliArgs);