import React from 'react'
import './popup.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { fb_db, fb_auth } from '../firebase-config'


export default function Popup(props) {
    // Authentication
    useEffect(() => {
        onAuthStateChanged(fb_auth, (currentUser) => {
            props.checkifAuth(currentUser)
            if (currentUser) {
                props.setTrigger(false)
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
        } catch (err) {
            console.log(err.message)
        }
    }
    //
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className='popup-header'>
                    <h2>Sign in to continue</h2>
                    <button className="close-btn" onClick={()=> props.setTrigger(false)}>&times;</button>
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