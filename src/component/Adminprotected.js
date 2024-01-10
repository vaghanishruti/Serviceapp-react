import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Adminprotected = (props) => {
  let [token, setToken] = useState("");
  let history = useHistory();

  useEffect(() => {
    let getToken = localStorage.getItem("adminToken");
    if (!getToken) {
      return history.push("/admin");
    }
    setToken(getToken);
  }, []);
  if (!token) {
    <p>Loading....</p>;
  }
  return <>{props.children}</>;
};

export default Adminprotected;
