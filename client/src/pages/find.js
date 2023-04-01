export default function FindPage(props) {
    if (props.authed) {
        return (
            <div>
                <h1>Search</h1>
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