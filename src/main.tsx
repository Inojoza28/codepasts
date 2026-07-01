import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles.css'

const THEME_STORAGE_KEY = 'devfolder_theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const theme = getInitialTheme()

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.style.colorScheme = theme
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

const root = createRoot(rootEl)
const router = getRouter()

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
