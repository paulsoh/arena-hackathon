var term = require("terminal-kit").terminal
var path = require("path")
var fs = require("fs")
var items = ["Register Patient", "Launch Experiment", "Query Patients", "Help"]

const { login } = require("./views/login")
const { registerPatient } = require("./views/registerPatient")
const { additionalMedicalInfo } = require("./views/additionalMedicalInfo")
const { getClinicalTests } = require("./views/getClinicalTests")

const { createPatient, getPatients } = require("../connect/patient")

var options = {
  y: 1, // the menu will be on the top of the terminal
  style: term.inverse,
  selectedStyle: term.dim.blue.bgGreen
}

term.clear()

term.drawImage(
  path.join(__dirname, "../", "hospital.jpg"),
  {
    shrink: { width: term.width, height: term.height * 2 }
  },
  async () => {
    const user = await login()

    if (user.role === "human") {
      const patientBasicInfo = await registerPatient(user)
      const additionalInfo = await additionalMedicalInfo(patientBasicInfo)

      const patientInfo = { ...patientBasicInfo, ...additionalInfo }
      console.log(patientInfo)
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
    } else {
      getPatients().then(resp => console.log(resp))
      await getClinicalTests(user)
    }
  }
)

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../", "diseaseSet.json"), "utf8")
)

// console.log(data)
