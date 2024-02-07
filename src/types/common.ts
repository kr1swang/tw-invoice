export type Receipt = {
  period: string
  special: string
  grand: string
  first: string[]
  additionalSixth: string[]
}

export type Prize = {
  prize: string
  name: string
  rule: string
  mappingKey: string | undefined
}

export type History = {
  id: string
  period: string
  isWinning: boolean
  number: string
  date: Date
}
