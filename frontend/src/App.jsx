import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'

function useScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}

function ReloadMainScript() {
  useEffect(() => {
    const existing = document.querySelectorAll('script[data-reinit="mainjs"]')
    existing.forEach(s => s.remove())
    const s = document.createElement('script')
    s.src = '/static/assets/js/main.js?ts=' + Date.now()
    s.defer = true
    s.setAttribute('data-reinit', 'mainjs')
    document.body.appendChild(s)
  })
  return null
}

const routeMap = [
  { path: '/', element: <Home /> },
  { path: '/about', template: 'about.html' },
  { path: '/annuities', template: 'annuities.html' },
  { path: '/blog', template: 'blog.html' },
  { path: '/blog-single', template: 'blog-single.html' },
  { path: '/business-continuation', template: 'business-continuation.html' },
  { path: '/business-transition', template: 'business-transition.html' },
  { path: '/college', template: 'college.html' },
  { path: '/contact', template: 'contact.html' },
  { path: '/dental', template: 'dental.html' },
  { path: '/disability-insurance', template: 'disability-insurance.html' },
  { path: '/executive', template: 'executive.html' },
  { path: '/GLIR', template: 'GLIR.html' },
  { path: '/ira', template: 'ira.html' },
  { path: '/key-employee', template: 'key-employee.html' },
  { path: '/life-insurance', template: 'life-insurance.html' },
  { path: '/living-benefits', template: 'living-benefits.html' },
  { path: '/longterm-care', template: 'longterm-care.html' },
  { path: '/medical', template: 'medical.html' },
  { path: '/portfolio', template: 'portfolio.html' },
  { path: '/portfolio-details', template: 'portfolio-details.html' },
  { path: '/pricing', template: 'pricing.html' },
  { path: '/retirement-benefits', template: 'retirement-benefits.html' },
  { path: '/services', template: 'services.html' },
  { path: '/team', template: 'team.html' },
  { path: '/testimonials', template: 'testimonials.html' },
  { path: '/faqs', template: 'FAQS.html' },
]

function StaticHtmlPage({ file }) {
  useScrollTop()
  useEffect(() => { window.dispatchEvent(new Event('load')) }, [file])
  return (
    <main id="main" className="container py-4">
      <div data-static-html data-file={file}></div>
      <ReloadMainScript />
    </main>
  )
}

function useInjectHtml(file) {
  useEffect(() => {
    const target = document.querySelector('[data-static-html]')
    if (!target) return
    fetch(`/staticized/${file}`).then(async res => {
      if (!res.ok) throw new Error('Missing staticized page: ' + file)
      const html = await res.text()
      target.innerHTML = html
      window.dispatchEvent(new Event('load'))
    }).catch(() => {
      fetch(`/templates/${file}`).then(r => r.text()).then(src => {
        const bodyOnly = src.split('<body>')[1]?.split('</body>')[0] || src
        const sanitized = bodyOnly
          .replace(/\{\{\s*url_for\(.*?\)\s*\}\}/g, '#')
          .replace(/\{\%.*?\%\}/gs, '')
        target.innerHTML = sanitized
        window.dispatchEvent(new Event('load'))
      })
    })
  }, [file])
}

function RoutedPage({ template }) {
  useInjectHtml(template)
  return <StaticHtmlPage file={template} />
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        {routeMap.map(({ path, element, template }) => (
          <Route key={path} path={path} element={element || <RoutedPage template={template} />} />
        ))}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
