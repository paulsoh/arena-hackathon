const inquirer = require('inquirer')

const { clear } = require('../utils')
const { createClinicalTest } = require('./createClinicalTest')
const { clinicalTests } = require('../tempData')

const getClinicalTests = async () => {
  while (true) {
    clear()

    const { clinicalTest } = await inquirer.prompt([
      {
        name: 'clinicalTest',
        message: 'List of Clinical Trials',
        type: 'list',
        choices: [
          ...clinicalTests.map(clinicalTest => clinicalTest.title),
          new inquirer.Separator(),
          'Create new clinical trial',
          new inquirer.Separator(),
        ]
      }
    ])

    if (clinicalTest === 'Create new clinical trial') {
      clinicalTests.push(await createClinicalTest())
      continue
    }
  }
}

// getClinicalTests()

module.exports = { getClinicalTests }