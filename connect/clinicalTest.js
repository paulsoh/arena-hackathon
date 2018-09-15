const { ClinicalTest } = require('../src/models/ClinicalTest')
const Web3 = require('web3')
const fs = require('fs')

const gas = 456540
const gasPrice = "10000000000"
const adminAddress = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"

const httpProvider = "http://10.10.1.114:8545"
const CLINICALTEST_CONTRACT = ""
const clinicalTestContractABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../', 'smartcontracts', 'build', 'contracts', 'ClinicalTest.json'))
).abi

const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))

const clinicalTestRef = new web3.eth.Contract(
  clinicalTestContractABI,
  CLINICALTEST_CONTRACT
)

const createClinicalTest = ({
  companyAddress,
  subject,
  title,
  gender,
  age = JSON.stringify({}),
  bmi = JSON.stringify({}),
  smoking,
  volume,
}) => {
  return clinicalTestRef.methods.createClinicalTest(
    companyAddress,
    subject,
    title,
    gender,
    age,
    bmi,
    smoking,
    volume,
  ).send({
    from: adminAddress,
    gas,
    gasPrice
  }).then(resp => {
    console.log(
      `Successfully added Patient with tx hash ${resp.transactionHash}`
    )
  },
  e => console.log(e)
  )
}

const getClinicalTests = () => {
  const getBasicInfo = clinicalTestRef.methods.getClinicalTests().call()
  const getDetailInfo = clinicalTestRef.methods.getClinicalTestDetails().call()
  return Promise.all([getBasicInfo, getDetailInfo]).then(results => {
    return rehydrateClinicalTests(results[0], results[1])
  })
}

const FIELDS = [
  "companyAddress",
  'subject',
  'title',
  'gender',
  'age',
  'bmi',
  'smoking',
  'volume'
]

const rehydrateClinicalTests = (...contractResponses) => {
  const basicInfo = Object.values(contractResponses[0])
  const detailInfo = Object.values(contractResponses[1])
  const clinicalTests = []

  const [ addresses, subjects, titles ] = basicInfo
  const [ _, genders, ages, bmis, smokings, volumes ] = detailInfo

  const clinicalTests = addresses.map(address => {
    return new ClinicalTest({
      subject: subjects[index],
      title: titles[index],
      gender: genders[index],
      age: JSON.parse(ages[index]),
      bmi: JSON.parse(bmis[index]),
      smoking: smokings[index],
      volume: volumes[index]
    })
  })

  return clinicalTests
}
modules.exports = { createClinicalTest, getClinicalTests }