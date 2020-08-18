const composer = require('openwhisk-composer'); module.exports = composer.if(
        composer.action('authenticate', 
        { 
            action: function ({ password }) { return { value: password === 'abc123' } } 
        }),
        composer.action('success authenticate', 
        { 
            action: function () { return { message: 'success' } } 
        }),
        composer.action('failure authenticate', 
        { 
            action: function () { return { message: 'failure' } } 
      }))