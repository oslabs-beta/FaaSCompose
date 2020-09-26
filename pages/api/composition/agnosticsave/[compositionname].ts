const path = require('path');
const fs = require('fs');

const compositionsDirectory = path.join(
  process.cwd(),
  'data/users/compositions'
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default (req, res) => {
  const {
    query: { compositionname },
  } = req;
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    res.statusCode = 500;
    return res.send('Composition Save: Missing Body');
  }
  if (!compositionname) {
    res.statusCode = 500;
    return res.send('Composition Save: Missing Composition Name');
  }
  const agnosticfilePath = path.join(
    compositionsDirectory,
    `${compositionname}-agnostic.json`
  );
  fs.writeFile(agnosticfilePath, JSON.stringify(req.body), (err) => {
    if (err) {
      console.log('Composition Save: ', err);
      res.statusCode = 500;
      return res.send('Composition Save: Failure when saving the composition');
    }
    console.log('Composition Save: Save successful');
    res.statusCode = 200;
    return res.send('');
  });
};
