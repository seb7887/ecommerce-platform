import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { template } = req.query

  if (!template) {
    res.status(400).json({ error: 'Template param must be specified.' })
  }

  res.setHeader('Content-disposition', `attachment; filename=${template}.xlsx`)

  res.status(200).json({ health: 'ok' })
}
