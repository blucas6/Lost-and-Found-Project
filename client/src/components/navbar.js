import { NavLink, Outlet } from "react-router-dom";
import './navbar.css'

export default function Navbar(props) {
    return (
        <div>
        <nav className="nav">
        <label className="sitename">Stevens Lost & Found Tool</label>
        <ul>
          <li><NavLink className="navb" to="/">Home</NavLink></li>
          <li><NavLink className="navb" to="/report">Report Lost Item</NavLink></li>
          <li><NavLink className="navb" to="/find">Find An Item</NavLink></li>
          <li><NavLink className="navb" to="/about">About</NavLink></li>
        </ul>
        </nav>
        <div className="container">
            <Outlet />
        </div>
        </div>
    )
}