const fs = require("fs")
const path = require("path")

const DISEASEDATA_PATH = "diseaseSet.json"

const retrieveDiseaseData = queryString =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", DISEASEDATA_PATH), "utf8")
  ).filter(disease => disease.name.match(queryString))

const clear = () => {
  process.stdout.write("\x1b[2J")
  process.stdout.write("\x1b[0f")
  console.log()
}

module.exports = { clear, retrieveDiseaseData }
