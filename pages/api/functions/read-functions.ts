import db from '../../../data/db';
import { getSession } from 'next-auth/client';

/*
 API to get the list of functions for the current user
*/
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
