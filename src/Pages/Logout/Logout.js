import React from "react";

function Logout() {
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
export default Logout;
