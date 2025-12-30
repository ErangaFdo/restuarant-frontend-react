import { lazy } from "react"

const Services = lazy(() => import("./pages/Services"))
const About = lazy(() => import("./pages/About"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))



function App() {


  return (
    <>
    <h1>Hello, World!</h1>
    </>
  )
}

export default App
