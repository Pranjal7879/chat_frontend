import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Let's Talk</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
