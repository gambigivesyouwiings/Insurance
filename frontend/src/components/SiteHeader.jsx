import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SiteHeader.css'

export default function SiteHeader() {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProcessingClick, setIsProcessingClick] = useState(false)
  
  // preserve case for routes like /IRA and /FAQs; only trim trailing slashes
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  const familiesPaths = ['/life_insurance','/retirement-benefits','/living-benefits','/long-term','/IRA','/annuity','/dental-cover','/medical-cover','/disability-cover','/college_funding']
  const businessPaths = ['/business_transition','/business_continuation']
  const employersPaths = ['/key_employee_insurance_plans','/qualified_plans','/executive_bonus_plans']

  const isHome = normalized === '/'
  const isFamilies = familiesPaths.includes(normalized)
  const isBusiness = businessPaths.includes(normalized)
  const isEmployers = employersPaths.includes(normalized)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    
    // Close any open dropdowns when route changes
    const activeDropdowns = document.querySelectorAll('.dropdown-active')
    activeDropdowns.forEach(dropdown => {
      dropdown.classList.remove('dropdown-active')
    })
  }, [pathname])

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.navbar')) {
        // Close all dropdowns when clicking outside navbar in mobile mode
        const activeDropdowns = document.querySelectorAll('.dropdown-active')
        activeDropdowns.forEach(dropdown => {
          dropdown.classList.remove('dropdown-active')
        })
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Handle mobile nav toggle
  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Handle dropdown clicks for both mobile and nested dropdowns
  const handleDropdownClick = (e) => {
    e.stopPropagation() // Prevent event bubbling to avoid conflicts with main.js
    
    // Prevent rapid clicking
    if (isProcessingClick) return
    
    const clickedDropdown = e.currentTarget.nextElementSibling
    const isCurrentlyActive = clickedDropdown?.classList.contains('dropdown-active')
    const parentLi = e.currentTarget.closest('li')
    const isNestedDropdown = parentLi.classList.contains('dropdown') && parentLi.closest('.dropdown ul')
    
    // Handle nested dropdowns on both mobile and desktop
    if (isNestedDropdown || isMobileMenuOpen) {
      setIsProcessingClick(true)
      
      // Close all dropdowns at the same level
      const siblingDropdowns = parentLi.parentElement.querySelectorAll('.dropdown-active')
      
      siblingDropdowns.forEach(dropdown => {
        if (dropdown !== clickedDropdown) {
          dropdown.classList.remove('dropdown-active')
        }
      })
      
      // Toggle the clicked dropdown
      if (clickedDropdown) {
        if (isCurrentlyActive) {
          clickedDropdown.classList.remove('dropdown-active')
          // Also close any nested dropdowns
          const nestedDropdowns = clickedDropdown.querySelectorAll('.dropdown-active')
          nestedDropdowns.forEach(nested => nested.classList.remove('dropdown-active'))
        } else {
          clickedDropdown.classList.add('dropdown-active')
        }
      }
      
      // Reset processing flag after a short delay
      setTimeout(() => setIsProcessingClick(false), 100)
    }
  }

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><Link to="/">Faithful insurance</Link></h1>
        <nav id="navbar" className={`navbar ${isMobileMenuOpen ? 'navbar-mobile' : ''}`}>
          <ul>
            <li><Link to="/" className={isHome ? 'active' : undefined}>Home</Link></li>
            <li className="dropdown"><button type="button" className={isFamilies ? 'active' : undefined} onClick={handleDropdownClick}><span>Families & Individuals</span> <i className="bi bi-chevron-down"></i></button>
              <ul>
                <li><Link to="/life_insurance" className={normalized === '/life_insurance' ? 'active' : undefined}>Life Insurance</Link></li>
                <li><Link to="/retirement-benefits" className={normalized === '/retirement-benefits' ? 'active' : undefined}>Retirement Benefits</Link></li>
                <li><Link to="/living-benefits" className={normalized === '/living-benefits' ? 'active' : undefined}>Living Benefits</Link></li>
                <li><Link to="/long-term" className={normalized === '/long-term' ? 'active' : undefined}>Tax Qualified Long Term Care Insurance</Link></li>
                <li><Link to="/IRA" className={normalized === '/IRA' ? 'active' : undefined}>IRA</Link></li>
                <li><Link to="/annuity" className={normalized === '/annuity' ? 'active' : undefined}>Annuities</Link></li>
                <li className="dropdown"><button type="button" onClick={handleDropdownClick}><span> Health </span> <i className="bi bi-chevron-right"></i></button>
                  <ul>
                    <li><Link to="/dental-cover" className={normalized === '/dental-cover' ? 'active' : undefined}>Dental Insurance</Link></li>
                    <li><Link to="/medical-cover" className={normalized === '/medical-cover' ? 'active' : undefined}>Medical Cover</Link></li>
                    <li><Link to="/disability-cover" className={normalized === '/disability-cover' ? 'active' : undefined}>Disability Insurance</Link></li>
                  </ul>
                </li>
                <li><Link to="/college_funding" className={normalized === '/college_funding' ? 'active' : undefined}>College Funding</Link></li>
              </ul>
            </li>
            <li className="dropdown"><button type="button" className={isBusiness ? 'active' : undefined} onClick={handleDropdownClick}><span>Business Owners</span> <i className="bi bi-chevron-down"></i></button>
              <ul>
                <li><Link to="/business_transition" className={normalized === '/business_transition' ? 'active' : undefined}>Business Transition Plans</Link></li>
                <li><Link to="/business_continuation" className={normalized === '/business_continuation' ? 'active' : undefined}>Business Continuation Plans</Link></li>
              </ul>
            </li>
            <li className="dropdown"><button type="button" className={isEmployers ? 'active' : undefined} onClick={handleDropdownClick}><span>Employers & Plan sponsors</span> <i className="bi bi-chevron-down"></i></button>
              <ul>
                <li><Link to="/key_employee_insurance_plans" className={normalized === '/key_employee_insurance_plans' ? 'active' : undefined}>Key employee Insurance plans</Link></li>
                <li><Link to="/qualified_plans" className={normalized === '/qualified_plans' ? 'active' : undefined}>Qualified plans</Link></li>
                <li><Link to="/executive_bonus_plans" className={normalized === '/executive_bonus_plans' ? 'active' : undefined}>Executive Bonus Plans</Link></li>
              </ul>
            </li>
            <li><Link to="/FAQs" className={normalized === '/FAQs' ? 'active' : undefined}>FAQs</Link></li>
            <li><Link to="/contact_us" className={`getstarted${normalized === '/contact_us' ? ' active' : ''}`}>Contact</Link></li>
          </ul>
          <i 
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}
            onClick={handleMobileToggle}
          ></i>
        </nav>
      </div>
    </header>
  )
}
