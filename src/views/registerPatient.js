const chalk = require("chalk")
const figlet = require("figlet")
const { clear } = require("../utils")
const inquirer = require("inquirer")
const { createPatient } = require("../../connect/patient")

const registerPatient = async user => {
  clear()

  console.log(
    chalk.green(figlet.textSync("Basic Info", { horizontalLayout: "full" }))
  )

  const response = await inquirer.prompt([
    {
      name: "email",
      message: "✉️  연락받을 수 있는 이메일 주소를 입력하세요",
      type: "input",
      default: "noreply@gmail.com"
    },
    {
      name: "gender",
      message: "성별을 입력하세요 (M/F)",
      type: "list",
      choices: ["M", "F"],
      default: "M"
    },
    {
      name: "birthday",
      message: "🎂  생년월일을 입력하세요 (20080915)",
      type: "input",
      default: "20080915"
    },
    {
      name: "isSmoker",
      message: "🚬  흡연 여부를 입력하세요 (Y/N)",
      type: "confirm"
    },
    {
      name: "height",
      message: "신장을 입력하세요 (170cm)",
      type: "input",
      default: "170"
    },
    {
      name: "weight",
      message: "체중을 입력하세요 (70kg)",
      type: "input",
      default: "70"
    }
  ])
  const patientInfo = {
    ...response,
    ...user,
    bmi: response.weight / (response.height * response.height)
  }

  return patientInfo
}

// registerPatient()

module.exports = {
  registerPatient
}
