import React, { useContext, useEffect } from "react";

import UserLoginContext from "../../contexts/UserLoginContext";

export default function BadgerLogout() {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserLoginContext);
  useEffect(() => {
    fetch("https://cs571.org/s23/hw6/api/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_f224feb3a93089e00cb6",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        // Maybe you need to do something here?
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
