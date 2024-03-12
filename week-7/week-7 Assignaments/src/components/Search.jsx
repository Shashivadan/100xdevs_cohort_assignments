import React, { useRef, useState } from "react";
import GitHubData from "../hooks/GitHubData";
import {} from "react";

import Card from "./Card";

function Search() {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const userData = GitHubData(username);

  const handleChange = () => {
    let username = inputRef.current.value;
    setUsername(username);
  };

  const handleButton = () => {
    setData(userData);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButton();
        }}
      >
        <input type="text" ref={inputRef} onChange={handleChange} />
        <button type="Submit">click</button>
        <Card props={data}></Card>
      </form>
    </div>
  );
}

export default Search;
