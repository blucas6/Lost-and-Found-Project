import stevenslogo from '../images/StevensLogo.png'
import { signOut } from 'firebase/auth'
import { fb_auth, fb_db } from '../firebase-config'
import { useState } from 'react'
import { addDoc, doc, updateDoc } from 'firebase/firestore'
import './home.css'
import { useEffect } from 'react'
import UpdateForm from '../components/updateForm'


export default function HomePage (props) {
    // Update Report Form
    const [FormData, setFormData] = useState({})
    const [isOpen, setisOpen] = useState(false)
    const date_header_name = "dateFound"
    const date_header_name2 = "submissionDate"
    
    const updateReport = async(report, headers) => {
        var report_obj = {id: report.id}
        for (let h in headers) {
            var val = ""
            if (headers[h] !== "") {
                if (headers[h] === date_header_name || headers[h] === date_header_name2) {
                    val = new Date(1000*report[headers[h]].seconds)
                } else {
                    val = report[headers[h]]
                }
                report_obj[headers[h]] = val
            }
        }
        console.log(report_obj)
        setFormData(report_obj)
        setisOpen(true)
        // await updateDoc(reportDoc, newFields) 
    }
    /////////////////////
    
    // Generate Dynamic Table
    function generateTable(data, addtodiv, autoHeaders, statusFilter) {
        console.log(data)
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
            headers = ["", "status", "firstname", "lastname", "email", "object", "description", "locationFound", "dateFound", "submissionDate", "ownerFname", "ownerLname", "ownerEmail"]
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
            if (statusFilter === "all" || data[key]["status"] === statusFilter) {
                const row = document.createElement('tr')
                const editButton = document.createElement('button')
                const buttonText = document.createTextNode("Edit")
                editButton.addEventListener("click", function(e) {
                    updateReport(data[key], headers)
                }, false)
                editButton.appendChild(buttonText)
                const cell = document.createElement('td')
                cell.appendChild(editButton)
                row.appendChild(cell)
                for (let h in headers) {
                    if (headers[h] !== "") {
                        const cell = document.createElement('td')
                        var cellText = document.createTextNode("")
                        if (headers[h] === date_header_name) {
                            var date = new Date(1000*data[key][headers[h]].seconds)
                            cellText = document.createTextNode(date)
                        } else if(headers[h] === date_header_name2) {
                            var date = new Date(data[key][headers[h]])
                            cellText = document.createTextNode(date)
                        } else {
                            cellText = document.createTextNode(data[key][headers[h]])
                        }
                        cell.appendChild(cellText)
                        row.appendChild(cell)
                    }
                }
                tbl_body.appendChild(row)
            }
        }
        tbl.appendChild(tbl_body)
        addtodiv.appendChild(tbl)
    }
    /////////////////////////

    // Filter Status
    const [statusFilter, setStatusFilter] = useState("all");
    //
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
            generateTable(props.database, table, false, statusFilter)
        }
    })
    //

    if (props.authed) {
        return (
            <div>
                <UpdateForm open={isOpen} onClose={() => setisOpen(false)}>
                    {FormData}
                </UpdateForm>
                <div className="login-desc">
                    <p>Logged in as: {props.authed?.email}</p>
                    <button onClick={logOut}>Sign Out</button>
                </div>
                <h1>View Reports</h1>
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


                           
