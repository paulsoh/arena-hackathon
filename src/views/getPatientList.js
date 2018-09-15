const inquirer = require("inquirer")

const { clear } = require("../utils")
const { createClinicalTest } = require("./createClinicalTestView")
const { clinicalTests } = require("../tempData")

const getPatientList = async () => {
  while (true) {
    clear()

    // const { clinicalTest } = await inquirer.prompt([
    //   {
    //     name: "clinicalTest",
    //     message: "Your 임상실험 리스트",
    //     type: "list",
    //     choices: [
    //       ...clinicalTests.map(clinicalTest => clinicalTest.title),
    //       new inquirer.Separator(),
    //       "새로운 인체.. 아니 임상실험 생성하기",
    //       new inquirer.Separator()
    //     ]
    //   }
    // ])

    // if (clinicalTest === "새로운 인체.. 아니 임상실험 생성하기") {
    //   clinicalTests.push(await createClinicalTest())
    //   continue
    // }
  }
}

// getPatientList()

module.exports = { getPatientList }
