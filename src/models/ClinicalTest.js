const Table = require("cli-table")
const isEmpty = require("lodash").isEmpty
const chalk = require("chalk")

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

  prettyPrint() {
    const fields = [
      "Subject",
      "Title",
      "Gender",
      "Age Range",
      "BMI Range",
      "Smoking?",
      "# of patients"
    ]

    process.stdout.write(
      chalk.blue.bold(
        "===================================================================================\n"
      )
    )
    process.stdout.write(chalk.red.bold.underline("Subject:"))
    process.stdout.write(chalk.white(" "))
    console.log(chalk.white(`${this.subject}\n`))

    process.stdout.write(chalk.red.bold.underline("Title:"))
    process.stdout.write(chalk.white(" "))
    console.log(chalk.white(`${this.title}\n`))

    process.stdout.write(chalk.red.bold.underline("Diseases:"))
    process.stdout.write(chalk.white(" "))
    console.log(
      chalk.white(`${this.diseases && this.diseases.length ? this.diseases[0] : "None"}\n`)
    )

    process.stdout.write(chalk.red.bold.underline("Gender:"))
    process.stdout.write(chalk.white(" "))
    console.log(chalk.white(`${this.gender || "상관 없음"}\n`))

    process.stdout.write(chalk.red.bold.underline("Age Range:"))
    process.stdout.write(chalk.white(" "))
    console.log(
      chalk.white(
        isEmpty(this.age) ? "-\n" : `${this.age.min}-${this.age.max}\n`
      )
    )

    process.stdout.write(chalk.red.bold.underline("BMI Range:"))
    process.stdout.write(chalk.white(" "))
    console.log(
      chalk.white(
        isEmpty(this.bmi) ? "-\n" : `${this.bmi.min}-${this.bmi.max}\n`
      )
    )
    process.stdout.write(chalk.red.bold.underline("Smoking?:"))
    process.stdout.write(chalk.white(" "))
    console.log(chalk.white(this.smoking ? "⭕️\n" : "❌\n"))

    process.stdout.write(chalk.red.bold.underline("# of Patients:"))
    process.stdout.write(chalk.white(" "))
    console.log(chalk.white(`${this.volume}\n`))
    process.stdout.write(
      chalk.blue.bold(
        "===================================================================================\n"
      )
    )
    console.log("\n")
  }
}

module.exports = {
  ClinicalTest
}
