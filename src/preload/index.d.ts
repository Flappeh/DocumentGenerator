import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}

interface ItemDataProps {
  id: number
  itemName: string
  quantity: number
}
