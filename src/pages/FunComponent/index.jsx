import React, { useState, useCallback } from "react";
import "./index.less";

function FunComponent(props) {
  const [num, setNum] = useState(0);
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
