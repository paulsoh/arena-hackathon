class ClinicalTest {
  constructor({
    companyAddress,
    subject,
    title,
    gender,
    age,
    bmi,
    smoking,
    volume,
    diseases
  } = {}) {
    this.companyAddress = companyAddress
    this.subject = subject
    this.title = title
    this.gender = gender
    this.age = age
    this.bmi = bmi
    this.smoking = smoking
    this.volume = volume
    this.diseases = diseases
  }
}

module.exports = {
  ClinicalTest
}
