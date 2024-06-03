/// <reference types="vite/client" />
interface PaperSizeProps {
  name: string
  mmWidth: number
  mmHeight: number
  pxWidth: number
  pxHeight: number
}
interface ItemDataProps {
  id: number
  itemName: string
  quantity: number
}

interface FormDataProps {
  id: number
  title: string
  date: number
  items: ItemDataProps[]
}
