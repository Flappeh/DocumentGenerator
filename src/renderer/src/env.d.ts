/// <reference types="vite/client" />
interface PaperSizeProps {
  name: string
  width: number
  height: number
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
