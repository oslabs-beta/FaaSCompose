const path = require('path');
const fs = require('fs');

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
}

export default (req, res) => {
    const {
        query: { compositionName },
    } = req
    if (req.body == null) {
        res.statusCode = 500
        return res.send('Composition Save: Missing Body');        
    }
    if (!compositionName){
        res.statusCode = 500
        return res.send('Composition Save: Missing Composition Name');        
    }
    const directory = path.join(process.cwd(), 'data/users/')
    const agnosticfilePath = path.join(directory, `${compositionName}-agnostic.json`)
    fs.writeFile(agnosticfilePath, JSON.stringify(req.body), function (err) {
        if (err) {
            console.log("Composition Save: ", err);
            res.statusCode = 500
            return res.send('Composition Save: Failure when saving the composition');  
        } else {
            res.statusCode = 200
            return res.send(''); 
        }        
      });
  }
  