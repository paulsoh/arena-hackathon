const Web3 = require("web3")
const fs = require("fs")
const path = require("path")

const loadConfig = require("./loader.js").loadConfig
const { httpProvider, PATIENT_CONTRACT, adminAddress } = loadConfig()

const gas = 856540
const gasPrice = "10000000000"
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
        return Promise.resolve(resp)
      },
      e => {
        console.log(e)
        return Promise.reject(e)
      }
    )
}

const getPatients = () => {
  const getBasicInfo = patientRegistrarRef.methods.viewPatients().call()
  const getDetailInfo = patientRegistrarRef.methods.viewPatientsDetail().call()
  return Promise.all([getBasicInfo, getDetailInfo]).then(results => {
    return rehydratePatientsList(results[0], results[1])
  })
}

const FIELDS = [
  "patientAddress",
  "email",
  "gender",
  "birthday",
  "isSmoker",
  "height",
  "weight"
]

const rehydratePatientsList = (...contractResponses) => {
  const basicInfo = Object.values(contractResponses[0])
  const detailInfo = Object.values(contractResponses[1])
  const patientList = []

  const [
    addressList,
    emailList,
    genderList,
    birthdayList,
    isSmokerList,
    heightList,
    weightList
  ] = basicInfo
  const [
    _,
    drugsList,
    diseasesList,
    geneticConditionsList,
    familyHistoryList
  ] = detailInfo

  addressList.forEach((address, index) => {
    patientList.push({
      patientAddress: addressList[index],
      email: emailList[index],
      gender: genderList[index],
      birthday: birthdayList[index],
      isSmoker: isSmokerList[index],
      height: heightList[index],
      weight: weightList[index],
      drugs: JSON.parse(drugsList[index]),
      diseases: JSON.parse(diseasesList[index]),
      geneticConditions: JSON.parse(geneticConditionsList[index]),
      familyHistory: JSON.parse(familyHistoryList[index])
    })
  })
  return patientList
}
module.exports = { createPatient, getPatients }
