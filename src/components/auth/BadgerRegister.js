import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserLoginContext from "../../contexts/UserLoginContext";

export default function BadgerRegister() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useContext(UserLoginContext);

  const navigate = useNavigate();

  // DONE Create the register component.

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("hello");
    if (!username1 || !password1) {
      alert("You must provide both a username and password!");
      return;
    } else if (password1 !== confirmPassword) {
      alert("Your passwords do not match!");
      return;
    } else {
      // DONE: Perform fetch

      fetch("https://www.cs571.org/s23/hw6/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_f224feb3a93089e00cb6",
        },
        body: JSON.stringify({
          username: username1,
          password: password1,
        }),
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 409) {
            alert("That username has already been taken!");
          }
          alert("Registration was succcesful");
          return res.json();
        })
        .then((json) => {
          //json.user.username() context set not null
          setIsAuthenticated(true);
          navigate("/");
          //alert succ
        });
    }
  };
  return (
    <>
      <h1>Register</h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username1}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </>
  );
}
