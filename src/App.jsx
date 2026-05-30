import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App(){
  const [theme, setTheme] = useState('dark')

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
    localStorage.setItem('ss-theme', theme)
  },[theme])

  useEffect(()=>{
    const stored = localStorage.getItem('ss-theme')
    if(stored) setTheme(stored)
  },[])

  return (
    <AuthProvider>
      <div className="app-root">
        <NavBar theme={theme} setTheme={setTheme} />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer theme={theme} position="top-right" autoClose={3000} />
      </div>
    </AuthProvider>
  )
}
