const shell = require('shelljs');
const fs = require('fs');
const path = require('path');


export default (req, res) => {
    // get current user to get its configuration and to know where to get the files from
    // get its config
    const directory = path.join(process.cwd(), 'data/users/');
    const configForUserPath = path.join(directory, 'userconfig.json');
    const configString = fs.readFileSync(configForUserPath, "utf8");
    const configForUser =  JSON.parse(configString);
    console.log('user config', configForUser);
    const { region, user, password , resourcegroup, org,space } = configForUser.ibmcloud;      
    const ibmCloudCmd =  `ibmcloud login -r '${region}' -u ${user} -p '${password}' -g ${resourcegroup}`;
    const ibmCloudTargetCmd =  `ibmcloud target -o '${org}' -s ${space}`;
    shell.exec(ibmCloudCmd, function(code, stdout, stderr) {
        console.log('ibm login Exit code:', code);
        console.log('ibm login output:', stdout);
        console.log('ibm login stderr:', stderr);
        // check code and stdout and stderr
        if (code !== 0) {
            res.statusCode = 500
            res.send(stderr);
        } else {
            shell.exec(ibmCloudTargetCmd, function(code, stdout, stderr) {
                console.log('ibmcloud target Exit code:', code);
                console.log('ibmcloud target output:', stdout);
                console.log('ibmcloud target stderr:', stderr);
                // check code and stdout and stderr
                if (code !== 0) {
                    res.statusCode = 500
                    res.send(stderr);
                } else {
                    res.statusCode = 200
                    res.send(stdout);
                } 
            });
        }        
      });
  }
  
