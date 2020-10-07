import db from '../../../data/db';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, definition, id } = req.body;
  const session = await getSession({ req });
  db.task((t: any) => {
    return t
      .one(
        'SELECT id FROM users WHERE name = $1',
        session.user.name,
        (a: { id: any }) => a.id
      )
      .then((userid: number) => {
        if (!id) {
          return t.any(
            `INSERT INTO functions(name, description, definition, userid) 
            VALUES($1, $2, $3, $4)`,
            [name, description, definition, userid]
          );
        } else {
          return t.any(
            `UPDATE functions SET name = $1, description = $2, 
            definition = $3 WHERE id = $4 AND userid = $5`,
            [name, description, definition, id, userid]
          );
        }
      })
      .then(() => {
        res.statusCode = 200;
        return res.send('Function added successfully!');
      })
      .catch((error: string) => {
        console.log('ERROR: ', error);
        res.statusCode = 500;
        return res.send(`Error in add-function: ${error}`);
      });
  });
};
