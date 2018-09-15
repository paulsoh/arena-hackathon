const { clear } = require("../utils")
const inquirer = require("inquirer")

const registerPatient = async () => {
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
      message: "🎂  생년월일을 입력하세요 (1950/05/10)",
      type: "input"
    },
    {
      name: "isSmoker",
      message: "🚬  흡연 여부를 입력하세요 (Y/N)",
      type: "list",
      choices: ["Y", "N"]
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

  response.bmi = response.weight / (response.height * response.height)
  console.log(response)
  return response
}

// registerPatient()

module.exports = {
  registerPatient
}
