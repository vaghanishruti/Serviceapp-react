import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Userprotected = (props) => {
  let history = useHistory();
  let [token, setToken] = useState("");

  useEffect(() => {
    let getToken = localStorage.getItem("userToken");
    if (!getToken) {
      history.push("/");
    }
    setToken(getToken);
  }, []);
  if (!token) {
    <p>Loading....</p>;
  }
  return <>{props.children}</>;
};

export default Userprotected;
