const path = require('path');
const fs = require('fs');
import db from '../../../../data/db';
import { getSession } from 'next-auth/client';

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
  // const agnosticfilePath = path.join(
  //   compositionsDirectory,
  //   `${compositionname}-agnostic.json`
  // );

  const session = await getSession({ req });
  // let id = ;
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

  // fs.writeFile(agnosticfilePath, JSON.stringify(req.body), (err) => {
  //   if (err) {
  //     console.log('Composition Save: ', err);
  //     res.statusCode = 500;
  //     return res.send('Composition Save: Failure when saving the composition');
  //   }
  //   console.log('Composition Save: Save successful');
  //   res.statusCode = 200;
  //   return res.send('');
  // });
};
