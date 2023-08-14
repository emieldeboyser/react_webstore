import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Catalogus from "../Catalogus/catalogus";

const Home = () => {
  return (
    <div className="container">
      <div className="aside">
        <img src="./images/home.jpeg" alt="sjaaltje" />
        <div className="rightSide">
          <h1>Welkom bij KLJ Keerbergen</h1>

          <p>
            Op deze website kan je kleren kopen voor jouw kinderen die in de KLJ
            van Keerbergen zitten! Bij Klj Keerbergen kan je terecht voor een
            leuke zondagnamiddag met je vrienden. We spelen spelletjes, doen een
            quiz, gaan op uitstap, en nog veel meer!
          </p>

          <Link to="/catalogus" element={<Catalogus />}>
            <button>Catalogus bekijken</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
