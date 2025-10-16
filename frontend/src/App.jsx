import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import emailjs from '@emailjs/browser'

const rawTemplates = import.meta.glob('./templates/*.html', { as: 'raw', eager: true })
function getRawTemplate(file) {
  const byExact = rawTemplates[`./templates/${file}`]
  if (byExact) return byExact
  // Try case-insensitive lookup
  const key = Object.keys(rawTemplates).find(k => k.toLowerCase().endsWith(`/${file.toLowerCase()}`))
  return key ? rawTemplates[key] : null
}

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
  { path: '/welcome', element: <Navigate to="/" replace /> },
  { path: '/contact_us', template: 'contact.html' },
  { path: '/mservices', template: 'services.html' },
  { path: '/mportfolio', template: 'portfolio.html' },
  { path: '/about_us', template: 'about.html' },
  { path: '/life_insurance', template: 'life-insurance.html' },
  { path: '/retirement-benefits', template: 'retirement-benefits.html' },
  { path: '/living-benefits', template: 'living-benefits.html' },
  { path: '/medical-cover', template: 'medical.html' },
  { path: '/dental-cover', template: 'dental.html' },
  { path: '/disability-cover', template: 'disability-insurance.html' },
  { path: '/long-term', template: 'longterm-care.html' },
  { path: '/IRA', template: 'ira.html' },
  { path: '/college_funding', template: 'college.html' },
  { path: '/annuity', template: 'annuities.html' },
  { path: '/business_continuation', template: 'business-continuation.html' },
  { path: '/business_transition', template: 'business-transition.html' },
  { path: '/key_employee_insurance_plans', template: 'key-employee.html' },
  { path: '/qualified_plans', template: 'qualified.html' },
  { path: '/executive_bonus_plans', template: 'executive.html' },
  { path: '/mblog', template: 'blog.html' },
  { path: '/team', template: 'team.html' },
  { path: '/FAQs', template: 'FAQS.html' },
  { path: '/pricing', template: 'pricing.html' },
  { path: '/testimonial', template: 'testimonials.html' },
  { path: '/blog_single', template: 'blog-single.html' },
  { path: '/portfolio_det', template: 'portfolio-details.html' },
]

// Consolidated URL mapping for Flask url_for replacement
const URL_FOR_MAP = {
  home: '/',
  contact: '/contact_us',
  faqs: '/FAQs',
  life_insurance: '/life_insurance',
  retirement_benefits: '/retirement-benefits',
  living_benefits: '/living-benefits',
  long_term: '/long-term',
  ira: '/IRA',
  annuity: '/annuity',
  dental_cover: '/dental-cover',
  medical_cover: '/medical-cover',
  disability_cover: '/disability-cover',
  college: '/college_funding',
  business_continuation: '/business_continuation',
  business_transition: '/business_transition',
  key_plans: '/key_employee_insurance_plans',
  income_rider: '/qualified_plans',
  executive: '/executive_bonus_plans',
  mblog: '/mblog',
  about: '/about_us',
  team: '/team',
  testimonials: '/testimonial',
  services: '/mservices',
  portfolio: '/mportfolio',
  pricing: '/pricing',
  blog: '/mblog',
  blog_single: '/blog_single',
  portfolio_details: '/portfolio_det'
}

