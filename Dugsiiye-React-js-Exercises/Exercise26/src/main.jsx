import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routesPage'
import {AuthProvider} from './AuthContext'
import {PostsProvider} from './PostContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </AuthProvider>
  </StrictMode>,
)
