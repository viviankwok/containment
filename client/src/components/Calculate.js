import React from "react";
import CalculateInput from "./CalculateInput";

const Calculate = () => {
  return (
    <div id="calculate">
      <div className="mb-1 inline justify-center">
        <div className="text-2xl font-bold flex justify-center">
          Enter storage space details.
        </div>
        <div className="text-xs font-light flex justify-center">
          [ & FIND A SUITABLE CONTAINER. ]
        </div>
      </div>
      <CalculateInput />
    </div>
  );
};

export default Calculate;
