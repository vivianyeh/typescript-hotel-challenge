import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import './App.css'
import Login from "./pages/Login.tsx"
import Signup from "./pages/SignUp.tsx";

function App() {
  return (<>
    <title> | 享樂酒店</title>

    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
