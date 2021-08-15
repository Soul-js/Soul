const V8Engine = require('v8engine')
const path = require('path')
const fs = require('fs')
const println = require('./objects/println.js')
const print = require('./objects/print.js')

function check(code) {
  return `
  try {
    ${code}
  } catch(err) {
    console.log("" + err); // get err stuff
  }
  `
}

module.exports = (filepath) => {
  var ctx = new V8Engine();
  function requirePath(fp) {
    return require(path.join(`${process.cwd()}/`, fp));
  }
  ctx.addHostType('println', println);
  ctx.addHostType('use', requirePath);
  ctx.addHostType('print', print)
  ctx.run(check(fs.readFileSync(path.join(process.cwd() + "/", process.argv[3]), {encoding: "utf-8"})));
}