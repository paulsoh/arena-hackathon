const inquirer = require("inquirer")
const { clear } = require("../utils")
const { getPatients } = require("../../connect/patient")

const clinicalTestDetailView = async clinicalTest => {
  while (true) {
    clear()

    const patients = await getPatients()
    const patientRows = patients.map(
      patient =>
        `${patient.email.padEnd(30, " ")}${patient.gender}\t${
          patient.isSmoker
        }\t${patient.height}\t${patient.weight}\t${
          patient.diseases.length ? patient.diseases[0] : "❌"
        }`
    )

    // Print Clinical Test Meta Data
    console.log(clinicalTest.prettyPrint())

    const { patientSelect } = await inquirer.prompt([
      {
        name: "patientSelect",
        message: `${"Email".padEnd(
          30,
          " "
        )}Gender\tSmoking\tHeight\tWeight\tDisease`,
        type: "list",
        pageSize: 15,
        choices: [
          new inquirer.Separator("".padEnd(99, "-")),
          ...patientRows,
          new inquirer.Separator(),
          "[ <- Go Back ]",
          new inquirer.Separator()
        ]
      }
    ])

    if (patientSelect === "[ <- Go Back ]") return
  }
}

// clinicalDetailView()

module.exports = {
  clinicalTestDetailView
}
