const shell = require('shelljs');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

/*
 API that received the composition name as paramter on the query string 
 and attemp to execute a composition on the IBM cloud with that name
 by calling the IBM CLI using the command line
 parameters will be passed if needed
 If succesful, it will return the result of the execution (thats why the command have the "--result")
*/

export default (req, res) => {
  // get current user to get its configuration and to know where to get the files from
  // get the name of the composition to deploy
  const {
    query: { compositionName },
  } = req;
  let ibmInvokeCmd = `ibmcloud fn action invoke --result ${compositionName}`;
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
  // Invoking the composition calling the IBM Cloud CLI using the command line
  shell.exec(ibmInvokeCmd, (code: number, stdout: any, stderr: any) => {
    // if code is 0 the call was succesfull
    console.log('ibm function invoke Exit code:', code);
    console.log('ibm function invoke stdout:', stdout);
    console.log('ibm function invoke stdout:', stdout);
    // check code and stdout and stderr
    if (code !== 0) {
      res.statusCode = 500;
      res.send(stderr);
    } else {
      res.statusCode = 200;
      res.send(stdout);
    }
  });
};
