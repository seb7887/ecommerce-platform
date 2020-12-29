import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

const validTemplates = ['products']

const downloadXlsx = (template: string | string[], res: NextApiResponse) => {
  const filePath = path.resolve('./assets', `xlsx/${template}.xlsx`)
  res.setHeader('Content-disposition', `attachment; filename=${template}.xlsx`)
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )

  const filestream = fs.createReadStream(filePath)
  filestream.pipe(res)
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { template } = req.query

  if (
    !template ||
    typeof template !== 'string' ||
    !validTemplates.includes(template)
  ) {
    res.status(400).json({ error: 'Template param must be specified.' })
  }

  return downloadXlsx(template, res)
}
