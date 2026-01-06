import { Link } from "react-router-dom";


export default function AlertPopups() {
  return (
    <div className="fixed inset-0 bg-white  flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md animate-fadeIn scale-95 animate-pop">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">
          You are not logged in!
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Please login or create a new account to continue.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg text-center font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg text-center font-medium"
          >
            Register
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes pop {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop {
        animation: pop 0.25s ease-out forwards;
        }

      `}</style>
    </div>

    
  );
}