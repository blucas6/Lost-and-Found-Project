import stevenslogo from '../images/StevensLogo.png'
import { useState } from "react";
import { fb_db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { fb_auth } from '../firebase-config';

export default function HomePage (props) {
    // Data base
    const [table, setTableState] = useState()
    const table_collection_ref = collection(fb_db, "example")
    const getRecords = async () => {
        const data = await getDocs(table_collection_ref);
        setTableState(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    //

    // Log out of Admin
    const logOut = async() => {
        await signOut(fb_auth)
    }
    //

    let itemslost = 10
    let openrequests = 2
    let closedrequests = 5

    if (props.authed) {
        return (
            <div>
                <div className="login-desc">
                    <p>Logged in as: {props.authed?.email}</p>
                    <button onClick={logOut}>Sign Out</button>
                </div>
                <h1>Analytics</h1>
                <br></br>
                <div className='fastfacts'>
                    <ul>
                    <li>Items in Lost & Found: {itemslost} </li>
                    <li>Open requests: {openrequests}</li>
                    <li>Closed requests: {closedrequests}</li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h4>Welcome to the Stevens Lost & Found Website!</h4>
                <img src={stevenslogo} alt="logo" className='stevenslogo'/>
            </div>
        )
    }
}