import express, { Express, Request, Response } from 'express'
import parseCSV from './csvConverter'
import { SpeechType } from './types'
import downloadFiles from './downloadFiles'
import combineCSV from './combineCSV'

const port = 8000

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
  res.send('Evaluate your CSV by going to /evaluation')
})

app.get('/evaluation', async (req: Request, res: Response) => {
  try {
    const urls = req.query.url as string[]
    await downloadFiles(urls)
    const combinedCSV: SpeechType[] = await combineCSV(urls.length)
    const result = await parseCSV(combinedCSV)
    res.send(result)
  } catch (error) {    
    res.status(400).send({error: "No URL in params"})
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log(`Test the CSV server, if local fileserver is running http://localhost:${port}/evaluation?url=http://localhost:9000/test&url=http://localhost:9000/test2`);
})