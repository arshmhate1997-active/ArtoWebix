const { useState, useEffect, useRef } = React;

/* =========================================================
   ICON COMPONENT
   ========================================================= */

function Icon({ name, size = 20, strokeWidth = 2, className = "" }) {
  const iconRef = useRef(null);

  // Social SVGs fallback for icons removed from Lucide
  if (name === "instagram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "inline-flex" }}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "inline-flex" }}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth,
          class: className
        }
      });
    }
  }, [name, size, strokeWidth, className]);

  return (
    <i
      ref={iconRef}
      data-lucide={name}
      style={{
        width: size,
        height: size,
        display: "inline-flex"
      }}
    />
  );
}

/* =========================================================
   SCROLL REVEAL COMPONENT
   ========================================================= */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Process", href: "#process" },
    { label: "FAQs", href: "#faqs" }
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo">
          <span className="logo-mark">A</span>
          <span>ArtoWebix</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Let's Talk
          </a>
        </nav>

        <button
          className="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "x" : "menu"} size={24} />
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-container">
        <Reveal className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Websites built for local businesses
          </div>

          <h1>
            Your business deserves
            <span> a website that sells.</span>
          </h1>

          <p className="hero-description">
            Premium, interactive websites designed to make local businesses look
            professional, attract more customers and grow online.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Start Your Website
              <Icon name="arrow-up-right" size={18} />
            </a>

            <a href="#services" className="btn btn-secondary">
              Explore Services
              <Icon name="arrow-down" size={18} />
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <Icon name="check-circle" size={18} />
              Mobile Friendly
            </div>
            <div className="trust-item">
              <Icon name="zap" size={18} />
              Fast & Modern
            </div>
            <div className="trust-item">
              <Icon name="sparkles" size={18} />
              Premium Design
            </div>
          </div>
        </Reveal>

        <Reveal className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-top">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="browser-url">artowebix.com</div>
              <Icon name="more-horizontal" size={18} />
            </div>

            <div className="hero-card-content">
              <div className="hero-mini-label">YOUR ONLINE PRESENCE</div>
              <h3>
                Make your first
                <span> impression count.</span>
              </h3>
              <p>A modern website that works for your business 24/7.</p>

              <div className="hero-mini-buttons">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-floating-card hero-floating-one">
                <Icon name="users" size={18} />
                <div>
                  <strong>+48%</strong>
                  <small>More engagement</small>
                </div>
              </div>

              <div className="hero-floating-card hero-floating-two">
                <Icon name="trending-up" size={18} />
                <div>
                  <strong>24/7</strong>
                  <small>Your business online</small>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   MARQUEE
   ========================================================= */

