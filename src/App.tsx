import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';


import './App.css'
import Login from "./Login.tsx"
import Signup from "./Signup.tsx";

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
