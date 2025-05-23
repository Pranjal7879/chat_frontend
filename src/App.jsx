// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Chat from "./pages/Chat";
// import ProtectedRoute from "./components/protectedroutes";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/chat"  element={<Chat />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;












// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoutes from "./components/ProtectedRoute"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
