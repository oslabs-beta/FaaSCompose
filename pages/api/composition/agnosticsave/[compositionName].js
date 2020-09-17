const path = require('path');
const fs = require('fs');

const compositionsDirectory = path.join(process.cwd(), 'data/users/compositions');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default (req, res) => {
  const {
    query: { compositionName },
  } = req;
  if (req.body == null) {
    res.statusCode = 500;
    return res.send('Composition Save: Missing Body');
  }
  if (!compositionName) {
    res.statusCode = 500;
    return res.send('Composition Save: Missing Composition Name');
  }
  const agnosticfilePath = path.join(compositionsDirectory, `${compositionName}-agnostic.json`);
  fs.writeFile(agnosticfilePath, JSON.stringify(req.body), (err) => {
    if (err) {
      console.log('Composition Save: ', err);
      res.statusCode = 500;
      return res.send('Composition Save: Failure when saving the composition');
    }
    res.statusCode = 200;
    return res.send('');
  });
};
