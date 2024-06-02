import { Paper } from '@mui/material'
import { useItemStore } from '@renderer/store/ItemStore'
import { useFormStore } from '@renderer/store/FormStore'
import { useShallow } from 'zustand/react/shallow'
interface PaperTemplateProps {
  size: PaperSizeProps
}
export default function PaperTemplate({ size }: PaperTemplateProps): JSX.Element {
  const { items } = useItemStore(useShallow((state) => ({ items: state.items })))
  const { title, date } = useFormStore(
    useShallow((state) => ({ title: state.title, date: state.date }))
  )
  return (
    <div
      className="bg-white h-full w-full flex flex-1 flex-col p-4"
      style={{ aspectRatio: size.width / size.height }}
      id="dokumen"
    >
      <div className="flex flex-row justify-between">
        <h1 className="font-pbold text-center">{title}</h1>
        <h3>{date.toDateString()}</h3>
      </div>
      <hr />
      <div className="flex flex-col mt-5">
        <h3 className="font-pmedium">Data barang</h3>
        <ol>
          {items.map((x) =>
            x.itemName && x.quantity > 0 ? (
              <li key={x.id}>
                <span>{`${x.itemName}   x ${x.quantity}`}</span>
              </li>
            ) : (
              <></>
            )
          )}
        </ol>
      </div>
    </div>
  )
}
