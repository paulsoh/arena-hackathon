const chalk = require("chalk")
const figlet = require("figlet")
const inquirer = require("inquirer")

const { ClinicalTest } = require("../models/ClinicalTest")
const { createClinicalTest } = require("../../connect/clinicalTest")
const { clear } = require("../utils")

const properties = [
  {
    name: "subject",
    friendlyName: "Subject",
    inputs: [
      {
        name: "subject",
        message: "Subject",
        type: "input"
      }
    ]
  },
  {
    name: "title",
    friendlyName: "Title",
    inputs: [
      {
        name: "title",
        message: "Title",
        type: "input"
      }
    ]
  },
  {
    name: "gender",
    friendlyName: "Gender",
    inputs: [
      {
        name: "gender",
        message: "Gender",
        type: "list",
        choices: ["M", "F", "Don't care"]
      }
    ]
  },
  {
    name: "age",
    friendlyName: "Age",
    inputs: [
      {
        name: "min",
        message: "Minimum age",
        type: "input",
        validate: age => 1 < age && age < 100
      },
      {
        name: "max",
        message: "Maximum age",
        type: "input",
        validate: age => 1 < age && age < 100
      }
    ],
    format: ({ min, max }) => `${min}-${max}`
  },
  {
    name: "bmi",
    friendlyName: "BMI",
    inputs: [
      {
        name: "min",
        message: "Minimum BMI",
        type: "input",
        validate: bmi => 10 < bmi && bmi < 60
      },
      {
        name: "max",
        message: "Maximum BMI",
        type: "input",
        validate: bmi => 10 < bmi && bmi < 60
      }
    ],
    format: ({ min, max }) => `${min}-${max}`
  },
  {
    name: "smoking",
    friendlyName: "Smoking Preference",
    inputs: [
      {
        name: "smoking",
        message: "Is smoker available?",
        type: "list",
        choices: ["Yes", "No", "Don't care"]
      }
    ]
  },
  {
    name: "volume",
    friendlyName: "A volume of recruitment",
    inputs: [
      {
        name: "volume",
        type: "input",
        validate: vol => 0 < vol && vol < Infinity
      }
    ]
  },
  {
    name: "disease",
    friendlyName: 'Disease',
    inputs: [
      {
        name: 'disease',
        type: 'input',
      }
    ]
  }
]

const clinicalTest = new ClinicalTest()

const createClinicalTestView = async user => {
  while (true) {
    clear()

    clinicalTest.companyAddress = user.address

    console.log(
      chalk.green(
        figlet.textSync("New Clinical Trial", { horizontalLayout: "full" })
      )
    )

    const { property } = await inquirer.prompt([
      {
        name: "property",
        message: "편집할 필드를 선택하세요",
        type: "list",
        pageSize: 15,
        choices: [
          ...properties.map(
            property => ({
              name: `${property.friendlyName}: ${
                property.format && clinicalTest[property.name]
                  ? property.format({
                      min: clinicalTest[property.name].min,
                      max: clinicalTest[property.name].max
                    })
                  : clinicalTest[property.name]
                    ? clinicalTest[property.name]
                    : ""
              }`,
              value: property.name
            })

            // `${property.friendlyName}: ${
            //   clinicalTest[property.name]
            //     ? property.format
            //       ? property.format(clinicalTest[property.name])
            //       : clinicalTest[property.name]
            //     : ""
            // }`
          ),
          new inquirer.Separator(),
          "Confirm",
          new inquirer.Separator()
        ]
      }
    ])
    clear()
    if (property === "Confirm") {
      clinicalTest.prettyPrint()
      const { confirm } = await inquirer.prompt([
        {
          name: "confirm",
          message: "Is it right?",
          type: "confirm"
        }
      ])

      if (confirm) {
        // Send Tx
        await createClinicalTest({
          ...clinicalTest
        })
        return
      }
    }
    // console.log(property)
    clear()
    const responses = await inquirer.prompt(
      properties.filter(p => p.name === property)[0].inputs
    )
    if (Object.keys(responses).length === 1) {
      clinicalTest[property] = responses[property]
    } else {
      clinicalTest[property] = responses
    }

    console.log(clinicalTest)
    // console.log(responses)
  }
}

// createClinicalTest()

module.exports = { createClinicalTestView }
