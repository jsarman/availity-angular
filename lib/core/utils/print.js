'use strict';

var availity = require('../../module');
// https://github.com/jasonday/printThis/commit/66f9cbd0e3760767342eed4ef32cf8294417b227
availity.print = function() {

  if(document.queryCommandSupported('print')) {
    document.execCommand('print', false, null);
  } else {
    window.focus();
    window.print();
  }
};

module.exports = availity;