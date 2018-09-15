const { ClinicalTest } = require('./models/ClinicalTest')

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

module.exports = {
  clinicalTests
}