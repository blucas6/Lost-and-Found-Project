import { Route, RouterProvider } from "react-router-dom"
import HomePage from "./pages/home";
import ReportPage from "./pages/report";
import FindPage from "./pages/find";
import AboutPage from "./pages/about";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Navbar from "./components/navbar";
import Popup from './components/popup'
import { useState } from "react";

function App() {
  const [loginPopup, setLoginPopup] = useState(true)
  const [loggedInUser, setUser] = useState("")
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar authed={loggedInUser}/>} >
        <Route index element={<HomePage authed={loggedInUser}/>} onEnter={requireAuth}/>
        <Route path="report" element={<ReportPage />} onEnter={requireAuth}/>
        <Route path="find" element={<FindPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <header className="App-header">
      <Popup trigger={loginPopup} setTrigger={setLoginPopup} checkifAuth={setUser} />
      <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
