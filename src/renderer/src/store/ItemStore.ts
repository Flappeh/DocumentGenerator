import { create } from 'zustand'

type ItemStore = {
  items: ItemDataProps[]
  addItem: (item: ItemDataProps) => void
  removeItem: (id: number) => void
  modifyItem: (id: number, data: string | number) => void
  resetItems: () => void
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [
    {
      id: 1,
      itemName: '',
      quantity: 0
    }
  ],
  addItem: (): void => {
    set((state) => ({
      items: [
        ...state.items,
        {
          id: state.items.length + 1,
          itemName: '',
          quantity: 0
        }
      ]
    }))
  },
  removeItem: (id: number): void => {
    set((state) => ({ items: state.items.filter((x) => x.id !== id) }))
  },
  modifyItem: (id: number, data: string | number): void => {
    set((state) => ({
      items: state.items.map((x) => {
        if (x.id === id && typeof data === 'string') {
          return { ...x, itemName: data }
        } else if (x.id === id && typeof data === 'number') {
          return { ...x, quantity: data }
        } else {
          return x
        }
      })
    }))
  },
  resetItems: (): void => {
    set({
      items: [
        {
          id: 1,
          itemName: '',
          quantity: 0
        }
      ]
    })
  }
}))
