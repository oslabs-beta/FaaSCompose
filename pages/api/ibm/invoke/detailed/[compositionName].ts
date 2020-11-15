const shell = require('shelljs');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

/*
 API to Execute the composition, but getting additional information after execution, like how much it took to execute, etc
*/
export default (req, res) => {
  // get current user to get its configuration and to know where to get the files from
  // get the name of the composition to deploy
  const {
    query: { compositionName },
  } = req;
  let ibmInvokeCmd = `ibmcloud fn action invoke ${compositionName}`;
  // get parameters, if any received in the body
  if (req.body != null) {
    const { body } = req;
    const keys = Object.keys(body);
    ibmInvokeCmd += ' --param';
    keys.forEach((key) => {
      ibmInvokeCmd += ` ${key} ${body[key]}`;
    });
  }
  console.log('ibm function invoke cmd', ibmInvokeCmd);
  shell.exec(ibmInvokeCmd, (code, stdout, stderr) => {
    console.log('ibm function invoke Exit code:', code);
    console.log('ibm function invoke stdout:', stderr);
    console.log('ibm function invoke stderr:', stdout);
    // check code and stdout and stderr
    if (code !== 0) {
      res.statusCode = 500;
      res.send(stderr);
    } else {
      const results = stdout.split(' ');
      const resultGuid = results[results.length - 1];
      const ibmInvokeDetailCmd = `ibmcloud fn activation get ${resultGuid}`;
      shell.exec(ibmInvokeDetailCmd, (code, stdout, stderr) => {
        console.log('ibm function invoke detailed Exit code:', code);
        console.log('ibm function invoke detailed stdout:', stdout);
        console.log('ibm function invoke detailed stderr:', stderr);
        if (code !== 0) {
          res.statusCode = 500;
          res.send(stderr);
        } else {
          res.statusCode = 200;
          res.json(stdout);
        }
      });
    }
  });
};
