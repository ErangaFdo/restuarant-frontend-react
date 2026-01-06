import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDetails, login } from "../Services/auth";
import { useAuth } from "../Context/authContext";
import bgImage from "../assets/about-02.png";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Missing Fields, Please fill all required fields.");
      return;
    }

    try {
      const res = await login(email, password);

      if (!res.data?.accessToken) {
        alert("Invalid email or password.");
        return;
      }

      localStorage.setItem("accessToken", res.data.accessToken);

      const detail = await getMyDetails();

      const userData = {
        ...detail.data,
        roles: detail.data.role
      };

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(detail.data));

      alert("Welcome Back! Login Successful");

      setTimeout(() => {
        if (userData.roles?.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 800);

    } catch (err: any) {
      console.error(err);

      if (err?.response?.status === 400 || err?.response?.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="bg-black/50 text-white shadow-lg backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-sky-200">

        {/* Logo / Title */}
        <div className="text-center mb-6">
          
          <h2 className="text-3xl font-bold text-orange-500">Golden Spoon Restaurant</h2>
          <p className="text-sm mt-1">
            Welcome back to Golden Spoon Restaurant.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white bg-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white bg-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2 accent-orange-500"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-500 disabled:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 text-center">
          <span className="px-2 text-sm">or</span>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-orange-400 font-medium hover:underline">
            Create one
          </a>
        </p>

      </div>
    </div>
  );
}