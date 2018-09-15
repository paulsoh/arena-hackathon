const inquirer = require('inquirer')
const { clear } = require('../utils')

const login = async () => {
  while (true) {
    // clear()
    const { role, address, password } = await inquirer.prompt([
      {
        name: 'role',
        message: 'Hey, you! you는 인간 or 컴퍼니?',
        type: 'list',
        choices: ['human', 'company']
      },
      {
        name: 'address',
        message: '입력해라. you의 지갑 address',
        type: 'input',
      },
      {
        name: 'password',
        message: '프라이빗 키. 우리는 보장한다. 당신의 secret',
        type: 'password',
      }
    ])

    const user = {
      role,
      id: 1,
    }

    return user
  }
}

// login()

module.exports = { login }