 import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 border-top">
      <div className="container text-light">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mb-4 mb-lg-0">
            <div className="mb-3">
              <Logo width="120px" />
            </div>
            <p className=" small">&copy; 2023 DevUI. All rights reserved.</p>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-decoration-none" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Affiliate</Link>
              </li>
              <li>
                <Link className=" text-decoration-none" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Contact</Link>
              </li>
              <li>
                <Link className=" text-decoration-none" to="/">Support Center</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-3">
            <h6 className="text-uppercase fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Terms</Link>
              </li>
              <li className="mb-2">
                <Link className=" text-decoration-none" to="/">Privacy</Link>
              </li>
              <li>
                <Link className=" text-decoration-none" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <p className="text-center  small mb-0">Designed & Built with ❤️ by DevUI</p>
      </div>
    </footer>
  );
}

export default Footer;
