const chalk = require("chalk")
const figlet = require("figlet")
const inquirer = require("inquirer")

const { clear } = require("../utils")
const { createClinicalTestView } = require("./createClinicalTestView")
const { getClinicalTests } = require("../../connect/clinicalTest")

const clinicalTestsView = async user => {
  while (true) {
    clear()

    console.log(
      chalk.green(
        figlet.textSync("Clinical Trials", { horizontalLayout: "full" })
      )
    )

    let clinicalTests = await getClinicalTests()
    const { clinicalTest } = await inquirer.prompt([
      {
        name: "clinicalTest",
        message: "List of Clinical Trials",
        type: "list",
        choices: [
          ...clinicalTests.map(clinicalTest => clinicalTest.title),
          new inquirer.Separator(),
          "Create new clinical trial",
          new inquirer.Separator()
        ]
      }
    ])

    if (clinicalTest === "Create new clinical trial") {
      clinicalTests.push(await createClinicalTestView(user))
      continue
    }
  }
}

module.exports = { clinicalTestsView }
