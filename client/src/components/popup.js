import React from 'react'
import './popup.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { fb_db, fb_auth } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'


export default function Popup(props) {
    // Data base
    const table_collection_ref = collection(fb_db, "example")
    const getRecords = async () => {
        console.log("GET FROM DATABASE")
        const data = await getDocs(table_collection_ref);
        props.setDatabase(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    //
    // Authentication
    useEffect(() => {
        onAuthStateChanged(fb_auth, (currentUser) => {
            props.checkifAuth(currentUser)
            if (currentUser) {
                props.setTrigger(false)
                getRecords()        // fetch database
            } else {
                props.setTrigger(true)
            }
        })
    }, [])
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const logIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                fb_auth,
                loginEmail,
                loginPassword
            )
            console.log(user)
            props.setTrigger(false)
            getRecords()        // fetch database
        } catch (err) {
            console.log(err.message)
        }
    }
    //
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className='popup-header'>
                    <h2>Sign In</h2>
                </div>
                <p>Username:</p>
                <input 
                    onChange={(e) => {
                        setLoginEmail(e.target.value)
                    }}
                />
                <p>Password:</p>
                <input 
                    onChange={(e) => {
                        setloginPassword(e.target.value)
                    }}
                /><br></br>
                <button onClick={logIn}>Log in</button>
                { props.children }
            </div>
        </div>
    ) : ""
}