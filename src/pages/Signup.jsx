// import { useNavigate } from "react-router-dom";
// import React from "react";
// import { useState } from "react";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setformData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/createacc/",
//         formData
//       );
//       if (response.status === 201) {
//         navigate("/login")
//       }
//     } catch (error) {
//       console.error("signup fail", error.response.data);
//     }
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="name"
//             onChange={(e) => setformData({ ...formData, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
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
//             Sign Up
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <span>Already have an account? </span>
//           <button
//             className="text-blue-600 hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Log in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;















import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createacc/",
        formData
      );
      if (response.status === 201) {
        toast.success("User created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
      }
    } catch (error) {
      console.error("Signup failed", error?.response?.data || error.message);
      toast.error("Signup failed. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setformData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setformData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setformData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Signup;
