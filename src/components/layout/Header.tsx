import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'

type ThemeChoice = 'system' | 'light' | 'dark'

const themeChoices: ThemeChoice[] = ['system', 'light', 'dark']

function applyTheme(theme: ThemeChoice) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.dataset.theme = theme
  }
}

function Header() {
  const [theme, setTheme] = useState<ThemeChoice>(() => {
    const stored = localStorage.getItem('modern-css-lab-theme')
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('modern-css-lab-theme', theme)
  }, [theme])

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link to="/" className="brand-mark" aria-label="Modern CSS Lab home">
          <span className="brand-mark__glyph" aria-hidden="true">
            CSS
          </span>
          <span>
            <strong>Modern CSS Lab</strong>
            <small>React + vanilla CSS playground</small>
          </span>
        </Link>
      </div>
      <MobileNav />
      <div className="theme-switcher" role="group" aria-label="Color theme">
        {themeChoices.map((choice) => (
          <button
            key={choice}
            type="button"
            className="theme-switcher__button"
            aria-pressed={theme === choice}
            onClick={() => setTheme(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Header
