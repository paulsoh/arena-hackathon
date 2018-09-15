const { clear } = require("../utils")
const inquirer = require("inquirer")
const { createPatient } = require("../../connect/patient")

const registerPatient = async user => {
  clear()

  const response = await inquirer.prompt([
    {
      name: "email",
      message: "✉️  연락받을 수 있는 이메일 주소를 입력하세요",
      type: "input"
    },
    {
      name: "gender",
      message: "성별을 입력하세요 (M/F)",
      type: "list",
      choices: ["M", "F"]
    },
    {
      name: "birthday",
      message: "🎂  생년월일을 입력하세요 (19500510)",
      type: "input"
    },
    {
      name: "isSmoker",
      message: "🚬  흡연 여부를 입력하세요 (Y/N)",
      type: "confirm"
    },
    {
      name: "height",
      message: "신장을 입력하세요 (cm)",
      type: "input"
    },
    {
      name: "weight",
      message: "체중을 입력하세요 (kg)",
      type: "input"
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