// Helper function to process HTML template content
function processTemplateHtml(src) {
  const bodyMatch = src.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyOnly = bodyMatch ? bodyMatch[1] : src
  const withoutHeader = bodyOnly.replace(/<header[^>]*id=\"header\"[\s\S]*?<\/header>/i, '')
  const withoutFooter = withoutHeader.replace(/<footer[^>]*id=\"footer\"[\s\S]*?<\/footer>/i, '')
  const mainMatch = withoutFooter.match(/<main[^>]*id=\"main\"[^>]*>([\s\S]*?)<\/main>/i)
  const mainInner = mainMatch ? mainMatch[1] : withoutFooter
  const normalizedAssets = mainInner
    .replace(/(href|src)=(\"|\')(?!https?:\/\/)(?:\.\/)?static\//g, '$1=$2/static/')
  const withoutScripts = normalizedAssets.replace(/<script[\s\S]*?<\/script>/gi, '')
  
  // Replace Flask url_for(...) with SPA routes
  const sanitized = withoutScripts
    .replace(/\{\{\s*url_for\(\s*['\"]([^'\"]+)['\"]\s*\)\s*\}\}/g, (m, p1) => URL_FOR_MAP[p1] || '#')
    .replace(/\{\%.*?\%\}/gs, '')
  
  return sanitized
}

// Helper function to setup carousel indicators
function setupCarouselIndicators(target) {
  const carousels = target.querySelectorAll('.carousel')
  carousels.forEach(carousel => {
    const indicators = carousel.querySelector('.carousel-indicators')
    const items = carousel.querySelectorAll('.carousel-item')
    if (indicators && items.length && indicators.children.length < items.length) {
      indicators.innerHTML = ''
      items.forEach((_, idx) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.setAttribute('data-bs-target', `#${carousel.id || 'heroCarousel'}`)
        btn.setAttribute('data-bs-slide-to', idx)
        if (idx === 0) {
          btn.className = 'active'
          btn.setAttribute('aria-current', 'true')
        }
        btn.setAttribute('aria-label', `Slide ${idx + 1}`)
        indicators.appendChild(btn)
      })
    }
  })
}

// Helper function to setup EmailJS form handlers
function setupEmailjsHandler(target) {
  const form = target.querySelector('form.php-email-form')
  if (!form) return

  const loadingEl = form.querySelector('.loading')
  const errorEl = form.querySelector('.error-message')
  const sentEl = form.querySelector('.sent-message')
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_faithful'
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'QLU1WdJ4iCNt22T7k'
  const templateIds = (import.meta.env.VITE_EMAILJS_TEMPLATE_IDS || 'template_fka6k4q,template_m4kn7a5')
    .split(',').map(s => s.trim()).filter(Boolean)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (loadingEl) loadingEl.style.display = 'block'
    if (errorEl) errorEl.style.display = 'none'
    if (sentEl) sentEl.style.display = 'none'

    const fd = new FormData(form)
    const name = (fd.get('name') || '').toString()
    const email = (fd.get('email') || '').toString()
    const phone = (fd.get('number') || '').toString()
    const message = (fd.get('message') || '').toString()
    const policy = (fd.get('policy') || '').toString()

    const params = { name, from_name: name, email, from_email: email, reply_to: email, phone, policy, message }

    try {
      await Promise.all(templateIds.map(tid => emailjs.send(serviceId, tid, params, publicKey)))
      if (sentEl) sentEl.style.display = 'block'
      form.reset()
    } catch (err) {
      if (errorEl) errorEl.textContent = 'Failed to send. Please try again.'
      if (errorEl) errorEl.style.display = 'block'
      console.error('EmailJS error', err)
    } finally {
      if (loadingEl) loadingEl.style.display = 'none'
    }
  }

  form.addEventListener('submit', submitHandler)
}

// Helper function to finalize template injection
function finalizeTemplateInjection(target) {
  setupCarouselIndicators(target)
  setupEmailjsHandler(target)
  window.dispatchEvent(new Event('load'))
}

function StaticHtmlPage({ file }) {
  useScrollTop()
  useEffect(() => { window.dispatchEvent(new Event('load')) }, [file])
  return (
    <div className="container py-4" role="main">
      <div data-static-html data-file={file}></div>
      <ReloadMainScript />
    </div>
  )
}

function useInjectHtml(file) {
  useEffect(() => {
    const target = document.querySelector('[data-static-html]')
    if (!target) return
    
    target.innerHTML = ''
    
    // Try to load template from local raw imports first
    const localRaw = getRawTemplate(file)
    if (localRaw) {
      const processedHtml = processTemplateHtml(localRaw)
      target.innerHTML = processedHtml
      finalizeTemplateInjection(target)
      return
    }

    // Fallback: try to fetch from staticized endpoint, then templates endpoint
    fetch(`/staticized/${file}`)
      .then(async res => {
        if (!res.ok) throw new Error('Missing staticized page: ' + file)
        const html = await res.text()
        target.innerHTML = html
        window.dispatchEvent(new Event('load'))
      })
      .catch(() => {
        fetch(`/templates/${file}`)
          .then(r => r.text())
          .then(src => {
            const processedHtml = processTemplateHtml(src)
            target.innerHTML = processedHtml
            finalizeTemplateInjection(target)
          })
          .catch(err => {
            console.error('Failed to load template', file, err)
            target.innerHTML = '<div class="alert alert-warning">Content failed to load.</div>'
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
