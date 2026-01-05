import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./Context/authContext";

const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Feedback = lazy(() => import("./pages/Feedback"));

function Layout() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/register", "/admin"];
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
