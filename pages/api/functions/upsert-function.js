const fs = require('fs');
import db from '../../../data/db';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default (req, res) => {
  // Determine whether we are updating or inserting
  // If there is an ID, we're inserting new function
  const { name, description, definition, id } = req.body;
  const session = await getSession({ req });
  db.task(t => {
    return t.one('SELECT userid FROM users WHERE name = $1', session.user.name, a=> a.userid)
      .then(userid => {
        if (!id) {
          return t.any('INSERT INTO functions(name, description, definition, userid) VALUES($1, $2, $3, $4)', name, description, definition, userid)
        } else {
          return t.any('UPDATE functions SET name = $1, description = $2, definition = $3 WHERE id = $4 AND userid = $5', name, description, definition, id, userid)
        }
      })
      .then(data => {
        res.statusCode = 200;
        return res.send('Function added successfully!');
    })
    .catch(error => {
      res.statusCode = 500;
      return res.send('Error in add-function: ', error); 
    });
  }
  )
};
