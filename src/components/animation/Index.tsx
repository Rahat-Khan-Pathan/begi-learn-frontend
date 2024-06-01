import * as React from "react";
import { useState } from "react";

import "./style.css";
import Example from "./Example";

const Index = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="example-container">
        <Example key={count} setCount={setCount} count={count} />
      </div>
    </>
  );
};
export default Index;

