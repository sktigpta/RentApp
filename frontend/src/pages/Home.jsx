import React from "react";
import { useAuth } from "../storeing-data/auth";
import { Categories } from "../components/Categories";


const Home = () => {
  const { user } = useAuth()

  return (
    <>
      <div className="home-hero">
        <section className="UBDSCJYH">

        </section>
        <section>

        </section>
        <section>

        </section>
      </div>
    </>
  );
};

export default Home;
