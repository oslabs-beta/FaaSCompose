const path = require('path');
const fs = require('fs');
import db from '../../../data/db';
import { getSession } from 'next-auth/client';

const readFunctionWithFiles = (req, res) => {
  const directory = path.join(process.cwd(), 'data/users');
  const filePath = path.join(directory, 'functions.json');

  const functions = JSON.parse(fs.readFileSync(filePath));
  res.statusCode = 200;
  res.send(functions);
  // console.log('Functions from read functions: ', functions);
};

export default async (req, res) => {
  const session = await getSession({ req });
  db.any(
    `select functions.* from functions inner join users on 
    functions.userid = users.id where users.name = $1`,
    session.user.name
  )
    .then((data) => {
      console.log('DATA:', data); // print data;
      const functions = {};
      data.forEach((element) => {
        functions[element.id] = element;
      });
      res.statusCode = 200;
      res.send(functions);
    })
    .catch((error) => {
      console.log('ERROR:', error); // print the error;
    });
};
