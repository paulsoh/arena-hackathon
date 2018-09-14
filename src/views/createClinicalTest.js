const inquirer = require("inquirer")

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
        choices: ["M", "F"]
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
        type: "confirm"
      }
    ]
  },
]

const clinicalTest = {}

const createClinicalTest = async () => {
  while (true) {
    clear()
    const { property } = await inquirer.prompt([
      {
        name: "property",
        message: "편집할 필드를 선택하세요",
        type: "list",
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
    // console.log(property)
    clear()
    if (property === "Confirm") {
      const { confirm } = await inquirer.prompt([
        {
          name: "confirm",
          message: "Is it right?",
          type: "confirm"
        }
      ])

      if (confirm) return clinicalTest
      continue
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

module.exports = { createClinicalTest }
