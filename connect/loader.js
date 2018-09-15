const fs = require("fs")

module.exports = {
  loadConfig: (path) => {
    let configPath = "./config.json"
    if (path) {
      configPath = path
    }
    try { 
      const config = JSON.parse(fs.readFileSync(configPath))
      const requiredConfigs = ["httpProvider", "CLINICALTEST_CONTRACT", "PATIENT_CONTRACT", "adminAddress"]
      requiredConfigs.forEach(configKey => {
        if (!Object.keys(config).includes(configKey)) {
          console.log(`${configKey} is not provided; using default value as fallback`)
        }
      })
      return config
    } catch (e) {
      console.log(e)
      console.log("Failed to load config from file, failing silently...")
      return {}
    }
  }
}
