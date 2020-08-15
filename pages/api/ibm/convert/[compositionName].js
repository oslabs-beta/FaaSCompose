// import path from 'path'
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

export default (req, res) => {
    const {
        query: { compositionName },
      } = req
    
    const directory = path.join(process.cwd(), 'data/users/')
    const filePath = path.join(directory, compositionName)
    const cmd =  `compose ${filePath}.js > ${filePath}.json`;
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
            const convertedFileContent = fs.readFileSync(`${filePath}.json`);
            res.json(convertedFileContent);
        } 
    });
  }
  