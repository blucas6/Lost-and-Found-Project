import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="nav">
            <label className="sitename">Stevens Lost & Found Tool</label>
            <ul>
              <li><Link className="navb" to="/">Home</Link></li>
              <li><Link className="navb" to="/report">Report Lost Item</Link></li>
              <li><Link className="navb" to="/find">Find An Item</Link></li>
              <li><Link className="navb" to="/about">About</Link></li>
            </ul>
        </nav>
    )
}