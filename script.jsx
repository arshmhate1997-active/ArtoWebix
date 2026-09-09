const { useState, useEffect, useRef } = React;

/* =========================================================
   ICON HELPER
   ========================================================= */

function Icon({ name, size = 18 }) {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);

  return (
    <i
      data-lucide={name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-block"
      }}
    />
  );
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
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
        >
          <Icon name={open ? "x" : "menu"} size={22} />
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
            <div className="stat">
              <strong>48H</strong>
              <span>First concept</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>Responsive</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Online presence</span>
            </div>
            <div className="stat">
              <strong>1-Tap</strong>
              <span>Customer contact</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="hero-visual">
          <div className="visual-glow"></div>
          <div className="browser-window">
            <div className="browser-top">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="browser-address">artowebix.com</div>
              <Icon name="lock-keyhole" size={14} />
            </div>

            <div className="website-preview">
              <div className="preview-nav">
                <strong>YOUR BRAND</strong>
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="preview-content">
                <div className="preview-tag">
                  ✦ Welcome to your new website
                </div>
                <h3>
                  Make your
                  <span>first impression</span>
                  unforgettable.
                </h3>
                <p>
                  Beautiful design. Clear messaging. Real customer actions.
                </p>
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
                <Icon name="mouse-pointer-2" size={22} />
              </div>
            </div>
          </div>

          <div className="floating-badge badge-a">
            <span>⚡</span>
            Fast & modern
          </div>

          <div className="floating-badge badge-b">
            <span>📱</span>
            Mobile ready
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
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-item"><span>✦</span>Interactive design</div>
        <div className="marquee-item"><span>✦</span>Mobile-first</div>
        <div className="marquee-item"><span>✦</span>WhatsApp enquiries</div>
        <div className="marquee-item"><span>✦</span>Google Maps</div>
        <div className="marquee-item"><span>✦</span>Fast websites</div>
        <div className="marquee-item"><span>✦</span>Local businesses</div>
        <div className="marquee-item"><span>✦</span>Premium visuals</div>
        <div className="marquee-item"><span>✦</span>Interactive design</div>
        <div className="marquee-item"><span>✦</span>Mobile-first</div>
        <div className="marquee-item"><span>✦</span>WhatsApp enquiries</div>
        <div className="marquee-item"><span>✦</span>Google Maps</div>
        <div className="marquee-item"><span>✦</span>Fast websites</div>
        <div className="marquee-item"><span>✦</span>Local businesses</div>
        <div className="marquee-item"><span>✦</span>Premium visuals</div>
      </div>
    </section>
  );
}

/* =========================================================
   SERVICES (3D FLIP CARDS WITH INLINE UI DATA)
   ========================================================= */

