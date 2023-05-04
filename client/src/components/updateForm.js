import React from 'react'
import './updateForm.css'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { collection, addDoc, updateDoc, doc} from 'firebase/firestore'
import { fb_db } from "../firebase-config"

export default function UpdateForm({open, children, onClose}) {
    console.log(children)
    const [dataObject, setDataObject] = useState({})

    console.log(dataObject)

    const UpdateDB = async () => {
        const fb_doc = doc(fb_db, "example", children.id)
        var dataToSend = {}
        for (let h in children) {
            if (h in dataObject) {
                dataToSend[h] = dataObject[h]
            } else {
                dataToSend[h] = children[h]
            }
        }

        console.log(dataToSend)
        await updateDoc(fb_doc , dataToSend)
        onClose()
    }

    if (!open) return null
    return (
        <>
            <div className='overlay'></div>
            <div className="updateForm">
                <div className='close-btn'>
                    <button onClick={onClose}>&times;</button>
                </div>
                <h1>Edit</h1>
                <div className='form-space'>
                    <form>
                        <p>Status of Request</p>
                        <input type="text" defaultValue={children.status} onChange={(e) => {
                            setDataObject({...dataObject, status: e.target.value})
                        }} />
                        <p>First Name</p>
                        <input type="text" defaultValue={children.firstname} onChange={(e) => {
                            setDataObject({...dataObject, firstname: e.target.value})
                        }} />
                        <p>Last Name</p>
                        <input type="text" defaultValue={children.lastname} onChange={(e) => {
                            setDataObject({...dataObject, lastname: e.target.value})
                        }} />
                        <p>Stevens E-mail</p>
                        <input type="text" defaultValue={children.email} onChange={(e) => {
                            setDataObject({...dataObject, email: e.target.value})
                        }} />
                        <p>Object Found</p>
                        <input type="text" defaultValue={children.object} onChange={(e) => {
                            setDataObject({...dataObject, object: e.target.value})
                        }} />
                        <p>Object Description</p>
                        <textarea defaultValue={children.description} onChange={(e) => {
                            setDataObject({...dataObject, description: e.target.value})
                        }}/>
                        <p>Location Found</p>
                        <input type="text" defaultValue={children.locationFound} onChange={(e) => {
                            setDataObject({...dataObject, locationFound: e.target.value})
                        }} />
                        <p>Date Found</p>
                        <DatePicker
                            showTimeSelect
                            dateFormat="Pp"
                            defaultValue={Date(children.dateFound)}
                            selected={dataObject.dateFound} 
                            onChange={(e) => setDataObject({...dataObject, dateFound: e.target.value})
                        } />
                        <p>Owner First Name</p>
                        <input type="text" defaultValue={children.ownerFname} onChange={(e) => {
                            setDataObject({...dataObject, ownerFname: e.target.value})
                        }} />
                        <p>Owner Last Name</p>
                        <input type="text" defaultValue={children.ownerLname} onChange={(e) => {
                            setDataObject({...dataObject, ownerLname: e.target.value})
                        }} />
                        <p>Owner Email</p>
                        <input type="text" defaultValue={children.ownerEmail} onChange={(e) => {
                            setDataObject({...dataObject, ownerEmail: e.target.value})
                        }} />
                    </form>
                </div>
                <div className='footer'>
                    <button className='submit-btn' onClick={UpdateDB}>Submit</button>
                </div>
            </div>
        </>
    )
}

