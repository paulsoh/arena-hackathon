import {Command} from '@oclif/command'
import { login } from '../views/login'

export default class Register extends Command {
  static description = 'describe the command here'

  static args = [{name: 'file'}]

  async run() {
    login()
    // createClinicalTest()
    
    
    // 환자 추가 정보 받는 부분
    // additionalInfo() 
  }
}
