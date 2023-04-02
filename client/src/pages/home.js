import stevenslogo from '../images/StevensLogo.png'
import { signOut } from 'firebase/auth';
import { fb_auth } from '../firebase-config';
import { useState } from 'react';
import './home.css'

function generateTable(data, addtodiv, statusFilter) {
    console.log(data)
    const tbl = document.createElement('table')
    const tbl_head = document.createElement('thead')
    const tbl_body = document.createElement('tbody')
    const hrow = document.createElement('tr')
    const headers = []
    for (const skey in data[0]) {
        const hcell = document.createElement('td')
        const cellText = document.createTextNode(skey)
        hcell.appendChild(cellText)
        hrow.appendChild(hcell)
        headers.push(skey)
    }
    console.log(headers)
    tbl_head.appendChild(hrow)
    tbl.appendChild(tbl_head)
    for (const key in data) {
        if (statusFilter === "all" || data[key]["status"] === statusFilter) {
            const row = document.createElement('tr')
            for (let h in headers) {
                const cell = document.createElement('td')
                var cellText = document.createTextNode("")
                if (headers[h] === "datetime") {
                    var date = new Date(data[key][headers[h]].seconds)
                    cellText = document.createTextNode(date)
                } else {
                    cellText = document.createTextNode(data[key][headers[h]])
                }
                cell.appendChild(cellText)
                row.appendChild(cell)
            }
            tbl_body.appendChild(row)
        }
    }
    tbl.appendChild(tbl_body)
    addtodiv.appendChild(tbl)
}

export default function HomePage (props) {
    const [statusFilter, setStatusFilter] = useState("all");

    // Log out of Admin
    const logOut = async() => {
        await signOut(fb_auth)
    }
    //
    // Database
    if (props.authed && props.database && document.getElementById("view-requests")) {
        let table = document.getElementById("view-requests")
        table.innerHTML = ""
        generateTable(props.database, table, statusFilter)
    }
    //

    if (props.authed) {
        return (
            <div>
                <div className="login-desc">
                    <p>Logged in as: {props.authed?.email}</p>
                    <button onClick={logOut}>Sign Out</button>
                </div>
                <h1>View Requests</h1>
                <br></br>
                <div className='view'>
                    <div className='filter'>
                        <label htmlFor="statusFilter">Filter by Status:</label>
                        <select id="statusFilter" onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div id="view-requests"></div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Welcome to the Stevens Lost & Found Website!</h1>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <img src={stevenslogo} alt="logo" className='stevenslogo'/>
            </div>
        )
    }
}


                           
