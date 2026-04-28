import './App.css'
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
    </Routes>
  )
}

export default App
