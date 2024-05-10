import React from "react";
import { useAuth } from "../storeing-data/auth";
import { Categories } from "../components/Categories";
import { HomeCard } from "../components/HomeCard";


const Home = () => {
  const { user } = useAuth()

  return (
    <>
      <Categories />
      <HomeCard/>
    </>
  );
};

export default Home;
