import { lazy, Suspense, useState, type ReactNode } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./Context/authContext";
import AlertPopups from "./components/AlertPopups";
import { CartProvider } from "./Context/cardContext";
import Footer from "./components/Footer";

const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Feedback = lazy(() => import("./pages/Feedback"));
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));

const FoodAdmin = lazy(() => import("./AdminPages/foodAdmin"));
const Menu = lazy(() => import("./pages/Menu"));
const Order = lazy(() => import("./pages/OrderPage"));
const Payment = lazy(() => import("./pages/PaymentPage"));


type RequireAuthTypes = { children: ReactNode; roles?: string[] };

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {

  if (!showPopup) setShowPopup(true);
    return (
      <>
        {showPopup && <AlertPopups/>}
      </>
    );
  }


  if (roles && !roles.some((r) => user.roles?.includes(r))) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

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
          <Route path="/menu" element={<Menu />} />

          <Route
              path="/orders"
              element={
                <RequireAuth roles={["USER"]}>
                  <Order />
                </RequireAuth>
              } 
          />

          <Route
              path="/payment"
              element={
                <RequireAuth roles={["USER"]}>
                  <Payment />
                </RequireAuth>
              } 
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <RequireAuth roles={["ADMIN"]}>
                <AdminDashBoard />
              </RequireAuth>
            }
          >
            {/*  NESTED ROUTE */}
            <Route path="food" element={<FoodAdmin />} />
          </Route>
        </Routes>

      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
      <Layout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
