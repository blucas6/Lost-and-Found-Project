import stevenslogo from '../images/StevensLogo.png'

export default function HomePage() {
    let state="admin"
    let itemslost = 10
    let openrequests = 2
    let closedrequests = 5
    if (state === "admin") {
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