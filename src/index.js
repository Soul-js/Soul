const run = require('./lib/soul.js');

if (process.argv[2] == "run") {
  if (!process.argv[3]) {
    console.log("Filepath is required!");
  }
  run(process.argv[3]);
}