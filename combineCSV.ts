import fs from 'fs/promises'
import { SpeechType } from './types'
import { parse } from 'csv-parse/sync'

export default async function combineCSV (totalDownloadedCSV: number): Promise<SpeechType[]> {
  let result:SpeechType[] = []
  for(let i = 0; i <= totalDownloadedCSV -1 ;i++) {
    const fileContent = await fs.readFile(`files/file${0}.csv`)    
    const records: SpeechType[] = await parse(fileContent, {
      columns: true,
      trim: true,
      cast: true,
      cast_date: true
    })
    result = [...result, ...records]
  }
  return result
}