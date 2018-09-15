const fs = require("fs")
const path = require("path")
const axios = require("axios")

const DISEASEDATA_PATH = "diseaseSet.json"

const retrieveMedicineData = async queryString => {
  const response = await axios.get(
    `https://mdwalks.net/api/info/search/detail?term=${queryString}&type=component`
  )
  return response.data.results.component.list.map(item => ({
    name: item.name[0]
  }))
}

const retrieveDiseaseData = queryString =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", DISEASEDATA_PATH), "utf8")
  ).filter(disease => disease.name.match(queryString))

const clear = () => {
  process.stdout.write("\x1b[2J")
  process.stdout.write("\x1b[0f")
  console.log()
}

module.exports = { clear, retrieveDiseaseData, retrieveMedicineData }
