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
                <li><Link to="/life_insurance" className={normalized === '/life_insurance' ? 'active' : undefined}>Life Insurance</Link></li>
                <li><Link to="/retirement-benefits" className={normalized === '/retirement-benefits' ? 'active' : undefined}>Retirement Benefits</Link></li>
                <li><Link to="/living-benefits" className={normalized === '/living-benefits' ? 'active' : undefined}>Living Benefits</Link></li>
                <li><Link to="/long-term" className={normalized === '/long-term' ? 'active' : undefined}>Tax Qualified Long Term Care Insurance</Link></li>
                <li><Link to="/IRA" className={normalized === '/IRA' ? 'active' : undefined}>IRA</Link></li>
                <li><Link to="/annuity" className={normalized === '/annuity' ? 'active' : undefined}>Annuities</Link></li>
                <li className="dropdown"><a href="#"><span> Health </span> <i className="bi bi-chevron-right"></i></a>
                  <ul>
                    <li><Link to="/dental-cover" className={normalized === '/dental-cover' ? 'active' : undefined}>Dental Insurance</Link></li>
                    <li><Link to="/medical-cover" className={normalized === '/medical-cover' ? 'active' : undefined}>Medical Cover</Link></li>
                    <li><Link to="/disability-cover" className={normalized === '/disability-cover' ? 'active' : undefined}>Disability Insurance</Link></li>
                  </ul>
                </li>
                <li><Link to="/college_funding" className={normalized === '/college_funding' ? 'active' : undefined}>College Funding</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#" className={isBusiness ? 'active' : undefined}><span>Business Owners</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/business_transition" className={normalized === '/business_transition' ? 'active' : undefined}>Business Transition Plans</Link></li>
                <li><Link to="/business_continuation" className={normalized === '/business_continuation' ? 'active' : undefined}>Business Continuation Plans</Link></li>
              </ul>
            </li>
            <li className="dropdown"><a href="#" className={isEmployers ? 'active' : undefined}><span>Employers & Plan sponsors</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><Link to="/key_employee_insurance_plans" className={normalized === '/key_employee_insurance_plans' ? 'active' : undefined}>Key employee Insurance plans</Link></li>
                <li><Link to="/qualified_plans" className={normalized === '/qualified_plans' ? 'active' : undefined}>Qualified plans</Link></li>
                <li><Link to="/executive_bonus_plans" className={normalized === '/executive_bonus_plans' ? 'active' : undefined}>Executive Bonus Plans</Link></li>
              </ul>
            </li>
            <li><Link to="/FAQs" className={normalized === '/FAQs' ? 'active' : undefined}>FAQs</Link></li>
            <li><Link to="/contact_us" className={`getstarted${normalized === '/contact_us' ? ' active' : ''}`}>Contact</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  )
}
