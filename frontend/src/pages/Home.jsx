import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  useEffect(() => { window.dispatchEvent(new Event('load')) }, [])
  return (
    <>
      <main id="main">
        {/* About section (matches templates/index.html order) */}
        <section id="about" className="about">
          <div className="container-fluid">
            <div className="row content">
              <div className="col-lg-6 medium text-center">
                <h2>Faithful insurance</h2>
                <h3>Your Life Insurance Partner</h3>
                <img id="maina" src="/static/assets/img/insurance/Faith_profile.jpeg" className="img-fluid" alt="Faith Maina" />
                <p><em>Dr. Faith Maina, Head FaithFul Insurance</em></p>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0">
                <p>
                  Welcome to <b><em>Faithful insurance</em></b>, we're an agency that is here to make a difference in the insurance industry. We are a team of passionate, dedicated and experienced professionals who specialize in life, health and long term care insurance.
                </p>
                <p>
                  We know that life, health and long term care insurance can be complex, costly and sometimes stressful, so we are here to simplify it for you. At Faithful insurance, we are not just selling insurance, we are building relationships.
                  <br />
                  We are here to protect what matters most to you, and to help you achieve your goals and dreams. Some of our policies include:
                </p>
                <ul>
                  <li><i className="ri-check-double-line"></i> Life insurance that pays off when you're around and takes care of your family</li>
                  <li><i className="ri-check-double-line"></i> Health Insurance, Long-term care and children policies</li>
                  <li><i className="ri-check-double-line"></i> College funding</li>
                </ul>
                <p className="fst-italic">
                  Whether you are looking for personal or business insurance, we have the right solution for you. Contact us today and let us show you how we can make a difference in your life. We look forward to hearing from you soon!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero section (background images controlled in home.css via .slide-* classes) */}
        <section id="hero">
          <div id="heroCarousel" data-bs-interval="5000" className="carousel slide carousel-fade" data-bs-ride="carousel">

            <ol className="carousel-indicators" id="hero-carousel-indicators"></ol>

            <div className="carousel-inner" role="listbox">

              <div className="carousel-item active slide-1">
                <div className="carousel-container">
                  <div className="container">
                    <h2 className="animate__animated animate__fadeInDown">Welcome to <span>Faithful insurance</span></h2>
                    <p className="animate__animated animate__fadeInUp"> Your trusted Insurance partner</p>
                    <Link to="/contact_us" className="btn-get-started animate__animated animate__fadeInUp scrollto">Get in touch</Link>
                  </div>
                </div>
              </div>

              <div className="carousel-item slide-2">
                <div className="carousel-container">
                  <div className="container">
                    <h2 className="animate__animated animate__fadeInDown">Medical Coverage</h2>
                    <p className="animate__animated animate__fadeInUp">Enjoy medical benefits with flexible packages for yourself, family, groups and the self-employed.</p>
                    <Link to="/medical-cover" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</Link>
                  </div>
                </div>
              </div>

              <div className="carousel-item slide-3">
                <div className="carousel-container">
                  <div className="container">
                    <h2 className="animate__animated animate__fadeInDown">Business Policies</h2>
                    <p className="animate__animated animate__fadeInUp">Our ultimate goal is to help employers like you assist your employees in becoming financially independent for tomorrow.</p>
                    <Link to="/key_employee_insurance_plans" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</Link>
                  </div>
                </div>
              </div>

              <div className="carousel-item slide-4">
                <div className="carousel-container">
                  <div className="container">
                    <h2 className="animate__animated animate__fadeInDown">College Funding</h2>
                    <p className="animate__animated animate__fadeInUp">There are many ways to save for college. Permanent life insurance can accumulate cash value that may be accessed for college expenses.</p>
                    <Link to="/college_funding" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</Link>
                  </div>
                </div>
              </div>

            </div>

            <a className="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>

            <a className="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>

          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="clients section-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6 d-flex align-items-center justify-content-center">
                <img src="/static/assets/img/favicon.ico" className="img-fluid" alt="" />
              </div>

              <div className="col-lg-6 col-md-6 col-6 d-flex align-items-center justify-content-center">
                <img src="/static/assets/img/clients/image002.jpeg" className="img-fluid" alt="" />
              </div>

            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="services">
          <div className="container">

            <div className="row">
              <div className="col-md-6">
                <div className="icon-box">
                  <i className="bi bi-briefcase"></i>
                  <h4><Link to="/life_insurance">Life Insurance</Link></h4>
                  <p>There are many types of life insurance. Term insurance only provides a death benefit for a limited period of time. By contrast permanent insurance can provide a death benefit and the potential to build policy cash value that you can access during your lifetime using policy loans and withdrawals*</p>
                </div>
              </div>
              <div className="col-md-6 mt-4 mt-md-0">
                <div className="icon-box">
                  <i className="bi bi-card-checklist"></i>
                  <h4><Link to="/annuity">Annuities</Link></h4>
                  <p>An annuity allows a customer to deposit money (premiums) with an insurance company that can earn interest and grow on a tax-deferred basis with the agreement that the insurance company will then provide a series of payments back to the customer at regular intervals.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  )
}
