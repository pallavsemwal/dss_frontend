import React from "react";
import {CircleLoader} from "react-spinners";

const LoadingComponent = () => {
  return (
    <div style={{ marginTop: "20%", marginLeft: "45%" }}>
      <CircleLoader size={80} color={"rgb(54, 215, 83)"} />
    </div>
  );
};

export default LoadingComponent;
