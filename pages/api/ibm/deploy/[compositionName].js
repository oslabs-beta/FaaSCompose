const shell = require('shelljs');
const path = require('path');

const compositionsDirectory = path.join(process.cwd(), 'data/users/compositions')

export default (req, res) => {
    // get current user to get its configuration and to know where to get the files from  
    // get the name of the composition to deploy
    const {
        query: { compositionName },
    } = req;    
    const filePath = path.join(compositionsDirectory, compositionName)    
    const ibmDeployCmd =  `deploy ${compositionName} ${filePath}.json -w`;
    shell.exec(ibmDeployCmd, function(code, stdout, stderr) {
        console.log('ibm function deploy Exit code:', code);
        console.log('ibm function deploy stdout:', stdout);
        console.log('ibm function deploy stdout:', stdout);
        // check code and stdout and stderr
        if (code !== 0) {
            res.statusCode = 500
            res.send(stderr);
        } else {
            res.statusCode = 200;
            res.send(stdout);
        } 
  });
}