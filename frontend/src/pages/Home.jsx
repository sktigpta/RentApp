import React from "react";
import { useAuth } from "../storeing-data/auth";


const Home = () => {
  const { user, business } = useAuth()

  return (
    <>
      <div className="hero">

      </div>
    </>
  );
};

export default Home;
