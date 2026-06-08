import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <div className="app-frame">
        <Sidebar />
        <main id="main-content" className="app-main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AppShell
