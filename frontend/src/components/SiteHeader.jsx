import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteHeader() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><Link to="/">Faithful insurance</Link></h1>
        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li className="dropdown"><a href="#"><span>Families & Individuals</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/life-insurance">Life Insurance</Link></li>
                <li><Link to="/retirement-benefits">Retirement Benefits</Link></li>
                <li><Link to="/living-benefits">Living Benefits</Link></li>
                <li><Link to="/longterm-care">Tax Qualified Long Term Care Insurance</Link></li>
                <li><Link to="/ira">IRA</Link></li>
                <li><Link to="/annuities">Annuities</Link></li>
                <li className="dropdown"><a href="#"><span> Health </span> <i className="bi bi-chevron-right"></i></a>
                  <ul>
                    <li><Link to="/dental">Dental Insurance</Link></li>
                    <li><Link to="/medical">Medical Cover</Link></li>
                    <li><Link to="/disability-insurance">Disability Insurance</Link></li>
                  </ul>
                </li>
                <li><Link to="/college">College Funding</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#"><span>Business Owners</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/business-transition">Business Transition Plans</Link></li>
                <li><Link to="/business-continuation">Business Continuation Plans</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#"><span>Employers & Plan sponsors</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/key-employee">Key employee Insurance plans</Link></li>
                <li><Link to="/GLIR">Guaranteed Lifetime Income Rider</Link></li>
                <li><Link to="/executive">Executive Bonus Plans</Link></li>
              </ul>
            </li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact" className="getstarted">Contact</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  )
}
