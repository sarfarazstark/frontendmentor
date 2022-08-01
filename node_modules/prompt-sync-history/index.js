var fs = require('fs');
var HISTORY_MAX = 100;
var HISTORY_FILE = '.prompt_hist.txt'

module.exports = function history(file, max) {
  var HIST = [];
  max = max || HISTORY_MAX;
  file = file || HISTORY_FILE;
  
  try {
    HIST = fs.readFileSync(file, {encoding: 'utf8'})
      .split('\n').slice(0, -1);
  } catch(e) {}

  HIST = HIST.slice(HIST.length - max, HIST.length);

  var ix = HIST.length;

  return {
    atStart: function () { return ix <= 0; },
    atPenultimate: function () { return  ix === HIST.length - 1; },
    pastEnd: function () { return ix >= HIST.length; },
    atEnd: function () { return ix === HIST.length; },
    prev: function () { return HIST[--ix]; },
    next: function () { return HIST[++ix]; },
    reset: function () { ix = HIST.length; },
    push: function (str) { 
      if (~HIST.indexOf(str)) return
      HIST.push(str)
    },
    save: function() {
      fs.writeFileSync(file, HIST.join('\n') + '\n');
    }
  }
}