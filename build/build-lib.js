/**
 * Build npm lib
 */
const shell = require('shelljs')
const signale = require('signale')

const { Signale } = signale
// 'bootstrap',
const tasks = [
  'lint',
  'clean',
  'build:entry',
  'lib',
  'build:utils',
  'build:style'
]

tasks.forEach(task => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  shell.exec(`npm run ${task} --silent`)
  interactive.success(task)
})
