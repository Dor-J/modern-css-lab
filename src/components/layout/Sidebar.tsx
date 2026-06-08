import { NavLink } from 'react-router-dom'
import { categories } from '../../data/categories'

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <nav className="sidebar__nav">
        <NavLink to="/" end className="sidebar__link">
          Dashboard
        </NavLink>
        <NavLink to="/css" className="sidebar__link">
          <span className="sidebar__dot sidebar__dot--css" aria-hidden="true" />
          All CSS
        </NavLink>
        {categories.map((category) => (
          <NavLink key={category.id} to={category.route} className="sidebar__link">
            <span className={`sidebar__dot sidebar__dot--${category.accent}`} aria-hidden="true" />
            {category.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
