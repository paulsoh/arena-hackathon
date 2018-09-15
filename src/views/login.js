const inquirer = require("inquirer")
const { clear } = require("../utils")

const login = async () => {
  while (true) {
    // clear()
    const { role, address, password } = await inquirer.prompt([
      {
        name: "role",
        message: "Who are you?",
        type: "list",
        choices: ["patient", "institute"]
      },
      {
        name: "address",
        message: "Input Wallet Address",
        type: "input",
        default: "0x4c0408db276ef793333baf5b226d8b180c3d0a89"
      },
      {
        name: "password",
        message: "Input Private Key",
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
