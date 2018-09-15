const axios = require("axios")
const { clear, retrieveDiseaseData } = require("../utils")
const inquirer = require("inquirer")
const fs = require("fs")
const term = require("terminal-kit").terminal
const path = require("path")

inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"))
inquirer.registerPrompt(
  "checkbox-plus",
  require("inquirer-checkbox-plus-prompt")
)

const additionalMedicalInfo = async () => {
  clear()

  term.drawImage(path.join(__dirname, "../../", "hospital.jpg"), {
    shrink: { width: term.width, height: term.height * 2 }
  })

  const responses = await inquirer.prompt([
    {
      name: "isTakingDrugs",
      message: "현재 복용중인 의약품이 있습니까?",
      type: "confirm",
      default: true
    },
    {
      name: "drugs",
      message: "현재 복용중인 의약품을 검색 후 선택하세요",
      type: "checkbox-plus",
      highlight: true,
      searchable: true,
      pageSize: 20,
      when: currentResponse => currentResponse.isTakingDrugs,
      source: async (answersSoFar, input) => {
        input = input || ""
        const response = await axios.get(
          `https://mdwalks.net/api/info/search/detail?term=${input}&type=component`
        )
        return response.data.results.component.list.map(item => ({
          name: item.name[0]
        }))
      }
    },
    {
      name: "hasDiseases",
      message: "현재 진단 받은 질병이 있습니까?",
      type: "confirm",
      default: true
    },
    {
      name: "diesases",
      message: "현재 진단 받은 질병을 검색 후 선택하세요",
      type: "checkbox-plus",
      highlight: true,
      searchable: true,
      pageSize: 15,
      when: currentResponse => currentResponse.hasDiseases,
      source: (answersSoFar, input) => {
        input = input || ""
        const searchResult = retrieveDiseaseData(input).map(d => d.name)
        return Promise.resolve(searchResult)
      }
    },
    {
      name: "geneticConditions",
      message: "다음 중 해당되는 유전 관련 이슈들이 있으면 선택해주세요",
      type: "checkbox",
      choices: [
        "해당 없음",
        "갈락토오스 불내성",
        "Lapp 유당분해효소 결핍증",
        "포도당-갈락토오스 흡수장애"
      ]
    },
    {
      name: "familyHistory",
      type: "checkbox",
      message: "가족력이 있으시다면 선택해주세요",
      choices: ["없음", "유전성 근질환"]
    }
  ])

  console.log(responses)

  // 7. 현재 약물 복용 여부를 입력한다
  // const medicationList = await cli.prompt(
  //   "💊 처방받은 약물 정보를 입력하세요"
  // )

  // 8. 유전 관련 문제 여부를 입력한다.
  // 갈락토오스 불내성, Lapp 유당분해효소 결핍증, 포도당-갈락토오스 흡수장애

  // 9. 가족력을 입력한다.
  // 유전성 근질환
}

additionalMedicalInfo()

module.exports = {
  additionalMedicalInfo
}