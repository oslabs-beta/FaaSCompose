const path = require('path');
const fs = require('fs');

export default (req, res) => {
  const directory = path.join(process.cwd(), 'data/users');
  const filePath = path.join(directory, 'functions.json');

  const functions = JSON.parse(fs.readFileSync(filePath));
  res.statusCode = 200;
  res.send(functions);
  // console.log('Functions from read functions: ', functions);
};
