import stevenslogo from '../images/StevensLogo.png'
import { signOut } from 'firebase/auth';
import { fb_auth } from '../firebase-config';
import './home.css'
import { useEffect } from 'react';

function generateTable(data, addtodiv, autoHeaders) {
    console.log(data)
    const date_header_name = "dateFound"
    const date_header_name2 = "submissionDate"
    const tbl = document.createElement('table')
    const tbl_head = document.createElement('thead')
    const tbl_body = document.createElement('tbody')
    const hrow = document.createElement('tr')
    var headers = []
    if (autoHeaders) {
        for (const skey in data[0]) {
            headers.push(skey)
        }
    } else {
        headers = ["status", "firstname", "lastname", "email", "object", "description", "locationFound", "dateFound", "submissionDate", "ownerFname", "ownerLname", "ownerEmail"]
    }
    for (let head in headers) {
        const hcell = document.createElement('td')
        const cellText = document.createTextNode(headers[head])
        hcell.appendChild(cellText)
        hrow.appendChild(hcell)
    }
    tbl_head.appendChild(hrow)
    tbl.appendChild(tbl_head)
    for (const key in data) {
        const row = document.createElement('tr')
        for (let h in headers) {
            const cell = document.createElement('td')
            var cellText = document.createTextNode("")
            if (headers[h] === date_header_name || headers[h] === date_header_name2) {
                if (headers[h] === date_header_name) {
                    var date = new Date(1000*(data[key][headers[h]].seconds))
                } else {
                    var date = new Date(1000*(data[key][headers[h]]))
                }
                cellText = document.createTextNode(date)
                console.log(date)
            } else {
                cellText = document.createTextNode(data[key][headers[h]])
            }
            cell.appendChild(cellText)
            row.appendChild(cell)
        }
        tbl_body.appendChild(row)
    }
    tbl.appendChild(tbl_body)
    addtodiv.appendChild(tbl)
}

export default function HomePage (props) {
    // Log out of Admin
    const logOut = async() => {
        await signOut(fb_auth)
    }
    //
    // Database
    useEffect(() => {   //on load
        // console.log(`Authed: ${props.authed} Database: ${props.database} Element: ${document.getElementById("view-requests")}`)
        if (props.authed && props.database && document.getElementById("view-requests")) {
            let table = document.getElementById("view-requests")
            table.innerHTML = ""
            generateTable(props.database, table, false)
        }
    })
    //

    if (props.authed) {
        return (
            <div>
                <div className="login-desc">
                    <p>Logged in as: {props.authed?.email}</p>
                    <button onClick={logOut}>Sign Out</button>
                </div>
                <h1>View Reports</h1>
                <br></br>
                <div className='view'>
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