import minimist from "minimist";
import config from "./../config";

const helpText = "This tool will help you to run some stream utilities.\n" + 
                "Just provide next options when calling a file to run your operation:\n\n" +
                "--action, -a       Put here a method you want to call\n" + 
                "--file, -f         Provide here a file you want to be operated with action\n" + 
                "--help, -h         Call me for help =)";
const args = minimist(process.argv.slice(2), config.streamsMinimistOpts);
const argsKeys = Object.keys(args);
argsKeys.forEach((arg, i) => {
  if (i === 1 && (arg === 'h' || arg === 'help')) {
    console.info(helpText);
  }
});
if (argsKeys.length < 2) {
  console.info('No args found. If you donno what to do, add a "-h" or "--help" flag');
}