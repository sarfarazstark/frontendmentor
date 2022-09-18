// basic:
console.log(require('prompt-sync')()('tell me something about yourself: '))

const prompt = require('prompt-sync')({
  history: require('prompt-sync-history')(),
  autocomplete: complete(['hello1234', 'he', 'hello', 'hello12', 'hello123456']),
  sigint: false
})

const value = 'frank'
const name = prompt('enter name: ', value)
console.log('enter echo * password')
const pw = prompt({
  echo: '*'
})
const pwb = prompt('enter hidden password (or don\'t): ', {
  echo: '',
  value: '*pwb default*'
})
const pwc = prompt.hide('enter another hidden password: ')
const autocompleteTest = prompt('custom autocomplete: ', {
  autocomplete: complete(['bye1234', 'by', 'bye12', 'bye123456'])
})

prompt.history.save()

console.log('\nName: %s\nPassword *: %s\nHidden password: %s\nAnother Hidden password: %s', name, pw, pwb, pwc)
console.log('autocomplete2: ', autocompleteTest)

function complete (commands) {
  return function (str) {
    let i
    const ret = []
    for (i = 0; i < commands.length; i++) {
      if (commands[i].indexOf(str) === 0) { ret.push(commands[i]) }
    }
    return ret
  }
};
