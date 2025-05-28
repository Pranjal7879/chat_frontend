// import { useNavigate } from "react-router-dom";
// import React from "react";
// import axios from "axios"
// const Login = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
//         <form className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Log In
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <span>Don't have an account? </span>
//           <button
//             className="text-blue-600 hover:underline"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pranjal-chat.up.railway.app/api/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
console.log(response.data)
      
      const { access_token, refresh_token } = response.data;      
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      alert("Login successful!");
      navigate("/chat");

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };
    
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
