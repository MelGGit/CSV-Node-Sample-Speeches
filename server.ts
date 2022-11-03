import express, { Express, Request, Response } from 'express'
import fs from 'fs/promises'
import parseCSV from './csvConverter'
import downloadFile from './downloadFile'
import { SpeechType } from './types'
import { parse } from 'csv-parse/sync'
import downloadFiles from './downloadFiles'

const port = 8000

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
  res.send('Evaluate your CSV by going to /evaluation')
})
app.get('/evaluation', async (req: Request, res: Response) => {
  try {
    const urls = req.query.url as string[]
    console.log('test1')
    await downloadFiles(urls)
    console.log('test2')
    for(let i = 0; i <= urls.length -1 ;i++) {
      const fileContent2 = await fs.readFile(`files/file${0}.csv`)    
      const records: SpeechType[] = await parse(fileContent2, {
        columns: true,
        trim: true,
        cast: true,
        cast_date: true
      })
      console.log(records);
    }
  
    
    const fileContent = await fs.readFile('./test.csv')
    const test = await parseCSV(fileContent)
    res.send(test)
  } catch (error) {    
    res.status(400).send({error: "No URL in params"})
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})