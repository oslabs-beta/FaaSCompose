const shell = require('shelljs');

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }
  

export default (req, res) => {
    // get current user to get its configuration and to know where to get the files from  
    // get the name of the composition to deploy
    const {
        query: { compositionName },
    } = req          
    let ibmInvokeCmd =  `ibmcloud fn action invoke --result ${compositionName}`;
    // get parameters, if any received in the body
    if (req.body != null) {
        const body = req.body;        
        const keys = Object.keys(body);        
        ibmInvokeCmd += ' --param';
        keys.forEach((key) => {
            ibmInvokeCmd += ` ${key} ${body[key]}`
        });
    }
    console.log('ibm function invoke cmd', ibmInvokeCmd)
    shell.exec(ibmInvokeCmd, function(code, stdout, stderr) {
        console.log('ibm function invoke Exit code:', code);
        console.log('ibm function invoke stdout:', stdout);
        console.log('ibm function invoke stdout:', stdout);
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