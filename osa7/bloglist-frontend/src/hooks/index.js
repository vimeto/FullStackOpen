import { useState } from 'react'

export const useField = (type, placeholder) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClear = () => setValue('')

  return {
    toInput: {
      type,
      value,
      onChange,
      placeholder
    },
    onClear
  }
}