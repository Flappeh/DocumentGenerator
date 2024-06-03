import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './views/Home'

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import FormField from './views/FormField'
import History from './views/History'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
)

function App(): JSX.Element {
  return (
    <Router>
      <div id="app">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Home />} key={'home'} />
          <Route path="/formfield" element={<FormField />} key={'formfield'} />
          <Route path="/history" element={<History />} key={'history'} />
        </Routes>
      </div>
    </Router>
  )
}
