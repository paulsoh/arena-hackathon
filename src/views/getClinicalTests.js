const inquirer = require('inquirer')
const { ClinicalTest } = require('../models/ClinicalTest')

const { clear } = require('../utils')

const { createClinicalTest } = require('./createClinicalTest')

const getClinicalTests = async () => {
  while (true) {
    clear()

    const clinicalTests = [
      new ClinicalTest({
        subject: '이비인후과',
        title: '비강 내 동전 삽입 수량 측정',
        gender: "Don't care",
        age: { min: 10, max: 90 },
        bmi: { min: 10, max: 300 },
        smoking: true,
        volume: 300,
      }),
      new ClinicalTest({
        subject: '정신의학과',
        title: "갑작스런 환경변화에 대한 게이머의 폭력성 측정",
        gender: "Don't care",
        age: { min: 10, max: 80 },
        bmi: { min: 10, max: 500 },
        smoking: true,
        volume: 1000,
      }),
    ]

    const { clinicalTest } = await inquirer.prompt([
      {
        name: 'clinicalTest',
        message: 'Your 임상실험 리스트',
        type: 'list',
        choices: [
          ...clinicalTests.map(clinicalTest => clinicalTest.title),
          new inquirer.Separator(),
          '새로운 인체실험 생성하기',
          new inquirer.Separator(),
        ]
      }
    ])

    if (clinicalTest === '새로운 인체실험 생성하기') {
      await createClinicalTest()
      continue
    }
  }
}

// getClinicalTests()

module.exports = { getClinicalTests }