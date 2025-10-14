import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SiteHeader() {
  const { pathname } = useLocation()
  // preserve case for routes like /IRA and /FAQs; only trim trailing slashes
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  const familiesPaths = ['/life_insurance','/retirement-benefits','/living-benefits','/long-term','/IRA','/annuity','/dental-cover','/medical-cover','/disability-cover','/college_funding']
  const businessPaths = ['/business_transition','/business_continuation']
  const employersPaths = ['/key_employee_insurance_plans','/qualified_plans','/executive_bonus_plans']

  const isHome = normalized === '/'
  const isFamilies = familiesPaths.includes(normalized)
  const isBusiness = businessPaths.includes(normalized)
  const isEmployers = employersPaths.includes(normalized)

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><Link to="/">Faithful insurance</Link></h1>
        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/" className={isHome ? 'active' : undefined}>Home</Link></li>
            <li className="dropdown"><a href="#" className={isFamilies ? 'active' : undefined}><span>Families & Individuals</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/life-insurance" className={normalized === '/life-insurance' ? 'active' : undefined}>Life Insurance</Link></li>
                <li><Link to="/retirement-benefits" className={normalized === '/retirement-benefits' ? 'active' : undefined}>Retirement Benefits</Link></li>
                <li><Link to="/living-benefits" className={normalized === '/living-benefits' ? 'active' : undefined}>Living Benefits</Link></li>
                <li><Link to="/longterm-care" className={normalized === '/longterm-care' ? 'active' : undefined}>Tax Qualified Long Term Care Insurance</Link></li>
                <li><Link to="/ira" className={normalized === '/ira' ? 'active' : undefined}>IRA</Link></li>
                <li><Link to="/annuities" className={normalized === '/annuities' ? 'active' : undefined}>Annuities</Link></li>
                <li className="dropdown"><a href="#"><span> Health </span> <i className="bi bi-chevron-right"></i></a>
                  <ul>
                    <li><Link to="/dental" className={normalized === '/dental' ? 'active' : undefined}>Dental Insurance</Link></li>
                    <li><Link to="/medical" className={normalized === '/medical' ? 'active' : undefined}>Medical Cover</Link></li>
                    <li><Link to="/disability-insurance" className={normalized === '/disability-insurance' ? 'active' : undefined}>Disability Insurance</Link></li>
                  </ul>
                </li>
                <li><Link to="/college" className={normalized === '/college' ? 'active' : undefined}>College Funding</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#" className={isBusiness ? 'active' : undefined}><span>Business Owners</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/business-transition" className={normalized === '/business-transition' ? 'active' : undefined}>Business Transition Plans</Link></li>
                <li><Link to="/business-continuation" className={normalized === '/business-continuation' ? 'active' : undefined}>Business Continuation Plans</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#" className={isEmployers ? 'active' : undefined}><span>Employers & Plan sponsors</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/key-employee" className={normalized === '/key-employee' ? 'active' : undefined}>Key employee Insurance plans</Link></li>
                <li><Link to="/GLIR" className={normalized === '/glir' ? 'active' : undefined}>Guaranteed Lifetime Income Rider</Link></li>
                <li><Link to="/executive" className={normalized === '/executive' ? 'active' : undefined}>Executive Bonus Plans</Link></li>
              </ul>
            </li>
            <li><Link to="/faqs" className={normalized === '/faqs' ? 'active' : undefined}>FAQs</Link></li>
            <li><Link to="/contact" className={`getstarted${normalized === '/contact' ? ' active' : ''}`}>Contact</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  )
}
