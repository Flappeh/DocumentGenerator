import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
interface FormDataDBProps {
  id: number
  title: string
  date: number
}
export default function History(): JSX.Element {
  const [forms, setForms] = useState<FormDataDBProps[]>([])
  useEffect(() => {
    const retrieveForms = async () => {
      return window.api.getAllForms()
    }
    const res = retrieveForms()
    res.then((x) => {
      console.log(x)
      setForms(x)
    })
  }, [])
  return (
    <div className="w-full h-[100vh] flex flex-col p-4 gap-4">
      <div className="text-3xl font-pextrabold text-primary">History Pengajuan</div>
      <table className="border border-black-100 bg-white">
        <thead>
          <tr className="border border-black-100">
            <td
              className="border border-black-100 font-psemibold text-2xl"
              width={'60%'}
              align="center"
            >
              Judul
            </td>
            <td className="border border-black-100 font-psemibold text-2xl" align="center">
              Tanggal
            </td>
            <td className="border border-black-100 font-psemibold text-2xl" align="center">
              Controls
            </td>
          </tr>
        </thead>
        <tbody>
          {forms.length > 0 ? (
            forms.map((x) => (
              <tr key={x.id} className={`${x.id % 2 !== 0 ? 'bg-gray-300' : ''}`}>
                <td className="border border-black-100 font-pmedium text-xl p-2">{x.title}</td>
                <td className="border border-black-100 font-pmedium text-xl p-2">
                  {new Date(x.date).toDateString()}
                </td>
                <td className="border border-gray-400 font-pmedium text-xl p-2 justify-around flex">
                  <Button variant="contained" color="warning">
                    <b>Edit</b>
                  </Button>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  )
}
