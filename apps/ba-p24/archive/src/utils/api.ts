import { NextApiResponse } from 'next';

const RespondToRequest = (
  res: NextApiResponse,
  code: number = 500,
  message: string = 'Something went wrong'
) => res.status(code).send(message);

const API_URL = `${process.env.NEXT_PUBLIC_URL}/api`;

export { RespondToRequest, API_URL };
