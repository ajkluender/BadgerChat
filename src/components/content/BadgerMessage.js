import React, { useContext, useEffect, useState } from "react";
import UserNameContext from "../../contexts/UserNameContext";
import { Button, Form } from "react-bootstrap";

function BadgerMessage(props) {
  const [usernamePoster, setUsernamePoster] = useContext(UserNameContext);
  const [allowDelete, setDelete] = useState(false);

  const dt = new Date(props.created);

  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };
  console.log(usernamePoster);
  console.log(props.poster);
  useEffect(() => {
    if (usernamePoster === props.poster) {
      setDelete(true);
    }
  }, []);

  /*
if props.poster = usernameposter then we can delete the post if have no button under the post

  */
  return (
    <>
      <h2>{props.title}</h2>
      <sub>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <br />
      <i>{props.poster}</i>
      <p>{props.content}</p>

      {allowDelete ? (
        <Button variant="danger" type="submit" onClick={handleDeleteClick}>
          Delete Post
        </Button>
      ) : null}
    </>
  );
}

export default BadgerMessage;
