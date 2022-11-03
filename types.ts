export type SpeechType = {
  Speaker: string,
  Topic: string,
  Date: Date,
  Words: number
}

export type MostSpeechesType = {
  [key: string]: number
}

export type CSVReturnType = Promise<{
  mostSpeeches: string | null;
  mostSecurity: string | null;
  leastWordy: string | null;
}>