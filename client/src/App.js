import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home";
import ReportPage from "./pages/report";
import FindPage from "./pages/find";
import AboutPage from "./pages/about";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
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
