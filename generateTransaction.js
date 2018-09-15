const { createPatient } = require("./connect/patient")
const { createClinicalTest } = require("./connect/clinicalTest")

const patientList = [
  {
    patientAddress: "0x4c0408db276ef793333baf5b226d8b180c3d0a89",
    email: "JimRaynor@hacks.hycon.io",
    gender: "M",
    birthday: "19880915",
    isSmoker: true,
    height: 188,
    weight: 82,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["급성 출혈성 위염"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x9d7822d5bb9f7b9b655669550095d2f14afac469",
    email: "SarahKerrigan@hacks.hycon.io",
    gender: "F",
    birthday: "19900812",
    isSmoker: false,
    height: 171,
    weight: 52,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["상세불명의 만성 위염"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x17332dd7f9bd584e2e83f4cffdca0a448b3b903a",
    email: "Zeratul@hacks.hycon.io",
    gender: "M",
    birthday: "19450102",
    isSmoker: true,
    height: 198,
    weight: 102,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["제2형 당뇨"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xb45de3796b206793e8ad3509202da91d35e9a6d9",
    email: "Fenix@hacks.hycon.io",
    gender: "M",
    birthday: "19620304",
    isSmoker: false,
    height: 197,
    weight: 101,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["위-식도역류병"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x1f627b7fb483e5b8d59aa191fec94d01753c7d24",
    email: "Adun@hacks.hycon.io",
    gender: "M",
    birthday: "19580705",
    isSmoker: false,
    height: 148,
    weight: 43,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["상세불명의 이차성 고혈압"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xa9f913312b7ec75f755c4f3edb6e2bbd3526b918",
    email: "Naktul@hacks.hycon.io",
    gender: "F",
    birthday: "19820905",
    isSmoker: false,
    height: 167,
    weight: 56,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["상세불명의 이차성 고혈압"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x3fae75cce89a972fa1b6d87bb080fb2c6060f0b3",
    email: "Zagara@hacks.hycon.io",
    gender: "F",
    birthday: "19720608",
    isSmoker: true,
    height: 172,
    weight: 60,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["위-식도역류병"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0x56fa56dc28081f6353737061e2278631b2659598",
    email: "Amon@hacks.hycon.io",
    gender: "M",
    birthday: "19650428",
    isSmoker: true,
    height: 182,
    weight: 78,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["제2형 당뇨"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xd32115d6e4a4dfdf0807544723d514e3f293d3b6",
    email: "GerardDuGalle@hacks.hycon.io",
    gender: "M",
    birthday: "19591218",
    isSmoker: true,
    height: 175,
    weight: 69,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["상세불명의 만성 위염"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  },
  {
    patientAddress: "0xafa5e9d58e245b7f3efecc9e706b06d52cd28da1",
    email: "MatthewHorner@hacks.hycon.io",
    gender: "M",
    birthday: "19511017",
    isSmoker: true,
    height: 179,
    weight: 75,
    drugs: JSON.stringify(["nifedipine 20mg", "indomethacin 10mg"]),
    diseases: JSON.stringify(["급성 출혈성 위염"]),
    geneticConditions: JSON.stringify([]),
    familyHistory: JSON.stringify([])
  }
]

const clinicalTestList = [
  {
    companyAddress: "0x18282ec61c35bef47698c3e65314c9a0ff617b3c",
    subject: "병리학과",
    title:
      "급성 및 만성 위염 환자에서 CKD-495의 유효성과 안전성을 비교 평가하기 위한 무작위배정, 이중눈가림, 평행설계, 다기관, 제2상 임상시험",
    age: { min: 20, max: 55 },
    volume: 5,
    diseases: ["급성 출혈성 위염", "상세불명의 만성 위염"],
    smoking: "No"
  },
  {
    companyAddress: "0x4f92c13cacf198eb25698709e3d225e6a2e22dd8",
    subject: "소화기내과",
    title:
      "단백 및 식이섬유 강화 시리얼바의 식전 섭취가 제2형 당뇨병 환자에서 장기적인 혈당 조절에 미치는 영향 평가",
    age: { min: 19, max: 80 },
    bmi: { min: 18, max: 35 },
    smoking: "Yes",
    diseases: ["제2형 당뇨"],
    volume: 8
  },
  {
    companyAddress: "0xfbdb66ae3fa6f1b37a02c82751117fc3aad4572b",
    subject: "병리학과",
    title: "위식도역류질환 치료제의 임상시험",
    diseases: ["위-식도역류병"],
    volume: 10
  },
  {
    companyAddress: "0x3b1cb706e5fff494da8873ad9c1a30aa802f4522",
    subject: "순환기내과",
    title: "저항성 고혈압 환자 대상 의료기기 임상시험 ",
    age: { min: 20, max: 75 },
    diseases: ["상세불명의 이차성 고혈압"],
    volume: 10
  },
  {
    companyAddress: "0xd74485a6600d8de95d84d5e1747480c528df1f9a",
    subject: "임상약리과",
    diseases: ["상세불명의 이차성 고혈압"],
    title:
      "라푸티딘(Lafutidine)과 이르소글라딘 말레산염(Irsogladine maleate)의 제 1상 임상시험",
    age: { min: 19, max: 50 },
    volume: 10
  }
]

const generator = async () => {
  try {
    patientList.forEach(function(patient) {
      createPatient(patient)
    })
    clinicalTestList.forEach(function(clinicalTest) {
      createClinicalTest(clinicalTest)
    })
  } catch (e) {
    console.log(e)
  }
}

generator()
