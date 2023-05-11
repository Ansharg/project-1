import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import Offers from "./Pages/Offers"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import ForgotPassword from "./Pages/ForgotPassword"
import Profile from "./Pages/Profile"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/offers" element={<Offers/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
