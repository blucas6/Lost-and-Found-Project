import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { collection, addDoc } from 'firebase/firestore'
import { fb_db } from "../firebase-config"
import { useAlert } from 'react-alert'

export default function ReportPage(props) {
    // Alert
    const alert = useAlert()
    //
    // Database
    const createReport = async(e) => {
        e.preventDefault()
        let readytosubmit = true
        var checkfields = [fname, lname, email, objectTitle, objectDesc, location, dateFound]
        for (let f in checkfields) {
            if (checkfields[f].length === 0) {
                readytosubmit = false
            }
        }
        if (readytosubmit) {
            console.log(Date.now())
            try {
                await addDoc(collectionRef, {
                    firstname:      fname,
                    lastname:       lname,
                    email:          email,
                    object:         objectTitle,
                    description:    objectDesc,
                    locationFound:  location,
                    dateFound:      dateFound,
                    status:         "open",
                    submissionDate: Date.now(),
                    ownerFname:     "",
                    ownerLname:     "",
                    ownerEmail:     ""
                })
                window.location.reload(false)
            } catch (err) {
                console.log(err)
                alert.show("Failed to submit report!")
            }
        } else {
            alert.show("Please fill out all fields before submitting!")
        }
    }
    const collectionRef = collection(fb_db, "example")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setEmail] = useState("")
    const [objectTitle, setObjectTitle] = useState("")
    const [objectDesc, setObjectDesc] = useState("")
    const [location, setLocation] = useState("")
    const [dateFound, setDateFound] = useState(new Date())
    //

    if (props.authed) {
        return (
            <div>
                <h1>Report a Lost Item</h1>
                <form className="reportform">
                    <p>First Name</p>
                    <input type="text" onChange={(e) => {
                        setfname(e.target.value)
                    }} />
                    <p>Last Name</p>
                    <input type="text" onChange={(e) => {
                        setlname(e.target.value)
                    }} />
                    <p>Stevens E-mail</p>
                    <input type="text" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <p>Object Found</p>
                    <input type="text" onChange={(e) => {
                        setObjectTitle(e.target.value)
                    }} />
                    <p>Object Description</p>
                    <textarea onChange={(e) => {
                        setObjectDesc(e.target.value)
                    }}/>
                    <p>Location Found</p>
                    <input type="text" onChange={(e) => {
                        setLocation(e.target.value)
                    }} />
                    <p>Date Found</p>
                    <DatePicker
                        showTimeSelect
                        dateFormat="Pp"
                        selected={dateFound} 
                        onChange={(date) => setDateFound(date)
                    } />
                    <div>
                        <button onClick={createReport}>Submit</button>
                    </div>
                    <p id='error'></p>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <p>Not signed in!</p>
            </div>
        )
    }
}