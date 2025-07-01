import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Resume from './page/Resume'
import { ToastContainer } from 'react-toastify'
import ResumeFormat from './page/ResumeFormat'

function App() {
  console.log({owner:"Azimuddeen Khan",portfolio:"https://everazim.vercel.app/",contact:'7678084267'})
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/resume' element={<Resume/>} />
        <Route path='/resume-format' element={<ResumeFormat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
