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
    println("" + err); // get err stuff
  }
  `
}



module.exports = (filepath) => {
  var ctx = new V8Engine();
  function requirePath(fp) {
    // TODO: Make require node_module feature
    return require(path.join(`${process.cwd()}/`, fp));
  }
  ctx.addHostType('require', requirePath);
  const files = fs.readdirSync(path.join(__dirname + "/", "objects/"))
  for (var i = 0; i < files.length; i++) {
    let filename = "" + files[i];
    ctx.addHostObject(filename.replace('.js', ""), require('./objects/' + files[i]))
  }
  ctx.addHostType('println', println);
  ctx.addHostType('print', print)
  
  ctx.run(check(fs.readFileSync(path.join(process.cwd() + "/", process.argv[3]), {encoding: "utf-8"})));
}