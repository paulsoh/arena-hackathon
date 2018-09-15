const inquirer = require("inquirer")
const { clear } = require("../utils")

const login = async () => {
  while (true) {
    // clear()
    const { role, address, password } = await inquirer.prompt([
      {
        name: "role",
        message: "Hey, you! you는 인간 or 컴퍼니?",
        type: "list",
        choices: ["human", "company"]
      },
      {
        name: "address",
        message: "입력해라. you의 지갑 address",
        type: "input",
        default: "0x4c0408db276ef793333baf5b226d8b180c3d0a89"
      },
      {
        name: "password",
        message: "프라이빗 키. 우리는 보장한다. 당신의 secret",
        type: "password"
      }
    ])

    const user = {
      role,
      address,
      password
    }

    return user
  }
}

// login()

module.exports = { login }
