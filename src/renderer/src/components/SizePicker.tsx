import React, { useState } from 'react'
import paperSize from '../constants/paperSize'

interface SizePickerProps {
  sendData: any
}

export default function SizePicker({ sendData }: SizePickerProps): JSX.Element {
  const sizeList: PaperSizeProps[] = paperSize
  const [currentSize, setCurrentSize] = useState<PaperSizeProps>({
    name: '',
    width: 0,
    height: 0
  })
  const sendStats = (name: string): void => {
    try {
      const size = sizeList.find((x) => x.name == name)
      if (size != undefined) {
        setCurrentSize(size)
        sendData(size)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <select
      value={currentSize.name}
      onChange={(e) => sendStats(e.target.value)}
      className="font-pmedium p-3 text-lg rounded-lg border border-black-100"
    >
      {sizeList.map((x) => (
        <option value={x.name} key={x.name}>
          {x.name}
        </option>
      ))}
    </select>
  )
}
