import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Are you lost? <Link to="/">Go back home</Link>
      </p>
    </div>
  );
};

export default Home;
