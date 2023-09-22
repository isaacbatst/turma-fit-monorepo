import React from 'react'

type Props = {
  value: string
  placeholder: string
  inputName: string
  setValue: (value: string) => void
}

const InputCreate = ({setValue, value, placeholder, inputName}: Props) => {
  return (
    <input 
      className="bg-stone-950 font-semibold text-white px-5 py-3 rounded-lg flex-1 border border-stone-800" 
      type="text"
      name={inputName}
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder={placeholder}
    />
  )
}

export default InputCreate