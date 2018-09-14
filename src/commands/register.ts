import {Command} from '@oclif/command'
import axios from 'axios'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'

import {clear} from '../utils'

export default class Register extends Command {
  static description = 'describe the command here'

  static args = [{name: 'file'}]

  async run() {
    // createClinicalTest()
    
    
    // 환자 추가 정보 받는 부분
    // additionalInfo() 
  }
}
