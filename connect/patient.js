const Web3 = require("web3")
const fs = require("fs")
const path = require("path")

const httpProvider = "http://localhost:8545"
const PATIENT_CONTRACT = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601"
const patientContractABI = JSON.parse(
  fs.readFileSync(
    path.json(
      __dirname,
      "../",
      "smartcontracts",
      "build",
      "contracts",
      "PatientRegistrar.json"
    )
  )
).abi

const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))

const patientRegistrarRef = new this.web3.eth.Contract(
  patientContractABI,
  PATIENT_CONTRACT
)

const createPatient = ({
  patientAddress,
  email,
  gender,
  birthday,
  isSmoker = False,
  height,
  weight,
  drugs,
  diseases,
  geneticCondtions,
  familyHistory
}) => {
  // Create payload
  console.log(patientRegistrarRef)
}

module.exports = { createPatient }
