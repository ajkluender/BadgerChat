import React from "react";

function BadgerMessage(props) {
  const dt = new Date(props.created);
  console.log(props);

  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };

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
    </>
  );
}

export default BadgerMessage;
