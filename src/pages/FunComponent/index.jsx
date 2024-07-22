import React, { useState, useCallback } from "react";
import "./index.less";
function FunComponent() {
  const [num, setNum] = useState(0);
  console.log(66666);
  const change = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  return (
    <div>
      <div className="hello-world">
        {num}
        <button onClick={change}>+1</button>
      </div>
    </div>
  );
}

export default FunComponent;
