module.exports = (str, ...args) => {
  for (var i = 0; i < args.length; i++) {
    str = str.replace("{}", args[i]);
  }
  console.error(str);
}