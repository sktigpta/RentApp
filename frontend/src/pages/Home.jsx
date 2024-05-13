import React from "react";
import { useAuth } from "../storeing-data/auth";
import { Categories } from "../components/Categories";
import { RightHeroSection } from "../components/RightHeroSection";
import { LeftHeroSection } from "../components/LeftHeroSection";
import { MiddleHeroSection } from "../components/MiddleHeroSection";


const Home = () => {
  const { user } = useAuth()

  return (
    <>
      <div className="home-hero">
        <LeftHeroSection />
        <MiddleHeroSection />
        <RightHeroSection />
      </div>
    </>
  );
};

export default Home;
