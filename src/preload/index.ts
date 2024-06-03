import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
interface ItemDataProps {
  id: number
  itemName: string
  quantity: number
}

const api = {
  saveToPdf: async (path: string, html: string) =>
    ipcRenderer.invoke('pdf-save', { filepath: path, html: html }),
  showSaveDialog: () => ipcRenderer.invoke('showSaveDialog'),
  saveToDB: async (title: string, date: Date, items: ItemDataProps) => {
    ipcRenderer.invoke('save-db', { title: title, date: date, items: items })
  },
  getAllForms: async () => ipcRenderer.invoke('getAllForms')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
