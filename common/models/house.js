'use strict';

let axios = require('axios');
module.exports = function(House) {
  House.testBTNAPI = function(cb) {
    axios.post(process.env.BTN_API + '/house-list', {
      headers: {
        apikey: process.env.BTN_TOKEN,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      console.log('res : ', res)
      cb(null, res)
    }).catch(err => {
      console.log('error : ', err)
    })
  }

  House.remoteMethod('testBTNAPI', {
    http: {
      path: '/test-btn-api',
      verb: 'get',
    },
    returns: {
      arg: 'result', type: 'object',
    },
    description: 'just test BTN API',
  })

};
