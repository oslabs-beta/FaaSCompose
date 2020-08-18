// import path from 'path'
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const userDirectory = path.join(process.cwd(), 'data/users');
const compositionsDirectory = path.join(userDirectory, 'compositions')

function getIfComposition(ifAction,successAction,failureAction) {
    return `module.exports = composer.if(
        composer.action('${ifAction.name}', 
        { 
            action: ${ifAction.definition} } 
        }),
        composer.action('${successAction.name}', 
        { 
            action: ${successAction.definition} } 
        }),
        composer.action('${failureAction.name}', 
        { 
            action: ${failureAction.definition} } 
      }))`
}

function getSequenceComposition(action1,action2) {
    return `module.exports = composer.sequence(
        composer.action('${action1.name}', 
        { 
            action: ${action1.definition} } 
        }),
        composer.action('${action2.name}', 
        { 
            action: ${action2.definition} } 
        })
    )`
}

function ConvertAgnosticCompositionIntoJSCode(compositionName){
    // read the agnostic composition
    const agnosticfilePath = path.join(compositionsDirectory, `${compositionName}-agnostic.json`)
    const agnosticContent = JSON.parse(fs.readFileSync(agnosticfilePath));

    // get function definitions for this user    
    const filePath = path.join(userDirectory, 'functions.json');    
    const functions = JSON.parse(fs.readFileSync(filePath));

    // convert the agnostic composition it into js code    
    let jsContent = "const composer = require('openwhisk-composer'); "
    // if its an "If composition"
    jsContent +=  getIfComposition(functions['authenticate'],functions['success authenticate'],functions['failure authenticate'])
    // if its an "sequence composition"
    // TODO: sequence code
    // Save the IBM specific JS into a file for later use
    const ibmCompositionJsfilePath = path.join(compositionsDirectory,`${compositionName}.js`)
    fs.writeFileSync(ibmCompositionJsfilePath, jsContent);

    return ibmCompositionJsfilePath;
}

export default (req, res) => {
    const {
        query: { compositionName },
      } = req;
    
    // convert from agnostic to ibm specific JS composition representation
    const ibmCompositionJsfilePath = ConvertAgnosticCompositionIntoJSCode(compositionName);
    
    // convert the JS into JSON IBM specific representation with the compose cmd line
    const ibmCompositionJsonfilePath = path.join(compositionsDirectory,`${compositionName}.json`)
    const cmd =  `compose ${ibmCompositionJsfilePath} > ${ibmCompositionJsonfilePath}`;
    shell.exec(cmd, function(code, stdout, stderr) {
        console.log('ibmconvert Exit code:', code);
        console.log('ibmconvert target output:', stdout);
        console.log('ibmconvert target stderr:', stderr);
        // check code and stdout and stderr
        if (code !== 0) {
            res.statusCode = 500
            res.send(stderr);
        } else {
            res.statusCode = 200
            // return the converted file                        
            const convertedFileContent = fs.readFileSync(`${ibmCompositionJsonfilePath}`);
            res.json(convertedFileContent);
        } 
    });
  }
  