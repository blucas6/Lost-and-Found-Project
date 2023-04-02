import './report.css'

export default function ReportPage(props) {
    if (props.authed) {
        return (
            <div>
                <h1>Report a Lost Item</h1>
                <form className="reportform">
                    <p>First Name</p>
                    <input />
                    <p>Last Name</p>
                    <input />
                    <p>Stevens E-mail</p>
                    <input />
                    <p>Object Lost</p>
                    <input />
                    <p>Object Description</p>
                    <textarea />
                    <p>Location Found</p>
                    <input />
                    <p>Date Found</p>
                    <input />
                    <p>Time Found</p>
                    <input />
                    <div>
                        <button>Submit</button>
                    </div>
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