const axios = require("axios")
const { clear } = require("../utils")
const inquirer = require("inquirer")

inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"))
inquirer.registerPrompt(
  "checkbox-plus",
  require("inquirer-checkbox-plus-prompt")
)

const additionalMedicalInfo = async () => {
  clear()

  const responses = await inquirer.prompt([
    {
      name: "drugs",
      message:
        "현재 복용중인 의약품을 검색 후 선택하세요 (없으면 Enter, 있으면 Space로 선택)",
      type: "checkbox-plus",
      highlight: true,
      searchable: true,
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
      name: "geneticConditions",
      message:
        "다음 중 해당되는 유전 관련 이슈들이 있으면 선택해주세요 (없으면 Enter, 있으면 Space로 선택)",
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
      message:
        "가족력이 있으시다면 선택해주세요 (없으면 Enter, 있으면 Space로 선택)",
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
