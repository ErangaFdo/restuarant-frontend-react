import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/about-02.png";
import { register } from "../Services/auth";

function Register() {

   const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [role] = useState("USER")

  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}

    if (!firstname.trim()) newErrors.firstname = "First name is required"
    if (!lastname.trim()) newErrors.lastname = "Last name is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email"

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters"

    if (!conPassword) newErrors.conPassword = "Confirm your password"
    else if (password !== conPassword)
      newErrors.conPassword = "Passwords do not match"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  const handleRgister = async (e: FormEvent) => {
    e.preventDefault()

    if (!firstname || !lastname || !email || !password || !conPassword) {
      alert("All fields are required.")
      return
    }

    if (password !== conPassword) {
      alert("Password do not match.")
      return
    }

    if (!validateForm()) return

    try {
      const obj = {
        firstname,
        lastname,
        email,
        password,
        role
      }
      const res: any = await register(obj)
      console.log(res.data)
      console.log(res.message)

      alert(`Reginstration successful! Email: ${res?.data?.email}`)
      
      navigate("/login")

    } catch (err: any) {
      console.error(err?.response?.data)
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
     ${errors[field]
       ? "border-red-400 focus:ring-red-400"
       : "border-orange-200 focus:ring-orange-500"
  }`
  

  return (
     <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat absolute inset-0 -z-10 "
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <div className="bg-black/50 text-white shadow-lg backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-sky-200 opacity-100">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          
          <h2 className="text-3xl font-bold text-orange-500">Golden Spoon Restaurant</h2>
          <p className="text-sm mt-1">
            Welcome back to Golden Spoon Restaurant.
          </p>
        </div>
        

       <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={inputClass("firstname")}
                required
              />
               {errors.firstname && (
                <p className="text-red-300 text-xs mt-1">{errors.firstname}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={inputClass("lastname")}                  
                required
              />

              {errors.lastname && (
                <p className="text-red-300 text-xs mt-1">{errors.lastname}</p>
              )}

            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass("email")}
              required
            />

            {errors.email && (
              <p className="text-red-300 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass("password")}
                required
              />
               {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password}</p>
              )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className={inputClass("conPassword")}
              required
            />
              {errors.conPassword && (
                <p className="text-red-300 text-xs mt-1">{errors.conPassword}</p>
              )}
          </div>
          </div>
          

          <button
            onClick={handleRgister}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="my-6 border-t border-gray-300 text-center">
          <span className=" px-2 text-sm">or</span>
        </div>

        <p className="text-center  text-sm">
          If You have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register