import React, { useState, useEffect } from "react";

export default function GitHubData(username) {
  console.log(username);
  const [result, setResult] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const res = await response.json();
      setResult(res);
    })();
  }, [username]);

  return result;
}
