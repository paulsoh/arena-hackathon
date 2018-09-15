const chalk = require("chalk")
const figlet = require("figlet")
const inquirer = require("inquirer")

const { clear } = require("../utils")
const { createClinicalTestView } = require("./createClinicalTestView")
const { clinicalTestDetailView } = require('./clinicalTestDetailView')
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
    const { title } = await inquirer.prompt([
      {
        name: "title",
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


    if (title === "Create new clinical trial") {
      clinicalTests.push(await createClinicalTestView(user))
      continue
    }

    const selectedClinicalTest = clinicalTests.filter(c => c.title === title)[0]
    await clinicalTestDetailView(selectedClinicalTest)
  }
}

module.exports = { clinicalTestsView }
