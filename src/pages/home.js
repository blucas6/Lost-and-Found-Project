import stevenslogo from '../images/StevensLogo.png'

export default function HomePage() {
    return (
        <div>
            <p>Welcome</p>
            <img src={stevenslogo} alt="logo" className='stevenslogo'/>
        </div>
    )
}