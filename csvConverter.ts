import { CSVReturnType, MostSpeechesType, SpeechType } from './types'

export default async function parseCSV (fileContent: SpeechType[]): CSVReturnType{

  const mostSpeechesInYear = getMostSpeeches(fileContent, 2013)
  const mostTopicSpeeches = getMostTopicSpeeches(fileContent, 'Internal Security')
  const leastWordy = getLeastWordy(fileContent)
  
  return {
    mostSpeeches: mostSpeechesInYear,
    mostSecurity: mostTopicSpeeches,
    leastWordy
  }
}


const getMostSpeeches = (array: SpeechType[], year: number ): string | null => {
  const mostSpeeches = array.reduce((acc: MostSpeechesType, current) => {
    if(current.Date.getFullYear() === year) {
      acc[current.Speaker] = (acc[current.Speaker] || 0) + 1
    }
    return acc
  }, {})

  return Object.keys(mostSpeeches).length === 0 ? null : getMaxAmount(mostSpeeches) 
}

const getMostTopicSpeeches = (array: SpeechType[], speechTopic: string): string | null => {
  const mostTopicSpeeches = array.reduce((acc: MostSpeechesType, current) => {
    if(current.Topic === speechTopic) {
      acc[current.Speaker] = (acc[current.Speaker] || 0) + 1
    }
    return acc
  }, {})
  return Object.keys(mostTopicSpeeches).length === 0 ? null : getMaxAmount(mostTopicSpeeches) 
}

const getLeastWordy = (array: SpeechType[]): string | null => {
  const totalWords = array.reduce((acc: MostSpeechesType, current) => {
      acc[current.Speaker] = (acc[current.Speaker] || 0) + current.Words
    return acc
  }, {})
  return Object.keys(totalWords).length === 0 ? null : getLowestAmount(totalWords)
}

const getLowestAmount = (amounts: MostSpeechesType): string | null => {
  const maxAmount = Object.keys(amounts).reduce((a, b, index) => {
    if(amounts[a] === amounts[b] && index === Object.keys(amounts).length -1) return ''
    return amounts[a] < amounts[b] ? a : b
    }
  )
  return maxAmount === '' ? null : maxAmount
}

const getMaxAmount = (amounts: MostSpeechesType): string | null => {
  const maxAmount = Object.keys(amounts).reduce((a, b, index) => {
    if(amounts[a] === amounts[b] && index === Object.keys(amounts).length -1) return ''
    return amounts[a] > amounts[b] ? a : b
    }
  )
  return maxAmount === '' ? null : maxAmount
}