import { useCallback, useState } from 'react'

export default function useInputNumber(defaultValue) {
  const [value, setValue] = useState(defaultValue || '')

  const onChange = useCallback((event) => {
    const input = event.target.value
    setValue(input.replace(/\D/g, ''))
  })

  return [value, onChange, setValue]
}
