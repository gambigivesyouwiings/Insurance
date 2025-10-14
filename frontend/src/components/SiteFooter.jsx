import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <>
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
                  <li><i className="bx bx-chevron-right"></i> <Link to="/mservices">Services</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/life_insurance">Life Insurance</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/living-benefits">Living Benefits</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/medical-cover">Medical Insurance</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/executive_bonus_plans">Executive Bonus Plans</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/business_continuation">Business Continuity</Link></li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>Coming soon!</p>
                <form action="" method="post">
                  <input type="email" name="email" /><input type="submit" value="Subscribe" />
                </form>

              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>Faithful-Insurance</span></strong>. All Rights Reserved
            <br />
            <strong>National Life Group</strong> is a trade name of National Life Insurance Company(NLIC), Montpelier VT, Life Insurance Company of the Southwest (LSW), Addison TX and their affiliates. Each company is solely responsible for its own financial condition and contractual obligations. LSW is not an authorized insurer in NY and does not conduct insurance business in NY.
            <br />TC140732(0324)1
          </div>
          <div className="credits">
            *The use of cash value life insurance to provide a resource for accumulation goals assumes that there is first a need for the death benefit protection.  The ability of a life insurance contract to accumulate sufficient cash value to help meet accumulation goals will be dependent upon the amount of extra premium paid into the policy, and the performance of the policy, and is not guaranteed.  Policy loans and withdrawals reduce the policy’s cash value and death benefit and may result in a taxable event. Withdrawals up to the basis paid into the contract and loans thereafter will not create an immediate taxable event, but substantial tax ramifications could result upon contract lapse or surrender. Surrender charges may reduce the policy's cash value in early years.

          </div>
        </div>
      </footer>

      <div className="chat-icon" onClick={() => window.toggleChat && window.toggleChat()}><i className="bi bi-whatsapp"></i></div>
      <div className="chat-container" style={{ top: 'var(--top)', left: 'var(--left)' }} id="chatContainer">
        <div className="chat-header" id="chat-header-two">
          <h3>Whatsapp Chat Assistant</h3>
          <i className="bi bi-x" onClick={() => window.toggleChat && window.toggleChat()}></i>
        </div>
        <div className="chat-history" id="chatHistory"></div>
        <div className="chat-input">
          <input type="text" id="userInput" placeholder="Type your message..." onKeyPress={(e) => window.handleWhatsAppKeyPress && window.handleWhatsAppKeyPress(e)} />
        </div>
      </div>
      <script src="/static/assets/js/chat.js"></script>
    </>
  )
}
