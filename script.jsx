const { useState, useEffect, useRef } = React;

/* =========================================================
   ICON COMPONENT WITH NATIVE BRAND SVG FALLBACKS
   ========================================================= */

function Icon({ name, size = 18, className = "" }) {
  const iconRef = useRef(null);

  if (name === "instagram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "inline-flex", verticalAlign: "middle" }}
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "inline-flex", verticalAlign: "middle" }}
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
        attrs: { class: `lucide lucide-${name} ${className}` },
        nameAttr: "data-lucide"
      });
    }
  }, [name, className]);

  return (
    <i
      ref={iconRef}
      data-lucide={name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle"
      }}
    />
  );
}

/* =========================================================
   SCROLL REVEAL COMPONENT
   ========================================================= */

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-symbol">
            <span></span>
            <b>✦</b>
          </span>
          <span className="brand-name">
            Arto<span>Webix</span>
          </span>
        </a>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
          <a href="#process" onClick={() => setOpen(false)}>Process</a>
          <a href="#faqs" onClick={() => setOpen(false)}>FAQs</a>

          <a
            className="nav-contact"
            href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noreferrer"
          >
            <span className="online-dot"></span>
            Let's Talk
            <Icon name="arrow-up-right" size={15} />
          </a>
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          type="button"
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-orb orb-one"></div>
      <div className="hero-orb orb-two"></div>
      <div className="hero-orb orb-three"></div>
      <div className="grid-overlay"></div>

      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-pulse"></span>
            Websites built to get attention
          </div>

          <h1>
            Your business deserves more than a basic website.
            <span className="gradient-text">
              It deserves a digital experience.
            </span>
          </h1>

          <p>
            We create modern, interactive websites for local businesses that want to look professional, build trust and turn visitors into real enquiries.
          </p>

          <div className="hero-actions">
            <a href="#experience" className="btn-primary magnetic-button">
              Explore the experience
              <Icon name="arrow-right" size={17} />
            </a>

            <a
              href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20would%20like%20to%20discuss%20a%20website."
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Start a conversation
              <Icon name="message-circle" size={17} />
            </a>
          </div>

          <div className="stats-row">
            <div className="stat"><strong>48H</strong><span>First concept</span></div>
            <div className="stat"><strong>100%</strong><span>Responsive</span></div>
            <div className="stat"><strong>24/7</strong><span>Online presence</span></div>
            <div className="stat"><strong>1-Tap</strong><span>Customer contact</span></div>
          </div>
        </Reveal>

        <Reveal className="hero-visual">
          <div className="visual-glow"></div>
          <div className="browser-window">
            <div className="browser-top">
              <div className="browser-dots"><span></span><span></span><span></span></div>
              <div className="browser-address">artowebix.com</div>
              <Icon name="lock" size={14} />
            </div>

            <div className="website-preview">
              <div className="preview-nav">
                <strong>YOUR BRAND</strong>
                <div><span></span><span></span><span></span></div>
              </div>

              <div className="preview-content">
                <div className="preview-tag">✦ Welcome to your new website</div>
                <h3>Make your <span>first impression</span> unforgettable.</h3>
                <p>Beautiful design. Clear messaging. Real customer actions.</p>
                <div className="preview-buttons">
                  <span>Explore</span>
                  <span>Contact</span>
                </div>
              </div>

              <div className="preview-floating preview-one">
                <Icon name="message-circle" size={15} />
                <span>New enquiry</span>
                <b>+1</b>
              </div>
              <div className="preview-floating preview-two">
                <Icon name="star" size={15} />
                <span>5.0</span>
              </div>
              <div className="preview-floating preview-three">
                <Icon name="map-pin" size={15} />
                <span>Nearby customers</span>
              </div>
              <div className="preview-cursor">
                <Icon name="mouse-pointer" size={22} />
              </div>
            </div>
          </div>

          <div className="floating-badge badge-a"><span>⚡</span> Fast & modern</div>
          <div className="floating-badge badge-b"><span>📱</span> Mobile ready</div>
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
    "Interactive design", "Mobile-first", "WhatsApp enquiries",
    "Google Maps", "Fast websites", "Local businesses", "Premium visuals"
  ];
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((text, idx) => (
          <div className="marquee-item" key={idx}>
            <span>✦</span>{text}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SERVICES
   ========================================================= */

function Services() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const servicesData = [
    {
      badge: "Retail",
      num: "01 / RETAIL",
      icon: "store",
      title: "Local Stores",
      desc: "Turn your products, offers and brand story into a beautiful online storefront.",
      backHeadline: "Turn browsers into buyers",
      backDesc: "Give your retail store a strong digital presence that helps customers discover what you sell and why they should visit.",
      points: ["Product Showcase", "Offers & Promotions", "Store Information"],
      accent: "accent-blue"
    },
    {
      badge: "Food",
      num: "02 / FOOD",
      icon: "coffee",
      title: "Cafés & Restaurants",
      desc: "Menus, galleries, locations and WhatsApp enquiries designed around hungry customers.",
      backHeadline: "Make mouths water online",
      backDesc: "Drive hungry patrons directly through your doors with dynamic digital menus and instant table bookings.",
      points: ["Digital Menu", "Table Booking", "Direct Order Flow"],
      accent: "accent-coral"
    },
    {
      badge: "Healthcare",
      num: "03 / HEALTHCARE",
      icon: "activity",
      title: "Doctors & Clinics",
      desc: "Build trust with clean service pages, timings, location and easy appointment enquiries.",
      backHeadline: "Trust begins at first click",
      backDesc: "Present clinical credibility and simplify patient scheduling with accessible service breakdowns.",
      points: ["Instant Booking", "Doctor Profiles", "Timings & Map"],
      accent: "accent-cyan"
    },
    {
      badge: "Beauty",
      num: "04 / BEAUTY",
      icon: "scissors",
      title: "Salons & Studios",
      desc: "Showcase your work, services, packages and transformations in a premium experience.",
      backHeadline: "Make your brand look beautiful",
      backDesc: "Turn your salon into a digital experience that feels as premium as the services you deliver.",
      points: ["Service Menu", "Transformation Gallery", "1-Tap Booking"],
      accent: "accent-purple"
    },
    {
      badge: "Professionals",
      num: "05 / PROFESSIONALS",
      icon: "briefcase",
      title: "Consultants",
      desc: "Turn your expertise and credibility into a website that makes clients want to talk.",
      backHeadline: "High-authority positioning",
      backDesc: "Establish instant market authority and qualify high-value leads with bespoke portfolio pages.",
      points: ["Client Testimonials", "Case Studies", "Consultation Forms"],
      accent: "accent-violet"
    },
    {
      badge: "Lifestyle",
      num: "06 / LIFESTYLE",
      icon: "dumbbell",
      title: "Fitness Brands",
      desc: "Show classes, trainers, transformations and plans with energetic interactive design.",
      backHeadline: "Inspire action & signups",
      backDesc: "Motivate memberships with high-energy visuals, timetable calendars, and class registrations.",
      points: ["Class Timetable", "Trainer Spotlights", "Trial Signups"],
      accent: "accent-blue"
    }
  ];

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">WHO WE BUILD FOR</span>
          <h2>Your business.<span> Your style.</span> Your website.</h2>
          <p>We design around your customers, your personality and the way your business actually works.</p>
        </Reveal>

        <div className="business-grid">
          {servicesData.map((card, idx) => (
            <Reveal key={idx}>
              <div 
                className={`business-card ${card.accent} ${flippedIndex === idx ? "is-flipped" : ""}`}
                onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
              >
                <div className="business-card-inner">
                  <div className="business-card-front">
                    <div className="card-top">
                      <span className="business-badge">{card.badge}</span>
                      <div className="business-icon"><Icon name={card.icon} size={22} /></div>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <div className="card-link">
                      <span>Hover or tap to explore</span>
                      <Icon name="arrow-up-right" size={16} />
                    </div>
                    <div className="card-shine"></div>
                  </div>

                  <div className="business-card-back">
                    <div>
                      <div className="card-top">
                        <span className="business-badge-gold">{card.num}</span>
                        <div className="back-icon-mini">✦</div>
                      </div>
                      <h4 className="back-tagline">{card.backHeadline}</h4>
                      <p className="back-desc">{card.backDesc}</p>
                      <ul className="back-feature-list">
                        {card.points.map((pt, pIdx) => (
                          <li key={pIdx}><span>✓</span> {pt}</li>
                        ))}
                      </ul>
                    </div>
                    <a 
                      href={`https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20${encodeURIComponent(card.title)}.`}
                      target="_blank" 
                      rel="noreferrer"
                      className="card-back-cta"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore this package</span>
                      <Icon name="arrow-right" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE SECTION
   ========================================================= */

function Experience() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const featureItems = [
    { icon: "smartphone", title: "Mobile-first", text: "Looks and feels native on every smartphone, tablet, and desktop display." },
    { icon: "message-circle", title: "WhatsApp Ready", text: "Pre-filled enquiry messages so potential customers reach you in one tap." },
    { icon: "map-pin", title: "Local Discovery", text: "Integrated Google Maps, instant directions, and localized SEO discoverability." },
    { icon: "sparkles", title: "Interactive Design", text: "High-end transitions and micro-interactions that make your business unforgettable." },
    { icon: "image", title: "Visual Storytelling", text: "High-contrast galleries showcasing products, projects, and work outcomes." },
    { icon: "mouse-pointer", title: "Easy Actions", text: "Frictionless forms, instant calling buttons, and direct booking flows." },
    { icon: "phone-call", title: "1-Tap Quick Call", text: "Direct tel links placed right at thumb reach for immediate phone enquiries." },
    { icon: "zap", title: "Ultra-Fast Mobile Speed", text: "Lightweight, zero-bloat code optimized to load instantly even on 4G connections." },
    { icon: "navigation", title: "Thumb-Zone Bottom Bar", text: "Floating bottom actions for quick WhatsApp, calling, and location discovery on mobile." },
    { icon: "qr-code", title: "QR Code Ready", text: "Scan-ready links for table tents, visiting cards, billing counters, and packaging." },
    { icon: "share-2", title: "Instant Social Share", text: "Direct sharing triggers so clients can forward your business link to friends on WhatsApp." },
    { icon: "shield-check", title: "Safe & SSL Secured", text: "Encrypted HTTPS connections with automated security safeguards out of the box." }
  ];

  const visibleFeatures = showAll ? featureItems : featureItems.slice(0, 6);

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <Reveal className="section-heading light-heading">
          <span className="section-label">THE ARTOWEBIX EXPERIENCE</span>
          <h2>Not just a website.<span> Something people enjoy using.</span></h2>
          <p>Every section has a purpose — attract attention, build trust and make contacting your business effortless.</p>
        </Reveal>

        <div className="experience-layout">
          <div className="experience-menu-wrap">
            <div className="experience-menu">
              {visibleFeatures.map((feature, index) => (
                <button
                  key={index}
                  type="button"
                  className={`experience-option ${active === index ? "active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <span className="option-icon"><Icon name={feature.icon} size={19} /></span>
                  <span className="option-copy">
                    <strong>{feature.title}</strong>
                    <small>{feature.text}</small>
                  </span>
                  <Icon name="arrow-up-right" size={16} />
                </button>
              ))}
            </div>

            <div className="features-load-more">
              <button
                type="button"
                className="btn-load-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? "Show fewer features" : `Explore more features (+${featureItems.length - 6})`}</span>
                <Icon name={showAll ? "chevron-up" : "chevron-down"} size={16} />
              </button>
            </div>
          </div>

          <div className="experience-display">
            <div className="display-grid"></div>
            <div className="display-content">
              <span className="display-kicker">FEATURE {String(active + 1).padStart(2, "0")}</span>
              <div className="display-icon">
                <Icon name={featureItems[active]?.icon || "sparkles"} size={30} />
              </div>
              <h3>{featureItems[active]?.title}</h3>
              <p>{featureItems[active]?.text}</p>
              <div className="display-progress"><span></span></div>
              <div className="display-small-cards">
                <div><Icon name="check" size={14} /> Smooth interaction</div>
                <div><Icon name="check" size={14} /> Built for customers</div>
                <div><Icon name="check" size={14} /> Designed for action</div>
              </div>
            </div>
            <div className="display-orb"></div>
            <div className="display-orb-two"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS
   ========================================================= */

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">HOW IT WORKS</span>
          <h2>Simple process.<span> Serious results.</span></h2>
          <p>No complicated meetings. No confusing technical language. Just a clear path from idea to launch.</p>
        </Reveal>

        <div className="process-grid">
          <Reveal>
            <div className="process-card">
              <div className="process-number">01</div>
              <div className="process-icon"><Icon name="message-circle" size={25} /></div>
              <h3>Tell us your idea</h3>
              <p>Tell us about your business, customers and what you want your website to achieve.</p>
              <div className="process-arrow"><Icon name="arrow-right" size={20} /></div>
            </div>
          </Reveal>

          <Reveal>
            <div className="process-card">
              <div className="process-number">02</div>
              <div className="process-icon"><Icon name="palette" size={25} /></div>
              <h3>We design the experience</h3>
              <p>We turn your information into a visual experience with modern layouts, motion and interactions.</p>
              <div className="process-arrow"><Icon name="arrow-right" size={20} /></div>
            </div>
          </Reveal>

          <Reveal>
            <div className="process-card">
              <div className="process-number">03</div>
              <div className="process-icon"><Icon name="rocket" size={25} /></div>
              <h3>Launch & grow</h3>
              <p>After testing everything across devices, we help you launch and keep your website fresh.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT CTA SECTION
   ========================================================= */

function ContactCTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-orb cta-orb-one"></div>
      <div className="cta-orb cta-orb-two"></div>

      <div className="container">
        <Reveal className="cta-card">
          <div className="cta-glow cta-glow-one"></div>
          <div className="cta-glow cta-glow-two"></div>

          <div className="cta-content">
            <span className="section-label light">READY WHEN YOU ARE</span>
            <h2>Let's build something<span> your customers remember.</span></h2>
            <p>Tell us about your business and let's create a website that makes your brand stand out.</p>

            <div className="cta-actions">
              <a
                href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20want%20to%20discuss%20a%20new%20website."
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <Icon name="message-circle" size={18} />
                WhatsApp Us
              </a>

              <a
                href="mailto:namaste@artowebix.com"
                className="btn btn-secondary"
              >
                <Icon name="mail" size={18} />
                Send Email
              </a>
            </div>

            <div className="cta-note">
              <span className="online-dot"></span>
              Currently accepting new projects
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
  const [open, setOpen] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const faqItems = [
    { q: "I don't know anything about websites. Can you still help?", a: "Absolutely. You don't need technical knowledge. We handle the design, structure, responsiveness and essential setup while explaining everything in simple language." },
    { q: "Can customers contact me through WhatsApp?", a: "Yes. We connect prominent WhatsApp buttons throughout the website with pre-written enquiry messages so customers can reach you in a single tap." },
    { q: "Will the website work on mobile?", a: "Yes. Every website is built mobile-first with smooth gestures and responsive layouts tailored for smartphones, tablets, and desktops." },
    { q: "Can I show my services and prices?", a: "Yes. We can create service cards, pricing sections, interactive menus, packages, galleries, and custom tabs depending on your business needs." },
    { q: "Can you add Google Maps and calling?", a: "Yes. Visitors can access your precise map location, one-tap turn-by-turn directions, and direct phone dialer links straight from the site." },
    { q: "How long does it take to launch a full website?", a: "Most local business websites are designed, developed, and ready to go live within 5 to 10 working days, following your initial concept review within 48 hours." },
    { q: "Do I have to pay any monthly recurring platform fees?", a: "No hidden monthly platform software subscriptions. You only pay for your standard annual domain name and fast cloud hosting, which we assist you in setting up cleanly." },
    { q: "Can customers book appointments or reserve tables online?", a: "Yes! We configure direct appointment inquiry forms and WhatsApp reservation links with automated pre-filled details to eliminate booking friction." },
    { q: "Will my business show up on Google search results?", a: "Yes. We build all pages with clean semantic markup, fast load speeds, local business metadata, and on-page SEO best practices to help Google index and rank your business." },
    { q: "Can I update my menu, prices, or photos later on?", a: "Yes. We organize websites with structured, easily editable sections and provide simple guidance so you can update pricing, offers, and gallery photos whenever needed." }
  ];

  const visibleFaqs = showAll ? faqItems : faqItems.slice(0, 5);

  return (
    <section className="section faq-section" id="faqs">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">QUESTIONS</span>
          <h2>Before you ask,<span> we've probably answered it.</span></h2>
        </Reveal>

        <div className="faq-list">
          {visibleFaqs.map((faq, index) => {
            const active = open === index;
            return (
              <Reveal key={index}>
                <div className={`faq-item ${active ? "faq-active" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(active ? -1 : index)}
                    aria-expanded={active}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon">{active ? "−" : "+"}</span>
                  </button>

                  <div
                    className="faq-answer"
                    style={{ maxHeight: active ? "300px" : "0px" }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="faq-load-more">
          <button
            type="button"
            className="text-button"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? "Show fewer questions" : "View all questions"}</span>
            <Icon name={showAll ? "chevron-up" : "chevron-down"} size={16} />
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
        <div className="footer-main-grid">
          <div className="footer-col brand-col">
            <a href="#home" className="brand">
              <span className="brand-symbol"><span></span><b>✦</b></span>
              <span className="brand-name">Arto<span>Webix</span></span>
            </a>
            <p className="brand-desc">
              Crafting high-impact, interactive websites for local businesses ready to step up, build credibility, and convert more visitors.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/artowebix" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">
                <Icon name="instagram" size={17} />
              </a>
              <a href="https://linkedin.com/company/artowebix" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-btn">
                <Icon name="linkedin" size={17} />
              </a>
              <a href="https://wa.me/918169292390" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-btn">
                <Icon name="message-circle" size={17} />
              </a>
              <a href="tel:+918169292390" aria-label="Phone" className="social-btn">
                <Icon name="phone" size={17} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#experience">Features</a></li>
              <li><a href="#process">How it Works</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Direct Connect</h4>
            <div className="footer-action-list">
              <a href="https://wa.me/918169292390" target="_blank" rel="noreferrer" className="footer-contact-link">
                <span className="icon-wrap"><Icon name="message-circle" size={15} /></span>
                <span>WhatsApp Enquiry</span>
              </a>
              <a href="tel:+918169292390" className="footer-contact-link">
                <span className="icon-wrap"><Icon name="phone-call" size={15} /></span>
                <span>+91 81692 92390</span>
              </a>
              <a href="mailto:namaste@artowebix.com" className="footer-contact-link">
                <span className="icon-wrap"><Icon name="mail" size={15} /></span>
                <span>namaste@artowebix.com</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Studio Location</h4>
            <p className="footer-address">
              <Icon name="map-pin" size={16} />
              <span>Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
            </p>
            <div className="studio-status">
              <span className="online-dot"></span>
              <span>Available for projects in Mumbai, India & Worldwide</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ArtoWebix. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <span>•</span>
            <a href="#terms">Terms</a>
            <span>•</span>
            <span>Crafted with Gold & Dark Navy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   APP MOUNT
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
