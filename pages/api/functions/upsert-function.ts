import db from '../../../data/db';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

/*
  API to Insert or Update Function Info, including their definition, for one user
*/
export default async (req, res) => {
  // Determine whether we are updating or inserting
  // If there is an ID, we're inserting new function
  const { name, description, definition, id } = req.body;
  const session = await getSession({ req });
  console.log('SESSION NAME: ', session.user.name);
  db.task((t) => {
    return t
      .one(
        'SELECT id FROM users WHERE name = $1',
        session.user.name,
        (a) => a.id
      )
      .then((userid) => {
        console.log('USERID: ', userid);
        if (!id) {
          console.log('no ID');
          return t.any(
            `INSERT INTO functions(name, description, definition, userid) 
            VALUES($1, $2, $3, $4)`,
            [name, description, definition, userid]
          );
        } else {
          console.log('ID exists');
          return t.any(
            `UPDATE functions SET name = $1, description = $2, 
            definition = $3 WHERE id = $4 AND userid = $5`,
            [name, description, definition, id, userid]
          );
        }
      })
      .then((data) => {
        res.statusCode = 200;
        return res.send('Function added successfully!');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        res.statusCode = 500;
        return res.send('Error in add-function: ', error);
      });
  });
};
