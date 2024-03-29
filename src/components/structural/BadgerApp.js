import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerLayout from "./BadgerLayout";
import BadgerLogin from "../auth/BadgerLogin";
import BadgerRegister from "../auth/BadgerRegister";
import BadgerLogout from "../auth/BadgerLogout";
import BadgerChatroom from "../content/BadgerChatroom";
import BadgerChatHome from "../content/BadgerChatHome";
import BadgerNoMatch from "../content/BadgerNoMatch";

import UserLoginContext from "../../contexts/UserLoginContext";
import UserNameContext from "../../contexts/UserNameContext";

function BadgerApp() {
  const [chatrooms, setChatrooms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState([]);
  const [usernamePoster, setUsernamePoster] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/s23/hw6/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_f224feb3a93089e00cb6",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setChatrooms(json);
      });
  }, []);

  return (
    <UserLoginContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      <UserNameContext.Provider value={[usernamePoster, setUsernamePoster]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
              <Route index element={<BadgerChatHome />} />
              <Route path="/login" element={<BadgerLogin />}></Route>
              <Route path="/register" element={<BadgerRegister />}></Route>
              <Route path="/logout" element={<BadgerLogout />}></Route>
              {chatrooms.map((chatroom) => {
                return (
                  <Route
                    key={chatroom}
                    path={`chatrooms/${chatroom}`}
                    element={<BadgerChatroom name={chatroom} />}
                  />
                );
              })}
              <Route path="*" element={<BadgerNoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserNameContext.Provider>
    </UserLoginContext.Provider>
  );
}

export default BadgerApp;
