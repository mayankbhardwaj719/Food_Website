import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(localStorage.getItem('flag')==='2') setName("Please login or Register");
    else setName(localStorage.getItem('Email'));
  }, []);

  if('flag'==='2')
  {
    return <div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
  }
  else {
    return <div style={{ textAlign: "center" }}>Welcome - {name}</div>;
  }
};

export default Home;
