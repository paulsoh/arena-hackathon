const chalk = require("chalk")
const figlet = require("figlet")
var path = require("path")
var fs = require("fs")
var items = ["Register Patient", "Launch Experiment", "Query Patients", "Help"]
const { clear } = require("./utils")

const { login } = require("./views/login")
const { registerPatient } = require("./views/registerPatient")
const { additionalMedicalInfo } = require("./views/additionalMedicalInfo")
const { clinicalTestsView } = require("./views/clinicalTestsView")
const { getPatientList } = require("./views/getPatientList")
const { createPatient, getPatients } = require("../connect/patient")

clear()

console.log(chalk.green(figlet.textSync("ARENA", { horizontalLayout: "full" })))

const entry = async () => {
  const user = await login()

  if (user.role === "Patient") {
    const patientBasicInfo = await registerPatient(user)
    const additionalInfo = await additionalMedicalInfo(patientBasicInfo)

    const patientInfo = { ...patientBasicInfo, ...additionalInfo }
    try {
      createPatient({
        patientAddress: patientInfo.address,
        email: patientInfo.email,
        gender: patientInfo.gender,
        birthday: patientInfo.birthday,
        isSmoker: patientInfo.isSmoker,
        height: patientInfo.height,
        weight: patientInfo.weight,
        drugs: JSON.stringify(patientInfo.drugs),
        diseases: JSON.stringify(patientInfo.diseases),
        geneticConditions: JSON.stringify(patientInfo.geneticConditions),
        familyHistory: JSON.stringify(patientInfo.familyHistory)
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    await clinicalTestsView(user)
    // 이거 구현해주실 분?
    await getPatientList()
  }
}

entry()

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../", "diseaseSet.json"), "utf8")
)

// console.log(data)
