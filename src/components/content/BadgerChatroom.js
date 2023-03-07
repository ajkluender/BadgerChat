import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import UserLoginContext from "../../contexts/UserLoginContext";

import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useContext(UserLoginContext);

  const loadMessages = () => {
    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
      headers: {
        "X-CS571-ID": "bid_f224feb3a93089e00cb6",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  const handlePost = (post) => {
    post.preventDefault();

    if (!postTitle || !postContent) {
      alert("You must provide both a title and content");
    }
    const url = `https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_f224feb3a93089e00cb6",
      },
      credentials: "include",
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
      }),
    }).then((res) => {
      alert("Successfully posted!");
      setPostTitle("");
      setPostContent("");
      loadMessages();
    });
  };

  const handleDeletePost = (postID) => {};

  useEffect(() => {
    loadMessages();
  }, [props]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {
        /* TODO: Allow an authenticated user to create a post. */
        isAuthenticated ? (
          <>
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Post Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicContent">
                <Form.Label>Post Content:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handlePost}>
                Create Post
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h2>You must be logged in to post!</h2>
          </>
        )
      }
      <hr />
      {messages.length > 0 ? (
        <>
          {
            /* DONE: Complete displaying of messages. */

            messages.map((message) => {
              return (
                <BadgerMessage
                  key={message.id}
                  title={message.title}
                  poster={message.poster}
                  content={message.content}
                  created={message.created}
                  id={message.id}
                  onDelete={handleDeletePost}
                ></BadgerMessage>
              );
            })
          }
        </>
      ) : (
        <>
          <p>There are no messages in this chatroom yet!</p>
        </>
      )}
    </>
  );
}
