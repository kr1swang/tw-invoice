import { useState } from 'react'

export default function useWinState() {
  const [winState, setWinState] = useState([])

  const addRecord = (({ number, isWinng }) => {
    setWinState([{ index: winState.length + 1, number, isWinng }, ...winState])
  })

  return [winState, addRecord]
}
