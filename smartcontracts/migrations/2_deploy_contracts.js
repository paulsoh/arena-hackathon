var ConvertLib = artifacts.require("./ConvertLib.sol")
var ClinCoin = artifacts.require("./ClinCoin.sol")
var PatientRegistrar = artifacts.require("./PatientRegistrar.sol")
var ClinicalTest = artifacts.require("./ClinicalTest.sol")
const HyconToken = artifacts.require("./HyconToken.sol")

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib)
  // deployer.link(ConvertLib, ClinCoin)
  // deployer.deploy(ClinCoin)
  deployer.deploy(PatientRegistrar)
  deployer.deploy(ClinicalTest)
  deployer.deploy(HyconToken)
}
