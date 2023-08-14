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
                KLJ Keerbergen is een toffe, bruisende, plezante en gezellige
                jeugdbeweging die al meer dan 90 jaar zorgt voor plezier aan
                jongeren vanaf 6 jaar. Onze afdeling telt ongeveer 150 leden,
                die ingedeeld wordt in 4 leeftijdsgroepen: Javotten, Jokers,
                Lefkes, Kets en Kakkegrieten. Bijna elke zondagnamiddag wordt er
                een activiteit georganiseerd van 14 uur tot 17 uur.
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
      </div>
    </footer>
  );
};

export default Footer;
