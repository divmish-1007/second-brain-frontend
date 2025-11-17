import Dashboard from "./Pages/Dashoboard"
import { Signin } from "./Pages/Signin"
import { Signup } from "./Pages/Signup"
import { BrowserRouter, Routes, Route  } from "react-router"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App
