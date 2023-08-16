import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer__left">
              <h3>Over ons</h3>
              <p>
                KLJ Keerbergen is a cool, vibrant, pleasant and cozy youth
                movement that has been providing fun for more than 90 years
                young people from 6 years old. Our department has about 150
                members, which is divided into 4 age groups: Javotten, Jokers,
                Lefkes, Kets and Kakkegrieten. Almost every Sunday afternoon
                organized an activity from 2 p.m. to 5 p.m.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer__middle">
              <h3>Links</h3>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/catalogus">Catalogus</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer__right">
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href="mailto:emiel.deboyser@student.arteveldehs.be">
                    <i className="fas fa-envelope"></i>
                    <span>emiel.deboyser@student.arteveldehs.be</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+32471234567">
                    <i className="fas fa-phone"></i>
                    <span>+32 471 23 45 67</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>2023 &copy; Emiel Deboyser</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
