import { Paper } from '@mui/material'
import { useItemStore } from '@renderer/store/ItemStore'
import { useFormStore } from '@renderer/store/FormStore'
import { useShallow } from 'zustand/react/shallow'
interface PaperTemplateProps {
  size: PaperSizeProps
  isPreview: boolean
}
export default function PaperTemplate({ size, isPreview }: PaperTemplateProps): JSX.Element {
  const { items } = useItemStore(useShallow((state) => ({ items: state.items })))
  const { title, date } = useFormStore(
    useShallow((state) => ({ title: state.title, date: state.date }))
  )
  return isPreview ? (
    <div
      className="bg-white flex flex-col h-[70vh] w-auto p-4"
      style={{
        aspectRatio: size.pxWidth / size.pxHeight
      }}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-lg font-bold">{title}</h1>
        <h3 className="text-xs">{date.toDateString()}</h3>
      </div>
      <hr style={{ background: '#000', height: '2px' }} />
      <div className="flex flex-col mt-5">
        <h3 className="font-pmedium">Data barang</h3>
        <table style={{ border: '1px solid ', width: '100%' }}>
          <thead>
            <tr style={{ border: '1px solid ' }}>
              <th style={{ border: '1px solid ', width: '70%', fontSize: '.8rem' }}>
                <b>Item Name</b>
              </th>
              <th style={{ border: '1px solid ', fontSize: '.8rem' }}>
                <b>Quantity</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) =>
              x.itemName && x.quantity > 0 ? (
                <tr style={{ border: '1px solid ' }} key={x.id}>
                  <td style={{ border: '1px solid ' }}>{x.itemName}</td>
                  <td align="center">{x.quantity}</td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div
      style={{
        aspectRatio: size.pxWidth / size.pxHeight,
        height: `${size.pxHeight}px`,
        width: `${size.pxWidth}px`,
        background: '#FFF',
        padding: '1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700' }}>{title}</h1>
        <h3 style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '400' }}>
          {date.toDateString()}
        </h3>
      </div>
      <hr style={{ background: '#000', height: '2px' }} />
      <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontWeight: '600', fontSize: '1.5rem' }}>Data barang : </h3>
        <table style={{ border: '1px solid ', width: '100%' }}>
          <thead>
            <tr style={{ border: '1px solid ' }}>
              <th style={{ border: '1px solid ', width: '80%' }}>
                <b>Item Name</b>
              </th>
              <th>
                <b>Quantity</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) =>
              x.itemName && x.quantity > 0 ? (
                <tr style={{ border: '1px solid ' }} key={x.id}>
                  <td style={{ border: '1px solid ' }}>{x.itemName}</td>
                  <td align="center">{x.quantity}</td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
