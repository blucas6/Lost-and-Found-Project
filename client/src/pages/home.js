import stevenslogo from '../images/StevensLogo.png'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
    const data = useLocation()
    console.log(data)
    let creds="student"
    let itemslost = 10
    let openrequests = 2
    let closedrequests = 5
    if (creds === "admin") {
        return (
            <div>
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
                <img src={stevenslogo} alt="logo" className='stevenslogo'/>
            </div>
        )
    }
}

export default HomePage