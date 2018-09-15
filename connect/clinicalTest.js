const Web3 = require("web3")
const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { ClinicalTest } = require("../src/models/ClinicalTest")
const loadConfig = require("./loader.js").loadConfig
const { httpProvider, CLINICALTEST_CONTRACT, adminAddress } = loadConfig()
const gas = 656540
const gasPrice = "10000000000"

const clinicalTestContractABI = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "../",
      "smartcontracts",
      "build",
      "contracts",
      "ClinicalTest.json"
    )
  )
).abi

const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))

const clinicalTestRef = new web3.eth.Contract(
  clinicalTestContractABI,
  CLINICALTEST_CONTRACT
)

const createClinicalTest = ({
  companyAddress,
  subject = "",
  title = "",
  gender = "",
  age = JSON.stringify({}),
  bmi = JSON.stringify({}),
  smoking = "",
  volume = 10,
  diseases = JSON.stringify([])
}) => {
  return clinicalTestRef.methods
    .createClinicalTest(
      // companyAddress, // comment out for development purposes
      adminAddress,
      subject,
      title,
      gender,
      typeof age === "string" ? age : JSON.stringify(age),
      typeof bmi === "string" ? bmi : JSON.stringify(bmi),
      smoking,
      volume,
      typeof diseases === "string" ? diseases : JSON.stringify(diseases)
    )
    .send({
      from: adminAddress, // comment out for development purposes
      gas,
      gasPrice
    })
    .then(
      resp => {
        console.log(
          `Successfully added Clinical Trial with tx hash ${
            resp.transactionHash
          }`
        )
      },
      e => console.log(e)
    )
}

const getClinicalTests = () => {
  const getBasicInfo = clinicalTestRef.methods.getClinicalTests().call()
  const getDetailInfo = clinicalTestRef.methods.getClinicalTestDetails().call()
  return Promise.all([getBasicInfo, getDetailInfo]).then(results => {
    return rehydrateClinicalTests(results[0], results[1])
  })
}

const FIELDS = [
  "companyAddress",
  "subject",
  "title",
  "gender",
  "age",
  "bmi",
  "smoking",
  "volume",
  "diseases"
]

const rehydrateClinicalTests = (...contractResponses) => {
  const basicInfo = Object.values(contractResponses[0])
  const detailInfo = Object.values(contractResponses[1])

  const [addresses, subjects, titles] = basicInfo
  const [_, genders, ages, bmis, smokings, volumes, diseases] = detailInfo

  const clinicalTests = addresses.map((address, index) => {
    return new ClinicalTest({
      companyAddress: addresses[index],
      subject: subjects[index],
      title: titles[index],
      gender: genders[index],
      age: JSON.parse(ages[index]),
      bmi: JSON.parse(bmis[index]),
      smoking: smokings[index],
      volume: volumes[index],
      diseases: JSON.parse(diseases[index])
    })
  })

  return clinicalTests
}

const payPatients = patientAddresses => {
  patientAddresses.forEach(addr =>
    console.log(chalk.yellow.bold(`Sending token to ${addr}...`))
  )
}
module.exports = { createClinicalTest, getClinicalTests, payPatients }
