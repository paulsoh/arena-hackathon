const inquirer = require('inquirer')
const { clear } = require('../utils')

const login = async () => {
  while (true) {
    clear()
    const { role, address, password } = await inquirer.prompt([
      {
        name: 'role',
        message: '알바 or 회사',
        type: 'list',
        choices: ['알바', '회사']
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

    return {
      role,
      address,
      password,
    }
  }
}

login()

module.exports = { login }