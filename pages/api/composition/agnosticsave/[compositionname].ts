import db from '../../../../data/db';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
/*
 API to save the agnostic composition on JSON format inside the compositions table
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
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

  const session = await getSession({ req });
  /* 
    this step looks for the user and get its id to use it in futher operations
    then checks if a composition already exists with a specific name for the current user
    if it does it updates the composition definition
    if it doesn't it creates a new composition with the passed name and definition
  */
  db.task((t) => {
    return t
      .one(
        'SELECT id FROM users WHERE name = $1',
        session.user.name,
        (a) => a.id
      )
      .then((userid) => {
        // console.log('USERID: ', userid);
        return t
          .any(
            'SELECT id FROM compositions WHERE name = $1 AND userid = $2',
            [compositionname, userid],
            (a) => a.id
          )
          .then((compositions) => {
            console.log('compositions', compositions);

            if (compositions.length === 0) {
              console.log('no ID');
              return t.any(
                `INSERT INTO compositions(name, description, definition, userid) 
                VALUES($1, $2, $3, $4)`,
                [compositionname, '', JSON.stringify(req.body), userid]
              );
            } else {
              console.log('ID exists');
              // console.log('compositions', compositions);

              return t.any(
                `UPDATE compositions SET name = $1, description = $2, 
                definition = $3 WHERE id = $4 AND userid = $5`,
                [
                  compositionname,
                  '',
                  JSON.stringify(req.body),
                  compositions[0].id,
                  userid,
                ]
              );
            }
          });
      })
      .then((data) => {
        res.statusCode = 200;
        return res.send('Composition Save: Save successful');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        res.statusCode = 500;
        return res.send(
          'Composition Save: Failure when saving the composition. Error:',
          error
        );
      });
  });
};
