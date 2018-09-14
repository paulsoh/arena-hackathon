const clear = () => {
  process.stdout.write("\x1b[2J")
  process.stdout.write("\x1b[0f")
  console.log()
}

module.exports = { clear }
