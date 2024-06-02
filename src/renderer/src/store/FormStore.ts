import { create } from 'zustand'

type FormStore = {
  id: number
  title: string
  date: Date
  setTitle: (title: string) => void
  setDate: (date: Date) => void
}
export const useFormStore = create<FormStore>((set) => ({
  id: 0,
  title: '',
  date: new Date(),
  setDate: (dateNum: Date): void => {
    set(() => ({ date: new Date(dateNum) }))
  },
  setTitle: (data: string): void => {
    set(() => ({ title: data }))
  }
}))
