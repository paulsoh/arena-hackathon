const { createPatient } = require("./connect/patient")
const { createClinicalTest } = require("./connect/clinicalTest")

const patientList = [
  {
    patientAddress: "0x4c0408db276ef793333baf5b226d8b180c3d0a89",
    email: "JimRaynor@hacks.hycon.io",
    gender: "M",
    birthday: "19880915",
    isSmoker: "Y",
    height: 188,
    weight: 82,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x9d7822d5bb9f7b9b655669550095d2f14afac469",
    email: "SarahKerrigan@hacks.hycon.io",
    gender: "F",
    birthday: "19900812",
    isSmoker: "N",
    height: 171,
    weight: 52,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x17332dd7f9bd584e2e83f4cffdca0a448b3b903a",
    email: "Zeratul@hacks.hycon.io",
    gender: "M",
    birthday: "19450102",
    isSmoker: "N",
    height: 198,
    weight: 102,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xb45de3796b206793e8ad3509202da91d35e9a6d9",
    email: "Fenix@hacks.hycon.io",
    gender: "M",
    birthday: "19620304",
    isSmoker: "N",
    height: 197,
    weight: 101,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x1f627b7fb483e5b8d59aa191fec94d01753c7d24",
    email: "Adun@hacks.hycon.io",
    gender: "M",
    birthday: "19580705",
    isSmoker: "N",
    height: 148,
    weight: 43,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xa9f913312b7ec75f755c4f3edb6e2bbd3526b918",
    email: "Naktul@hacks.hycon.io",
    gender: "F",
    birthday: "19820905",
    isSmoker: "N",
    height: 167,
    weight: 56,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x3fae75cce89a972fa1b6d87bb080fb2c6060f0b3",
    email: "Zagara@hacks.hycon.io",
    gender: "F",
    birthday: "19720608",
    isSmoker: "N",
    height: 172,
    weight: 60,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x56fa56dc28081f6353737061e2278631b2659598",
    email: "Amon@hacks.hycon.io",
    gender: "M",
    birthday: "19650428",
    isSmoker: "Y",
    height: 182,
    weight: 78,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xd32115d6e4a4dfdf0807544723d514e3f293d3b6",
    email: "GerardDuGalle@hacks.hycon.io",
    gender: "M",
    birthday: "19591218",
    isSmoker: "Y",
    height: 175,
    weight: 69,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xafa5e9d58e245b7f3efecc9e706b06d52cd28da1",
    email: "MatthewHorner@hacks.hycon.io",
    gender: "M",
    birthday: "19511017",
    isSmoker: "Y",
    height: 179,
    weight: 75,
    drugs: JSON.stringify(['nifedipine 20mg','indomethacin 10mg']),
    diseases: JSON.stringify(['인슐린-비의존 당뇨병']),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  }
]

const clinicalTestList = [
  {
    companyAddress: "0x18282ec61c35bef47698c3e65314c9a0ff617b3c",
    subject: "병리학과",
    title: "급성 및 만성 위염 환자에서 CKD-495의 유효성과 안전성을 비교 평가하기 위한 무작위배정, 이중눈가림, 평행설계, 다기관, 제2상 임상시험",
    age: JSON.stringify([20, 55]),
    volume: 5
  },
  {
    companyAddress: "0x4f92c13cacf198eb25698709e3d225e6a2e22dd8",
    subject: "소화기내과",
    title: "단백 및 식이섬유 강화 시리얼바의 식전 섭취가 제2형 당뇨병 환자에서 장기적인 혈당 조절에 미치는 영향 평가",
    age: JSON.stringify([19, 80]),
    bmi: JSON.stringify([18.5, 35]),
    smoking: true,
    volume: 8
  },
  {
    companyAddress: "0xfbdb66ae3fa6f1b37a02c82751117fc3aad4572b",
    subject: "병리학과",
    title: "위식도역류질환 치료제의 임상시험",
    volume: 10
  }
]

const generator = async () => {
  try {
    patientList.forEach(function(patient) {
      createPatient(patient)
    })
    clinicalTestList.forEach(function(clinicalTest) {
      createClinicalTest(clinicalTestList)
    })
  } catch (e) {
    console.log(e)
  }
}

generator()
