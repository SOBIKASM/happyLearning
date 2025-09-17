import { NavLink } from "react-router-dom"
import './Header.css'
import { useState } from "react"

const Header = () => {

  const [isopen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }
  const getClassName = (args) => {
    const { isActive } = args
    return isActive ? "nav-item active" : "nav-item"
  }

  return (
    <>
      <div className="header-container">
        <img src="/logo2.png" alt="app-logo" className="logo" /> 
        <nav className="window-nav">
          <NavLink className={getClassName} to='/'>Home</NavLink>
          <NavLink className={getClassName} to='/country'>Countries</NavLink>
          <NavLink className={getClassName} to='/elements'>Periodic Table</NavLink>
          <NavLink className={getClassName} to='/galaxy'>Galaxies</NavLink>
          <NavLink className={getClassName} to='/constellations'>Constellations</NavLink>
          <NavLink className={getClassName} to='/wonders'>World Wonders</NavLink>
        </nav>
        <div className="mobile-nav">
          <button className="hamburgar-menu" onClick={toggleMenu}>{isopen ? "✖" : "☰"} </button>
          {isopen ? <nav className={`mobile-menu ${isopen?"open":""}`}>
            <NavLink className={getClassName} onClick={toggleMenu} to='/'>Home</NavLink>
            <NavLink className={getClassName} onClick={toggleMenu} to='/country'>Countries</NavLink>
            <NavLink className={getClassName} onClick={toggleMenu} to='/elements'>Periodic Table</NavLink>
            <NavLink className={getClassName} onClick={toggleMenu} to='/galaxy'>Galaxies</NavLink>
            <NavLink className={getClassName} onClick={toggleMenu} to='/constellations'>Constellations</NavLink>
            <NavLink className={getClassName} onClick={toggleMenu} to='/wonders'>World Wonders</NavLink>
          </nav> : null}
        </div>
      </div>
    </>

  )
}
export default Header
// &#10006; for cross instead of hamburgar