import express, { Express, Request, Response } from 'express'

const port = 9000

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
  res.send('This is the file server')
})
app.get('/test', async (req: Request, res: Response) => {
  res.download('./test.csv')
})
app.get('/test2', async (req: Request, res: Response) => {
  res.download('./test2.csv')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})