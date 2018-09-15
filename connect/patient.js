const Web3 = require("web3")
const fs = require("fs")
const path = require("path")

const gas = 467540
const gasPrice = "10000000000"
const adminAddress = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"

const httpProvider = "http://localhost:8545"
const PATIENT_CONTRACT = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601"
const patientContractABI = JSON.parse(
  fs.readFileSync(
    path.join(
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

const patientRegistrarRef = new web3.eth.Contract(
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
  drugs = JSON.stringify([]),
  diseases = JSON.stringify([]),
  geneticConditions = JSON.stringify([]),
  familyHistory = JSON.stringify([])
}) => {
  // Create payload
  console.log(diseases)
  return patientRegistrarRef.methods
    .registerPatient(
      patientAddress,
      email,
      gender,
      birthday,
      isSmoker,
      height,
      weight,
      drugs,
      diseases,
      geneticConditions,
      familyHistory
    )
    .send({
      from: adminAddress,
      gas,
      gasPrice
    })
    .then(
      resp => {
        console.log(
          `Successfully added Patient with tx hash ${resp.transactionHash}`
        )
      },
      e => console.log(e)
    )
}

module.exports = { createPatient }
