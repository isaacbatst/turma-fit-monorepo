import { Input } from 'antd'
import React from 'react'

type Props = {
  value: string
  placeholder: string
  inputName: string
  setValue: (value: string) => void
}

const InputCreate = ({setValue, value, placeholder, inputName}: Props) => {
  return (
    <Input 
      type="text"
      size='large'
      name={inputName}
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder={placeholder}
    />
  )
}

export default InputCreate