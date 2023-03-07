import React, { useState, useRef, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserLoginContext from "../../contexts/UserLoginContext";
import { useNavigate } from "react-router-dom";

export default function BadgerLogin() {
  // TODO Create the login component.
  const inputUser = useRef();
  const inputPass = useRef();

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useContext(UserLoginContext);

  const handleLogin = (event) => {
    event.preventDefault();

    const username = inputUser.current.value;
    const password = inputPass.current.value;

    if (!username || !password) {
      alert("You must provide both a username and password!");
      return;
    }

    fetch("https://www.cs571.org/s23/hw6/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_f224feb3a93089e00cb6",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Incorrect password");
          return;
        } else if (res.status === 404) {
          alert("Incorrect username");
          return;
        } else {
          alert("Login was successful.");
          return res.json();
        }
      })
      .then((json) => {
        // Hand
        setIsAuthenticated(true);
        navigate("/");
      });
  };

  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={inputUser}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={inputPass}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </>
  );
}
