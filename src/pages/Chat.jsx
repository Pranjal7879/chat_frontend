
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const WS_URL = `wss://pranjal-chat.up.railway.app/ws/chat/geitpl/?token=${token}`;
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.type === "users") {
          setUsers(data.users);
          if (!selectedUser && data.users.length > 0) {
            setSelectedUser(data.users[0]);
          }
        } else if (data.type === "chat") {
          setMessages((prev) => {
            const user = data.from === "You" ? data.to : data.from;
            return {
              ...prev,
              [user]: [...(prev[user] || []), data],
            };
          });
        }
      } catch (err) {
        console.log("Received non-JSON message:", e.data);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;
    const msg = {
      type: "chat",
      to: selectedUser,
      message: input,
    };
    ws.current.send(JSON.stringify(msg));
    setInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-[700px] mb-4 text-right pr-2">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg flex w-[700px] h-[400px] overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 p-4">
          <h2 className="font-bold mb-4">Users in Room</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user}
                className={`p-2 rounded cursor-pointer mb-1 ${
                  selectedUser === user
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 p-4 text-center font-bold">
            Chat with {selectedUser || "—"}
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {(messages[selectedUser] || []).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.from === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none focus:ring"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!selectedUser}
            />

            <button
              className="bg-gray-200 px-4 py-2 rounded font-semibold disabled:opacity-50"
              onClick={sendMessage}
              disabled={!input.trim() || !selectedUser}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;





















// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Chat = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [messages, setMessages] = useState({});
//   const [input, setInput] = useState("");
//   const ws = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     fetch("https://pranjal-chat.up.railway.app/api/users/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         if (!selectedUser && data.length > 0) {
//           setSelectedUser(data[0].username);
//         }
//       });

//     const WS_URL = `wss://pranjal-chat.up.railway.app/ws/chat/geitpl/?token=${token}`;
//     ws.current = new WebSocket(WS_URL);

//     ws.current.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.type === "chat") {
//         const user = data.from === "You" ? data.to : data.from;
//         setMessages((prev) => ({
//           ...prev,
//           [user]: [...(prev[user] || []), data],
//         }));
//       }
//     };

//     return () => ws.current.close();
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim() || !selectedUser) return;
//     ws.current.send(
//       JSON.stringify({
//         type: "chat",
//         to: selectedUser,
//         message: input,
//       })
//     );
//     setInput("");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="w-[700px] mb-4 text-right pr-2">
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-lg flex w-[700px] h-[400px] overflow-hidden">
//         <div className="w-1/3 border-r p-4">
//           <h2 className="font-bold mb-4">All Users</h2>
//           <ul>
//             {users.map((user) => (
//               <li
//                 key={user.username}
//                 className={`p-2 flex items-center justify-between rounded cursor-pointer mb-1 ${
//                   selectedUser === user.username
//                     ? "bg-gray-200 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => setSelectedUser(user.username)}
//               >
//                 <span>{user.name || user.username}</span>
//                 {user.is_online && <span className="h-2 w-2 bg-green-500 rounded-full" />}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex-1 flex flex-col">
//           <div className="border-b p-4 text-center font-bold">
//             Chat with {selectedUser || "—"}
//           </div>
//           <div className="flex-1 p-4 overflow-y-auto">
//             {(messages[selectedUser] || []).map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`mb-2 ${
//                   msg.from === "You" ? "text-right" : "text-left"
//                 }`}
//               >
//                 <span
//                   className={`inline-block px-4 py-2 rounded ${
//                     msg.from === "You"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   {msg.message}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="p-3 border-t flex">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type a message..."
//               className="flex-1 border rounded px-3 py-2 mr-2"
//             />
//             <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
