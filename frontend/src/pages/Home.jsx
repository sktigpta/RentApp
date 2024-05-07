import React from "react";
import { useAuth } from "../storeing-data/auth";


const Home = () => {
  const { user, loading } = useAuth()

  return (
    <>
      {user.fullname}
    </>
  );
};

export default Home;
