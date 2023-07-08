import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import Offers from "./Pages/Offers"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import ForgotPassword from "./Pages/ForgotPassword"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./Components/PrivateRoute"
import CreateListing from "./Pages/CreateListing"



function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/offers" element={<Offers/>}/>
          <Route path="/create-listing" element={<PrivateRoute/>}>
            <Route path="/create-listing" element={<CreateListing/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
