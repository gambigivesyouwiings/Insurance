import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>Faithful Insurance</h3>
                <p>
                  299 South Branch Road <br />
                  Hillsborough, NJ<br /><br />
                  <strong>Phone:</strong> +1(201) 920-7621<br />
                  <strong>Email:</strong> fnmaina2006@gmail.com<br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                  <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                  <a href="https://www.youtube.com/@FaithNMaina" className="google-plus"><i className="bx bxl-youtube"></i></a>
                  <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <Link to="/">Home</Link></li>
                <li><i className="bx bx-chevron-right"></i> <a href="https://www.youtube.com/@FaithNMaina">About us (Youtube channel)</a></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/services">Services</Link></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <Link to="/life-insurance">Life Insurance</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/living-benefits">Living Benefits</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/medical">Medical Insurance</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/executive">Executive Bonus Plans</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/business-continuation">Business Continuity</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Coming soon!</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Faithful-Insurance</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="#">VMK</a>
        </div>
      </div>
    </footer>
  )
}
