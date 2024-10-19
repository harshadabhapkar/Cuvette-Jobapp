
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import JobPosting from "./components/JobPosting";
const App = () => {

  const allroutes =[
    { path: "/sign-up", element: <Signup/> },
    { path: "/", element: <Signup/> },
    { path: "/create-interview", element: <JobPosting/> }
  ]
  return (
    <Router>
      <ToastContainer />
        <Routes>
          {allroutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          </Routes>
          </Router>
  )
}

export default App
