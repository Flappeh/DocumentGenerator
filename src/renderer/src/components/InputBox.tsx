import React, { useEffect, useState } from 'react'

interface InputBoxProps {
  title: string
  inputType: string
  required?: boolean
  value?: string
  id: number
}
import TextField from '@mui/material/TextField'
import { useItemStore } from '@renderer/store/ItemStore'
export default function InputBox({
  title,
  required,
  inputType,
  id,
  value
}: InputBoxProps): JSX.Element {
  const [currentValue, setCurrentValue] = useState('')
  const modifyItem = useItemStore().modifyItem
  useEffect(() => {}, [value])
  return (
    <>
      {required ? (
        <TextField
          id={title}
          label={title}
          required
          value={value}
          defaultValue={currentValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(event.target.value)
            inputType === 'text'
              ? modifyItem(id, event.target.value)
              : modifyItem(id, Number(event.target.value))
          }}
          type={inputType}
          color="primary"
          sx={{
            width: 200,
            '&:focus-within': {
              width: '100%'
            },
            transition: 'width 1s'
          }}
        />
      ) : (
        <TextField
          id={title}
          label={title}
          defaultValue={currentValue}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(event.target.value)
            inputType === 'text'
              ? modifyItem(id, event.target.value)
              : modifyItem(id, Number(event.target.value))
          }}
          color="primary"
          type={inputType}
          sx={{
            width: '100%'
          }}
        />
      )}
    </>
  )
}
