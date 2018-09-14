import {expect, test} from '@oclif/test'

describe('register-patient', () => {
  test
    .stdout()
    .command(['register-patient'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['register-patient', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
