import React from "react";
import { Card } from "./components/Card";

function App() {
  // const [count, setCount] = useState(0);
  const data = {
    name: "John Doe",
    description: "Software Engineer with 5 years of experience",
    SocialMedia: ["linkedin", "twitter.com/johndoe"],
    Interests: ["Reading", "hiking", "playing guitar"],
  };

  return (
    <>
      <div className="h-screen w-full bg-neutral-900  grid items-center">
        <Card data={data} />
      </div>
    </>
  );
}

export default App;
