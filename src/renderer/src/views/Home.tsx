import React from 'react'

export default function Home(): JSX.Element {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-4">
      <div className="text-6xl font-pextrabold text-primary">Form Request Manager</div>
      <div className="text-xl font-pbold text-stone-700">
        Friendly document manager for your business!
      </div>
    </div>
  )
}
