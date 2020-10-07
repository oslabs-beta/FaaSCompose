import db from '../../../data/db';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface TFunc {
  id: string;
  name: string;
  description: string;
  definition: string;
}
type TFuncsData = Array<TFunc>;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  db.any(
    `select functions.* from functions inner join users on 
    functions.userid = users.id where users.name = $1`,
    session.user.name
  )
    .then((data: TFuncsData) => {
      console.log('DATA:', data); // print data;
      const functions = {};
      data.forEach((element) => {
        functions[element.id] = element;
      });
      res.statusCode = 200;
      res.send(functions);
    })
    .catch((error: any) => {
      console.log('ERROR:', error); // print the error;
    });
};
