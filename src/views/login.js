const inquirer = require('inquirer')
const { clear } = require('../utils')

const login = async () => {
  while (true) {
    clear()
    const { role, address, password } = await inquirer.prompt([
      {
        name: 'role',
        message: '인간 or 회사',
        type: 'list',
        choices: ['human', 'company']
      },
      {
        name: 'address',
        message: '지갑 주소',
        type: 'input',
      },
      {
        name: 'password',
        message: '프라이빗 키',
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