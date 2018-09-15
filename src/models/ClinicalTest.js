class ClinicalTest {
  constructor({
    subject,
    title,
    gender,
    age,
    bmi,
    smoking,
    volume,
  } = {}) {
    this.subject = subject
    this.title = title
    this.gender = gender
    this.age = age
    this.bmi = bmi
    this.smoking = smoking
    this.volume = volume
  }
}

module.exports = {
  ClinicalTest
}