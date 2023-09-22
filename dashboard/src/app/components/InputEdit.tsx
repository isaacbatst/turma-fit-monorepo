import React, { useEffect } from 'react'

type Props = {
  value: string
  inputName: string
  setValue: (value: string) => void
  cancelEdit: () => void
}

const InputEdit = ({inputName, value, setValue, cancelEdit }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)


  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isInputFocused = document.activeElement === inputRef.current
      const isEscPressed = e.key === 'Escape'
      if(isInputFocused && isEscPressed) {
        cancelEdit()
      }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [cancelEdit])


  return (
    <input className='rounded-lg px-3 py-2 flex-1 bg-white text-gray-900' 
      ref={inputRef} autoFocus={true}  
      type="text" name={inputName}
      value={value}
      onChange={(e) => setValue(e.target.value)} 
    />
  )
}

export default InputEdit