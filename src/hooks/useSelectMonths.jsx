import { useCallback, useEffect, useState } from 'react'

export default function useSelectMonths(defaultOptions) {
  const [options, setOptions] = useState(defaultOptions || [])
  const [value, setValue] = useState({})

  useEffect(() => {
    if (options.length > 0) {
      setValue(options[0])
    }
  }, [options])

  const onChange = useCallback((value) => {
    const object = options.find((item) => item.cTitle === value)
    setValue(object)
  })

  return [options, setOptions, value, onChange]
}
