import React from "react";
import { useAuth } from "../storeing-data/auth";
import { Categories } from "../components/Categories";


const Home = () => {
  const { user } = useAuth()

  return (
    <>
      <Categories />
    </>
  );
};

export default Home;
