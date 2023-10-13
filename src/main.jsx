import React from 'react'
import ReactDOM from 'react-dom/client'
import Blog from './Blog.jsx'
import './index.css'
import Router from './router.jsx'
import { Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>Maximum Living Blog</h1>
    <Router />
  </React.StrictMode>,
)
