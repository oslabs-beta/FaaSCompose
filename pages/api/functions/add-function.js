const path = require('path');
const fs = require('fs');

export default (req, res) => {
  const directory = path.join(process.cwd(), 'data/');
  const filePath = path.join(directory, 'functions.json');
  // Take req.body (which should be ALL functions) and overwrite functions.json with that
  fs.writeFile(filePath, req.body, function (err) {
    if (err) {
      res.statusCode = 500;
      return res.send('Error in add-function: ', err);
    } else {
      res.statusCode = 200;
      return res.send('Function added successfully!');
    }
  });
};