function Services() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">WHO WE BUILD FOR</span>
          <h2>
            Your business.
            <span> Your style.</span>
            Your website.
          </h2>
          <p>
            We design around your customers, your personality and the way your
            business actually works.
          </p>
        </Reveal>

        <div className="business-grid">
          {/* Card 1: Local Stores */}
          <Reveal>
            <div 
              className={`business-card accent-blue ${flippedIndex === 0 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(0)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Retail</span>
                    <div className="business-icon">
                      <Icon name="store" size={22} />
                    </div>
                  </div>
                  <h3>Local Stores</h3>
                  <p>Turn your products, offers and brand story into a beautiful online storefront.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">01 / RETAIL</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">Turn browsers into buyers</h4>
                    <p className="back-desc">Give your retail store a strong digital presence that helps customers discover what you sell and why they should visit.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Product Showcase</li>
                      <li><span>✓</span> Offers & Promotions</li>
                      <li><span>✓</span> Store Information</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Local%20Stores."
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

          {/* Card 2: Cafés & Restaurants */}
          <Reveal>
            <div 
              className={`business-card accent-coral ${flippedIndex === 1 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(1)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Food</span>
                    <div className="business-icon">
                      <Icon name="coffee" size={22} />
                    </div>
                  </div>
                  <h3>Cafés & Restaurants</h3>
                  <p>Menus, galleries, locations and WhatsApp enquiries designed around hungry customers.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">02 / FOOD</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">Make mouths water online</h4>
                    <p className="back-desc">Drive hungry patrons directly through your doors with dynamic digital menus and instant table bookings.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Digital Menu</li>
                      <li><span>✓</span> Table Booking</li>
                      <li><span>✓</span> Direct Order Flow</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/8169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Cafes%20and%20Restaurants."
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

          {/* Card 3: Doctors & Clinics */}
          <Reveal>
            <div 
              className={`business-card accent-cyan ${flippedIndex === 2 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(2)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Healthcare</span>
                    <div className="business-icon">
                      <Icon name="heart-pulse" size={22} />
                    </div>
                  </div>
                  <h3>Doctors & Clinics</h3>
                  <p>Build trust with clean service pages, timings, location and easy appointment enquiries.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">03 / HEALTHCARE</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">Trust begins at first click</h4>
                    <p className="back-desc">Present clinical credibility and simplify patient scheduling with accessible service breakdowns.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Instant Booking</li>
                      <li><span>✓</span> Doctor Profiles</li>
                      <li><span>✓</span> Timings & Map</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Doctors%20and%20Clinics."
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

          {/* Card 4: Salons & Studios */}
          <Reveal>
            <div 
              className={`business-card accent-purple ${flippedIndex === 3 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(3)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Beauty</span>
                    <div className="business-icon">
                      <Icon name="scissors" size={22} />
                    </div>
                  </div>
                  <h3>Salons & Studios</h3>
                  <p>Showcase your work, services, packages and transformations in a premium experience.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">04 / BEAUTY</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">Make your brand look beautiful</h4>
                    <p className="back-desc">Turn your salon into a digital experience that feels as premium as the services you deliver.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Service Menu</li>
                      <li><span>✓</span> Transformation Gallery</li>
                      <li><span>✓</span> 1-Tap Booking</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Salons%20and%20Studios."
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

          {/* Card 5: Consultants */}
          <Reveal>
            <div 
              className={`business-card accent-violet ${flippedIndex === 4 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(4)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Professionals</span>
                    <div className="business-icon">
                      <Icon name="briefcase-business" size={22} />
                    </div>
                  </div>
                  <h3>Consultants</h3>
                  <p>Turn your expertise and credibility into a website that makes clients want to talk.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">05 / PROFESSIONALS</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">High-authority positioning</h4>
                    <p className="back-desc">Establish instant market authority and qualify high-value leads with bespoke portfolio pages.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Client Testimonials</li>
                      <li><span>✓</span> Case Studies</li>
                      <li><span>✓</span> Consultation Forms</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Consultants."
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

          {/* Card 6: Fitness Brands */}
          <Reveal>
            <div 
              className={`business-card accent-blue ${flippedIndex === 5 ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(5)}
            >
              <div className="business-card-inner">
                <div className="business-card-front">
                  <div className="card-top">
                    <span className="business-badge">Lifestyle</span>
                    <div className="business-icon">
                      <Icon name="dumbbell" size={22} />
                    </div>
                  </div>
                  <h3>Fitness Brands</h3>
                  <p>Show classes, trainers, transformations and plans with energetic interactive design.</p>
                  <div className="card-link">
                    <span>Hover to explore</span>
                    <Icon name="arrow-up-right" size={16} />
                  </div>
                  <div className="card-shine"></div>
                </div>

                <div className="business-card-back">
                  <div>
                    <div className="card-top">
                      <span className="business-badge-gold">06 / LIFESTYLE</span>
                      <div className="back-icon-mini">✦</div>
                    </div>
                    <h4 className="back-tagline">Inspire action & signups</h4>
                    <p className="back-desc">Motivate memberships with high-energy visuals, timetable calendars, and class registrations.</p>
                    <ul className="back-feature-list">
                      <li><span>✓</span> Class Timetable</li>
                      <li><span>✓</span> Trainer Spotlights</li>
                      <li><span>✓</span> Trial Signups</li>
                    </ul>
                  </div>
                  <a 
                    href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20am%20interested%20in%20a%20website%20for%20Fitness%20Brands."
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
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INTERACTIVE EXPERIENCE
   ========================================================= */

function Experience() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const featureItems = [
    {
      icon: "smartphone",
      title: "Mobile-first",
      text: "Looks and feels native on every smartphone, tablet, and desktop display."
    },
    {
      icon: "message-circle",
      title: "WhatsApp Ready",
      text: "Pre-filled enquiry messages so potential customers reach you in one tap."
    },
    {
      icon: "map-pin",
      title: "Local Discovery",
      text: "Integrated Google Maps, instant directions, and localized SEO discoverability."
    },
    {
      icon: "sparkles",
      title: "Interactive Design",
      text: "High-end transitions and micro-interactions that make your business unforgettable."
    },
    {
      icon: "image",
      title: "Visual Storytelling",
      text: "High-contrast galleries showcasing products, projects, and work outcomes."
    },
    {
      icon: "mouse-pointer-click",
      title: "Easy Actions",
      text: "Frictionless forms, instant calling buttons, and direct booking flows."
    },
    {
      icon: "phone-call",
      title: "1-Tap Quick Call",
      text: "Direct tel links placed right at thumb reach for immediate phone enquiries."
    },
    {
      icon: "zap",
      title: "Ultra-Fast Mobile Speed",
      text: "Lightweight, zero-bloat code optimized to load instantly even on 4G connections."
    },
    {
      icon: "navigation",
      title: "Thumb-Zone Bottom Bar",
      text: "Floating bottom actions for quick WhatsApp, calling, and location discovery on mobile."
    },
    {
      icon: "qr-code",
      title: "QR Code Ready",
      text: "Scan-ready links for table tents, visiting cards, billing counters, and packaging."
    },
    {
      icon: "share-2",
      title: "Instant Social Share",
      text: "Direct sharing triggers so clients can forward your business link to friends on WhatsApp."
    },
    {
      icon: "shield-check",
      title: "Safe & SSL Secured",
      text: "Encrypted HTTPS connections with automated security safeguards out of the box."
    }
  ];

  const visibleFeatures = showAll ? featureItems : featureItems.slice(0, 6);

  const handleFeatureClick = (index) => {
    setActive(index);
    setTimeout(() => {
      const descriptionElement = document.getElementById("feature-description");
      if (descriptionElement) {
        descriptionElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, 100);
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-bg"></div>

      <div className="container">
        <Reveal className="section-heading light-heading">
          <span className="section-label light">THE ARTOWEBIX EXPERIENCE</span>
          <h2>
            Not just a website.
            <span> Something people enjoy using.</span>
          </h2>
          <p>
            Every section has a purpose — attract attention, build trust and
            make contacting your business effortless.
          </p>
        </Reveal>

        <div className="experience-layout">
          <div className="experience-menu-wrap">
            <div className="experience-menu">
              {visibleFeatures.map((feature, index) => (
                <button
                  key={index}
                  type="button"
                  className={`experience-option ${active === index ? "active" : ""}`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <span className="option-icon">
                    <Icon name={feature.icon} size={19} />
                  </span>

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
                <span>
                  {showAll
                    ? "Show fewer features"
                    : `Explore more features (+${featureItems.length - 6})`}
                </span>
                <Icon
                  name={showAll ? "chevron-up" : "chevron-down"}
                  size={16}
                />
              </button>
            </div>
          </div>

          <div className="experience-display" id="feature-description">
            <div className="display-grid"></div>

            <div className="display-content">
              <span className="display-kicker">
                FEATURE {String(active + 1).padStart(2, "0")}
              </span>

              <div className="display-icon">
                <Icon
                  name={featureItems[active]?.icon || "sparkles"}
                  size={30}
                />
              </div>

              <h3>{featureItems[active]?.title}</h3>
              <p>{featureItems[active]?.text}</p>

              <div className="display-progress">
                <span></span>
              </div>

              <div className="display-small-cards">
                <div>
                  <Icon name="check" size={14} />
                  Smooth interaction
                </div>
                <div>
                  <Icon name="check" size={14} />
                  Built for customers
                </div>
                <div>
                  <Icon name="check" size={14} />
                  Designed for action
                </div>
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
          <h2>
            Simple process.
            <span> Serious results.</span>
          </h2>
          <p>
            No complicated meetings. No confusing technical language. Just a
            clear path from idea to launch.
          </p>
        </Reveal>

        <div className="process-grid">
          <Reveal>
            <div className="process-card">
              <div className="process-number">01</div>
              <div className="process-icon">
                <Icon name="message-circle" size={25} />
              </div>
              <h3>Tell us your idea</h3>
              <p>Tell us about your business, customers and what you want your website to achieve.</p>
              <div className="process-arrow">
                <Icon name="arrow-right" size={20} />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="process-card">
              <div className="process-number">02</div>
              <div className="process-icon">
                <Icon name="palette" size={25} />
              </div>
              <h3>We design the experience</h3>
              <p>We turn your information into a visual experience with modern layouts, motion and interactions.</p>
              <div className="process-arrow">
                <Icon name="arrow-right" size={20} />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="process-card">
              <div className="process-number">03</div>
              <div className="process-icon">
                <Icon name="rocket" size={25} />
              </div>
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
   CTA
   ========================================================= */

function ContactCTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-orb cta-orb-one"></div>
      <div className="cta-orb cta-orb-two"></div>

      <div className="container">
        <Reveal className="cta-card">
          <div className="cta-decoration">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <span className="section-label light">READY WHEN YOU ARE</span>
          <h2>
            Let's build something
            <span> people remember.</span>
          </h2>
          <p>
            Tell us what you do, who you serve and what you want your website to
            achieve. We'll take it from there.
          </p>

          <div className="cta-actions">
            <a
              href="https://wa.me/918169292390?text=Hi%20ArtoWebix!%20I%20want%20to%20discuss%20a%20new%20website."
              target="_blank"
              rel="noreferrer"
              className="btn-white"
            >
              Talk on WhatsApp
              <Icon name="message-circle" size={17} />
            </a>

            <a
              href="tel:+918169292390"
              className="btn-outline-white"
            >
              Call us
              <Icon name="phone" size={17} />
            </a>
          </div>

          <div className="cta-note">
            <span className="online-dot"></span>
            Currently accepting new projects
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
    {
      q: "I don't know anything about websites. Can you still help?",
      a: "Absolutely. You don't need technical knowledge. We handle the design, structure, responsiveness and essential setup while explaining everything in simple language."
    },
    {
      q: "Can customers contact me through WhatsApp?",
      a: "Yes. We connect prominent WhatsApp buttons throughout the website with pre-written enquiry messages so customers can reach you in a single tap."
    },
    {
      q: "Will the website work on mobile?",
      a: "Yes. Every website is built mobile-first with smooth gestures and responsive layouts tailored for smartphones, tablets, and desktops."
    },
    {
      q: "Can I show my services and prices?",
      a: "Yes. We can create service cards, pricing sections, interactive menus, packages, galleries, and custom tabs depending on your business needs."
    },
    {
      q: "Can you add Google Maps and calling?",
      a: "Yes. Visitors can access your precise map location, one-tap turn-by-turn directions, and direct phone dialer links straight from the site."
    },
    {
      q: "How long does it take to launch a full website?",
      a: "Most local business websites are designed, developed, and ready to go live within 3 to 5 working days, following your initial concept review within 48 hours."
    },
    {
      q: "Do I have to pay any monthly recurring platform fees?",
      a: "No hidden monthly platform software subscriptions. You only pay for your standard annual domain name, which we assist you in setting up cleanly."
    },
    {
      q: "Can customers book appointments or reserve tables online?",
      a: "Yes! We configure direct appointment inquiry forms and WhatsApp reservation links with automated pre-filled details to eliminate booking friction."
    },
    {
      q: "Will my business show up on Google search results?",
      a: "Yes. We build all pages with clean semantic markup, fast load speeds, local business metadata, and on-page SEO best practices to help Google index and rank your business."
    },
    {
      q: "Do I own my website and domain once the project is finished?",
      a: "Yes, 100%. Once final payment is completed, all code, design files, and domain credentials are fully transferred to you with zero recurring agency lock-in fees."
    }
  ];

  const visibleFaqs = showAll ? faqItems : faqItems.slice(0, 5);

  return (
    <section className="section faq-section" id="faqs">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-label">QUESTIONS</span>
          <h2>
            Before you ask,
            <span> we've probably answered it.</span>
          </h2>
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
            className="btn-load-more"
            onClick={() => setShowAll(!showAll)}
          >
            <span>
              {showAll
                ? "Show fewer questions"
                : `View more questions (+${faqItems.length - 5})`}
            </span>
            <Icon
              name={showAll ? "chevron-up" : "chevron-down"}
              size={16}
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
        <div className="footer-main-grid">
          <div className="footer-col brand-col">
            <a href="#home" className="brand">
              <span className="brand-symbol">
                <span></span>
                <b>✦</b>
              </span>
              <span className="brand-name">
                Arto<span>Webix</span>
              </span>
            </a>
            <p className="brand-desc">
              Crafting high-impact, interactive websites for local businesses
              ready to step up, build credibility, and convert more visitors.
            </p>
            ```jsx
<div className="footer-socials">

  {/* Instagram */}
  <a
    href="https://instagram.com/artowebix"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="social-btn"
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://linkedin.com/company/artowebix"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    className="social-btn"
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5Z" />
      <path d="M.5 8h4V23h-4V8Z" />
      <path d="M8 8h3.83v2.05h.05c.53-1.01 1.83-2.55 3.77-2.55 4.03 0 4.77 2.65 4.77 6.1V23h-4v-8.32c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.19 2.16-3.19 4.4V23H8V8Z" />
    </svg>
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/918169292390"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
    className="social-btn"
  >
    <Icon name="message-circle" size={17} />
  </a>

  {/* Phone */}
  <a
    href="tel:+918169292390"
    aria-label="Phone"
    className="social-btn"
  >
    <Icon name="phone" size={17} />
  </a>

</div>
```

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
              <a
                href="https://wa.me/918169292390?text=Hello%20ArtoWebix!%20I'd%20like%20to%20get%20in%20touch."
                target="_blank"
                rel="noreferrer"
                className="footer-contact-link"
              >
                <span className="icon-wrap"><Icon name="message-circle" size={15} /></span>
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href="tel:+918169292390"
                className="footer-contact-link"
              >
                <span className="icon-wrap"><Icon name="phone-call" size={15} /></span>
                <span>+91 81692 92390</span>
              </a>

              <a
                href="mailto:namaste@artowebix.com"
                className="footer-contact-link"
              >
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
