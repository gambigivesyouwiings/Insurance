import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import emailjs from '@emailjs/browser'
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
    const localRaw = getRawTemplate(file)
    if (localRaw) {
      const src = localRaw
      const bodyMatch = src.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      const bodyOnly = bodyMatch ? bodyMatch[1] : src
      const withoutHeader = bodyOnly.replace(/<header[^>]*id=\"header\"[\s\S]*?<\/header>/i, '')
      const withoutFooter = withoutHeader.replace(/<footer[^>]*id=\"footer\"[\s\S]*?<\/footer>/i, '')
      const mainMatch = withoutFooter.match(/<main[^>]*id=\"main\"[^>]*>([\s\S]*?)<\/main>/i)
      const mainInner = mainMatch ? mainMatch[1] : withoutFooter
      const normalizedAssets = mainInner
        .replace(/(href|src)=(\"|\')(?!https?:\/\/)(?:\.\/)?static\//g, '$1=$2/static/')
      const withoutScripts = normalizedAssets.replace(/<script[\s\S]*?<\/script>/gi, '')
      const sanitized = withoutScripts
        .replace(/\{\{\s*url_for\(.*?\)\s*\}\}/g, '#')
        .replace(/\{\%.*?\%\}/gs, '')
      target.innerHTML = sanitized
      // Attach EmailJS handler if contact form exists
      const formA = target.querySelector('form.php-email-form')
      if (formA) {
        const loadingEl = formA.querySelector('.loading')
        const errorEl = formA.querySelector('.error-message')
        const sentEl = formA.querySelector('.sent-message')
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_faithful'
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'QLU1WdJ4iCNt22T7k'
        const templateIds = (import.meta.env.VITE_EMAILJS_TEMPLATE_IDS || 'template_fka6k4q,template_m4kn7a5')
          .split(',').map(s => s.trim()).filter(Boolean)

        const submitHandler = async (e) => {
          e.preventDefault()
          if (loadingEl) loadingEl.style.display = 'block'
          if (errorEl) errorEl.style.display = 'none'
          if (sentEl) sentEl.style.display = 'none'

          const fd = new FormData(formA)
          const name = (fd.get('name') || '').toString()
          const email = (fd.get('email') || '').toString()
          const phone = (fd.get('number') || '').toString()
          const message = (fd.get('message') || '').toString()
          const policy = (fd.get('policy') || '').toString()

          const params = { name, from_name: name, email, from_email: email, reply_to: email, phone, policy, message }

          try {
            await Promise.all(templateIds.map(tid => emailjs.send(serviceId, tid, params, publicKey)))
            if (sentEl) sentEl.style.display = 'block'
            formA.reset()
          } catch (err) {
            if (errorEl) errorEl.textContent = 'Failed to send. Please try again.'
            if (errorEl) errorEl.style.display = 'block'
            console.error('EmailJS error', err)
          } finally {
            if (loadingEl) loadingEl.style.display = 'none'
          }
        }

        formA.addEventListener('submit', submitHandler)
      }

      window.dispatchEvent(new Event('load'))
      return
    }

    fetch(`/staticized/${file}`).then(async res => {
      if (!res.ok) throw new Error('Missing staticized page: ' + file)
      const html = await res.text()
      target.innerHTML = html
      window.dispatchEvent(new Event('load'))
    }).catch(() => {
      fetch(`/templates/${file}`).then(r => r.text()).then(src => {
        const bodyMatch = src.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
        const bodyOnly = bodyMatch ? bodyMatch[1] : src
        const withoutHeader = bodyOnly.replace(/<header[^>]*id=\"header\"[\s\S]*?<\/header>/i, '')
        const withoutFooter = withoutHeader.replace(/<footer[^>]*id=\"footer\"[\s\S]*?<\/footer>/i, '')
        const mainMatch = withoutFooter.match(/<main[^>]*id=\"main\"[^>]*>([\s\S]*?)<\/main>/i)
        const mainInner = mainMatch ? mainMatch[1] : withoutFooter
        const normalizedAssets = mainInner
          .replace(/(href|src)=(\"|\')(?!https?:\/\/)(?:\.\/)?static\//g, '$1=$2/static/')
        const withoutScripts = normalizedAssets.replace(/<script[\s\S]*?<\/script>/gi, '')
        const sanitized = withoutScripts
          .replace(/\{\{\s*url_for\(.*?\)\s*\}\}/g, '#')
          .replace(/\{\%.*?\%\}/gs, '')
        target.innerHTML = sanitized
        // Attach EmailJS handler if contact form exists
        const formB = target.querySelector('form.php-email-form')
        if (formB) {
          const loadingEl = formB.querySelector('.loading')
          const errorEl = formB.querySelector('.error-message')
          const sentEl = formB.querySelector('.sent-message')
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_faithful'
          const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'QLU1WdJ4iCNt22T7k'
          const templateIds = (import.meta.env.VITE_EMAILJS_TEMPLATE_IDS || 'template_fka6k4q,template_m4kn7a5')
            .split(',').map(s => s.trim()).filter(Boolean)

          const submitHandler = async (e) => {
            e.preventDefault()
            if (loadingEl) loadingEl.style.display = 'block'
            if (errorEl) errorEl.style.display = 'none'
            if (sentEl) sentEl.style.display = 'none'

            const fd = new FormData(formB)
            const name = (fd.get('name') || '').toString()
            const email = (fd.get('email') || '').toString()
            const phone = (fd.get('number') || '').toString()
            const message = (fd.get('message') || '').toString()
            const policy = (fd.get('policy') || '').toString()

            const params = { name, from_name: name, email, from_email: email, reply_to: email, phone, policy, message }

            try {
              await Promise.all(templateIds.map(tid => emailjs.send(serviceId, tid, params, publicKey)))
              if (sentEl) sentEl.style.display = 'block'
              formB.reset()
            } catch (err) {
              if (errorEl) errorEl.textContent = 'Failed to send. Please try again.'
              if (errorEl) errorEl.style.display = 'block'
              console.error('EmailJS error', err)
            } finally {
              if (loadingEl) loadingEl.style.display = 'none'
            }
          }

          formB.addEventListener('submit', submitHandler)
        }

        window.dispatchEvent(new Event('load'))
      }).catch(err => {
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
