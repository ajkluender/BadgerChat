import React, { useEffect, useState } from "react";

import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    loadMessages();
  }, [props]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {/* TODO: Allow an authenticated user to create a post. */}
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
