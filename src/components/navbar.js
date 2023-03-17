import React from "react";

function NavBar() {

    function handleNavigation(n) {
        console.log(n)
    }
 
    return (
        <nav>
            <label className="logo">Stevens Lost & Found Tool</label>
            <ul>
              <li><button className="navb" onClick={() => handleNavigation('home')}>Home</button></li>
              <li><button className="navb" onClick={() => handleNavigation('report')}>Report Lost Item</button></li>
              <li><button className="navb" onClick={() => handleNavigation('find')}>Find an Item</button></li>
              <li><button className="navb" onClick={() => handleNavigation('about')}>About</button></li>
            </ul>
        </nav>
    )
}

export default NavBar