function Marquee() {
  const items = [
    "LOCAL BUSINESSES",
    "CAFÉS",
    "RESTAURANTS",
    "SALONS",
    "CLINICS",
    "RETAIL STORES",
    "FITNESS BRANDS",
    "CONSULTANTS"
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <div className="marquee-item" key={index}>
            <span>{item}</span>
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SERVICES
   ========================================================= */

function Services() {
  const [flipped, setFlipped] = useState(null);

  const servicesData = [
    {
      icon: "store",
      number: "01",
      title: "Retail Stores",
      description:
        "Showcase your products, offers and store experience with a website that makes customers want to visit.",
      features: [
        "Product showcase",
        "Store information",
        "Offers & promotions",
        "WhatsApp enquiries"
      ]
    },
    {
      icon: "coffee",
      number: "02",
      title: "Cafés & Restaurants",
      description:
        "Turn hungry visitors into customers with beautiful menus, location details and easy contact options.",
      features: [
        "Digital menu",
        "Food gallery",
        "Location & timings",
        "Reservation enquiries"
      ]
    },
    {
      icon: "activity",
      number: "03",
      title: "Doctors & Clinics",
      description:
        "Build trust before patients walk through your door with a professional healthcare website.",
      features: [
        "Doctor profile",
        "Services",
        "Clinic information",
        "Appointment enquiries"
      ]
    },
    {
      icon: "scissors",
      number: "04",
      title: "Salons & Studios",
      description:
        "Show your work, services and personality with a website that makes clients excited to book.",
      features: [
        "Service menu",
        "Photo gallery",
        "Pricing",
        "Booking enquiries"
      ]
    },
    {
      icon: "dumbbell",
      number: "05",
      title: "Fitness Brands",
      description:
        "Create an energetic online presence that motivates visitors to take the first step.",
      features: [
        "Programs",
        "Trainer profiles",
        "Membership details",
        "Lead generation"
      ]
    },
    {
      icon: "briefcase",
      number: "06",
      title: "Consultants",
      description:
        "Position your expertise professionally and turn website visitors into valuable enquiries.",
      features: [
        "Personal branding",
        "Services",
        "Testimonials",
        "Lead generation"
      ]
    }
  ];

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">WHO WE BUILD FOR</span>
          <h2>
            Your business.
            <span> Your style.</span>
            {" "}Your website.
          </h2>
          <p>Every business is different. Your website should be too.</p>
        </Reveal>

        <div className="services-grid">
          {servicesData.map((service, index) => {
            const isFlipped = flipped === index;

            return (
              <Reveal
                className={`service-card-wrapper ${isFlipped ? "flipped" : ""}`}
                key={service.title}
              >
                <div
                  className="service-card"
                  onClick={() => setFlipped(isFlipped ? null : index)}
                >
                  <div className="service-card-inner">
                    <div className="service-card-front">
                      <div className="service-card-top">
                        <div className="service-icon">
                          <Icon name={service.icon} size={24} />
                        </div>
                        <span className="service-number">{service.number}</span>
                      </div>

                      <div className="service-card-middle">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>

                      <div className="service-card-bottom">
                        <span>Hover or tap to explore</span>
                        <Icon name="arrow-right" size={18} />
                      </div>
                    </div>

                    <div className="service-card-back">
                      <div className="service-back-icon">
                        <Icon name={service.icon} size={28} />
                      </div>

                      <h3>{service.title}</h3>
                      <p>Everything you need to build a strong online presence.</p>

                      <ul>
                        {service.features.map((feature) => (
                          <li key={feature}>
                            <Icon name="check" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <a href="#contact" className="service-back-link">
                        Get Started
                        <Icon name="arrow-up-right" size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE
   ========================================================= */

function Experience() {
  const [showMore, setShowMore] = useState(false);

  const features = [
    {
      icon: "smartphone",
      title: "Mobile First",
      text: "Looks great on every phone, tablet and desktop."
    },
    {
      icon: "zap",
      title: "Fast Loading",
      text: "Optimized experiences that keep visitors engaged."
    },
    {
      icon: "search",
      title: "SEO Ready",
      text: "Built with search visibility in mind."
    },
    {
      icon: "message-circle",
      title: "WhatsApp Integration",
      text: "Let customers contact you instantly."
    },
    {
      icon: "map-pin",
      title: "Google Maps",
      text: "Make it easy for customers to find you."
    },
    {
      icon: "image",
      title: "Premium Galleries",
      text: "Show your products, work and brand beautifully."
    },
    {
      icon: "shield-check",
      title: "Secure",
      text: "Modern development practices for a safer website."
    },
    {
      icon: "mouse-pointer",
      title: "Interactive",
      text: "Animations and interactions that keep visitors engaged."
    },
    {
      icon: "heart",
      title: "User Friendly",
      text: "Simple experiences your customers understand."
    },
    {
      icon: "activity",
      title: "Conversion Focused",
      text: "Designed to turn attention into enquiries."
    },
    {
      icon: "briefcase",
      title: "Professional",
      text: "A website that builds credibility for your brand."
    },
    {
      icon: "refresh-cw",
      title: "Easy Updates",
      text: "Keep your content fresh as your business grows."
    }
  ];

  const visibleFeatures = showMore ? features : features.slice(0, 6);

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <Reveal className="section-heading light-heading">
          <span className="section-label">BUILT FOR RESULTS</span>
          <h2>
            More than a website.
            <span> An experience.</span>
          </h2>
          <p>
            We combine clean design, smooth interactions and smart features to
            create websites people remember.
          </p>
        </Reveal>

        <div className="features-grid">
          {visibleFeatures.map((feature) => (
            <Reveal className="feature-card" key={feature.title}>
              <div className="feature-icon">
                <Icon name={feature.icon} size={22} />
              </div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="experience-more">
          <button
            className="text-button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show fewer features" : "Explore more features (+6)"}
            <Icon
              name={showMore ? "chevron-up" : "chevron-down"}
              size={18}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS
   ========================================================= */

function Process() {
  const steps = [
    {
      number: "01",
      icon: "message-square",
      title: "Tell us about your business",
      text: "We learn about your business, customers, goals and what makes you different."
    },
    {
      number: "02",
      icon: "palette",
      title: "We design your experience",
      text: "We create a modern visual direction and website structure around your brand."
    },
    {
      number: "03",
      icon: "rocket",
      title: "Launch & grow",
      text: "Your website goes live and becomes a powerful part of your business."
    }
  ];

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">HOW IT WORKS</span>
          <h2>
            Simple process.
            <span> Powerful result.</span>
          </h2>
          <p>
            No complicated process. Just a clear path from idea to a
            professional online presence.
          </p>
        </Reveal>

        <div className="process-grid">
          {steps.map((step) => (
            <Reveal className="process-card" key={step.number}>
              <div className="process-number">{step.number}</div>
              <div className="process-icon">
                <Icon name={step.icon} size={24} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT CTA
   ========================================================= */

function ContactCTA() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <Reveal className="contact-card">
          <div className="contact-glow contact-glow-one"></div>
          <div className="contact-glow contact-glow-two"></div>

          <div className="contact-content">
            <span className="section-label">READY WHEN YOU ARE</span>
            <h2>
              Let's build something
              <span> your customers remember.</span>
            </h2>
            <p>
              Tell us about your business and let's create a website that makes
              your brand stand out.
            </p>

            <div className="contact-buttons">
              <a
                href="https://wa.me/918169292390"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Icon name="message-circle" size={19} />
                WhatsApp Us
              </a>

              <a
                href="mailto:namaste@artowebix.com"
                className="btn btn-secondary"
              >
                <Icon name="mail" size={19} />
                Send Email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
   ========================================================= */

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "How much does a website cost?",
      answer:
        "Every website is different. The cost depends on the number of pages, features, design complexity and business requirements."
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "Most business websites can be designed and developed within a few days to a few weeks depending on the project."
    },
    {
      question: "Will my website work on mobile phones?",
      answer:
        "Yes. Every website is designed to be responsive and optimized for mobile, tablet and desktop screens."
    },
    {
      question: "Can you add WhatsApp to my website?",
      answer:
        "Yes. We can add WhatsApp buttons so customers can contact your business directly from your website."
    },
    {
      question: "Can you help with the website content?",
      answer:
        "Yes. We can help structure your content and present your services, products and business information clearly."
    },
    {
      question: "Will my website appear on Google?",
      answer:
        "Your website can be built with SEO-friendly structure and technical best practices. Search ranking itself depends on many factors."
    },
    {
      question: "Can you connect Google Maps?",
      answer:
        "Yes. We can integrate Google Maps so customers can easily find your business location."
    },
    {
      question: "Can I update my menu, prices, or photos later on?",
      answer:
        "Yes. Depending on your setup, your website can be structured so content can be updated as your business changes."
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. We can modernize an existing website while improving its design, usability and mobile experience."
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us on WhatsApp or email and tell us a little about your business. We will take it from there."
    }
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="section faq-section" id="faqs">
      <div className="container faq-container">
        <Reveal className="section-heading">
          <span className="section-label">QUESTIONS</span>
          <h2>
            Frequently asked
            <span> questions.</span>
          </h2>
        </Reveal>

        <Reveal className="faq-list">
          {visibleFaqs.map((faq) => {
            const actualIndex = faqs.indexOf(faq);
            const isOpen = openIndex === actualIndex;

            return (
              <div
                className={`faq-item ${isOpen ? "active" : ""}`}
                key={faq.question}
              >
                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : actualIndex)
                  }
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    <Icon name={isOpen ? "minus" : "plus"} size={18} />
                  </span>
                </button>

                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isOpen ? "240px" : "0px"
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="faq-more">
          <button
            className="text-button"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show fewer questions" : "View all questions"}
            <Icon
              name={showAll ? "chevron-up" : "chevron-down"}
              size={18}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-mark">A</span>
              <span>ArtoWebix</span>
            </a>
            <p>Premium websites for modern local businesses.</p>
            <div className="footer-socials">
              <a
                href="https://instagram.com/artowebix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href="https://linkedin.com/company/artowebix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                href="https://wa.me/918169292390"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-btn"
              >
                <Icon name="message-circle" size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#experience">Experience</a>
              <a href="#process">Process</a>
              <a href="#faqs">FAQs</a>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <a href="#services">Retail Stores</a>
              <a href="#services">Cafés & Restaurants</a>
              <a href="#services">Doctors & Clinics</a>
              <a href="#services">Salons & Studios</a>
              <a href="#services">Fitness Brands</a>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <a href="tel:+918169292390">+91 81692 92390</a>
              <a href="mailto:namaste@artowebix.com">namaste@artowebix.com</a>
              <span>Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ArtoWebix. All rights reserved.</p>
          <a href="#home" className="back-to-top">
            Back to top
            <Icon name="arrow-up" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Experience />
        <Process />
        <ContactCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

/* =========================================================
   RENDER
   ========================================================= */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
