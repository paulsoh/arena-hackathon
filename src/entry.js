var term = require("terminal-kit").terminal
var path = require("path")
var fs = require("fs")
var items = ["Register Patient", "Launch Experiment", "Query Patients", "Help"]

var options = {
  y: 1, // the menu will be on the top of the terminal
  style: term.inverse,
  selectedStyle: term.dim.blue.bgGreen
}

term.clear()

term.drawImage(path.join(__dirname, "../", "hospital.jpg"), {
  shrink: { width: term.width, height: term.height * 2 }
})

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../", "diseaseSet3.json"), "utf8")
)

console.log(data)
