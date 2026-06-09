import { useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/categories'

function MobileNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const selected = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`

  return (
    <label className="mobile-nav">
      <span className="visually-hidden">Navigate to section</span>
      <select
        value={selected}
        aria-label="Navigate to section"
        onChange={(event) => {
          navigate(event.target.value)
        }}
      >
        <option value="/">Dashboard</option>
        <option value="/css">All CSS</option>
        {categories.map((category) => (
          <option key={category.id} value={category.route}>
            {category.title}
          </option>
        ))}
      </select>
    </label>
  )
}

export default MobileNav
