import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = JSON.parse(req.body)
  const date = new Date().toISOString()

  res.status(200).json({
    message: `Hello ${name}`,
    date,
  })
}
