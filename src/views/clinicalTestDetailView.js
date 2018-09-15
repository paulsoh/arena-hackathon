const inquirer = require("inquirer")
const { clear } = require("../utils")
const { getPatients } = require("../../connect/patient")
const { payPatients } = require("../../connect/clinicalTest")
const chalk = require("chalk")

const clinicalTestDetailView = async clinicalTest => {
  while (true) {
    clear()

    const patients = await getPatients()
    const patientRows = patients.map(patient => ({
      name: `${patient.email.padEnd(30, " ")}${patient.gender}\t${
        patient.isSmoker
      }\t${patient.height}\t${patient.weight}\t${
        patient.diseases.length ? patient.diseases[0] : "❌"
      }`,
      short: patient.email,
      value: patient.patientAddress
    }))

    // Print Clinical Test Meta Data
    clinicalTest.prettyPrint()

    const {
      patientSelect,
      willInvitePatients,
      willMakePayments
    } = await inquirer.prompt([
      {
        name: "patientSelect",
        message: `${"Email".padEnd(
          30,
          " "
        )}Gender\tSmoking\tHeight\tWeight\tDisease`,
        type: "checkbox",
        pageSize: 15,
        choices: [
          new inquirer.Separator("".padEnd(99, "-")),
          ...patientRows,
          new inquirer.Separator()
        ]
      },
      {
        name: "willInvitePatients",
        message: "Would you like to send invites to selected patients?",
        type: "confirm",
        when: currentAnswers => {
          return !!currentAnswers.patientSelect.length
        }
      },
      {
        name: "willMakePayments",
        message:
          "According to current pricing model, conducting experiment will cost 4 HCK each. Confirm?",
        type: "confirm",
        when: currentAnswers => {
          return !!currentAnswers.willInvitePatients
        }
      }
    ])

    if (willMakePayments) {
      process.stdout.write(
        chalk.blue.bold(
          "===================================================================================\n"
        )
      )
      console.log(
        chalk.blue.bold(
          "=                           Paying Tokens to " +
            patientSelect.length +
            " patients...                          ="
        )
      )
      process.stdout.write(
        chalk.blue.bold(
          "===================================================================================\n"
        )
      )
      payPatients(patientSelect)
      await inquirer.prompt([
        {
          name: "paymentsMade",
          message: "Payments were successfully made...",
          type: "confirm"
        }
      ])
      return
    }
  }
}

// clinicalTestDetailView()

module.exports = {
  clinicalTestDetailView
}
