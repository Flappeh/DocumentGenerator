import { useState } from 'react'
import SizePicker from '@renderer/components/SizePicker'
import PaperTemplate from '@renderer/components/PaperTemplate'
import InputForm from '@renderer/components/InputForm'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useFormStore } from '@renderer/store/FormStore'
import { useItemStore } from '@renderer/store/ItemStore'
import { jsPDF } from 'jspdf'
export default function FormField(): JSX.Element {
  const sendData = (size: PaperSizeProps): void => {
    setCurrentSize(size)
    console.log(currentSize)
  }

  const { setDate, setTitle, title, date } = useFormStore()
  const { resetItems, items } = useItemStore()
  const resetAll = () => {
    resetItems()
    setTitle('')
    setDate(new Date())
  }
  const [currentSize, setCurrentSize] = useState<PaperSizeProps>({
    name: 'A4',
    mmWidth: 210,
    mmHeight: 297,
    pxWidth: 794,
    pxHeight: 1123
  })
  const saveFile = async (): void => {
    try {
      const paper = document.getElementById('documentContent')
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: currentSize.name,
        hotfixes: ['px_scaling']
      })
      await doc.html(paper!.innerHTML, {
        x: 0,
        y: 0,
        jsPDF: doc,
        callback: async (pdf) => {
          await pdf.save(`${title}.pdf`)
          await window.api.saveToDB(title, date.getTime(), items)
          resetAll()
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="w-full h-[100vh] flex flex-row items-center p-5 gap-4">
      <section className="h-full flex-1 flex-col flex min-w-[40%] border-r border-black-100">
        <div className="h-full overflow-auto">
          <div className="flex-row flex gap-12 mb-5 ">
            <div className="text-4xl font-pbold text-primary">Data Form</div>
            <SizePicker sendData={sendData} />
            <Button
              title="Reset"
              variant="contained"
              color="error"
              onClick={resetAll}
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em'
              }}
            >
              Reset
            </Button>
            <Button
              title="Send"
              variant="contained"
              color="success"
              onClick={saveFile}
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em'
              }}
            >
              Send Data
              <SendIcon />
            </Button>
          </div>
          <InputForm></InputForm>
        </div>
      </section>
      <section>
        <PaperTemplate size={currentSize} isPreview />
      </section>
      <section id="documentContent" style={{ display: 'none' }}>
        <PaperTemplate size={currentSize} isPreview={false} />
      </section>
    </div>
  )
}
