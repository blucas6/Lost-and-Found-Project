import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home";
import ReportPage from "./pages/report";
import FindPage from "./pages/find";
import AboutPage from "./pages/about";
import { useState, useEffect } from "react";
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from "react-router-dom"

function App() {

  const [table, setTableState] = useState()
  const table_collection_ref = collection(db, "example")
  useEffect(() => {
    const getRecords = async () => {
      const data = await getDocs(table_collection_ref);
      setTableState(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    getRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("From app")
  console.log(table)
  return (
    <div className="App">
      <header className="App-header">
      <nav className="nav">
        <label className="sitename">Stevens Lost & Found Tool</label>
        <ul>
          <li><Link className="navb" 
                to="/"
                state={{
                  id: "anything"
                }}
              >Home</Link></li>
          <li><Link className="navb" to="/report">Report Lost Item</Link></li>
          <li><Link className="navb" to="/find">Find An Item</Link></li>
          <li><Link className="navb" to="/about">About</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      </header>
    </div>
  );
}

export default App;
