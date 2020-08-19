const path = require('path');
const fs = require('fs');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default (req, res) => {
  const directory = path.join(process.cwd(), 'data/users');
  const filePath = path.join(directory, 'functions.json');
  // Take req.body (which should be ALL functions) and overwrite functions.json with that

  const functions = JSON.parse(fs.readFileSync(filePath));
  const { name, description, definition, id } = req.body;
  functions[name] = { name, id, description, definition };

  fs.writeFile(filePath, JSON.stringify(functions), function (err) {
    if (err) {
      res.statusCode = 500;
      return res.send('Error in add-function: ', err);
    } else {
      res.statusCode = 200;
      return res.send('Function added successfully!');
    }
  });
};
