import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
        <div className="row row--footer">
            <div className="footer__about">
            <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/6DY2oTLjJ">
            <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/>
            <span>Buy me a coffee</span>
            </a>
              <div className="footer__copyright">
                 <div className="footer__author">
                  <p>Built and coded by <a href="https://rossyatsura.com/" className="footer__link">Ross Yatsura</a></p>
                  <p>&copy; Copyright {year}</p>
                 </div>
              </div>
              <div className="footer__source">
                 <a href="https://www.themoviedb.org/">
                 <picture>
                   <source media="(min-width: 800px)" srcSet="./images/tmdb.svg" className="footer__tmdb" />
                   <img src="./images/tmdb-small.svg" className="footer__tmdb" className="footer__tmdb" />
                 </picture>
                 </a>
              </div>
            </div>
        </div>
    </footer>
);
};

export default Footer;