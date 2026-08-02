'use client';

import { motion } from 'framer-motion';
import { cafeConfig, type CafeConfig } from '@/data/cafe';

type CafeLandingProps = {
  config?: CafeConfig;
};

function CoffeeBagIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 12h16c1.5 0 4 1.2 4 4.5S25.5 21 24 21H8V12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 21v5a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 8c0-1.5.8-3 2-3s2 1.5 2 3M19 8c0-1.5.8-3 2-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function roastWidth(roast: string): string {
  const lower = roast.toLowerCase();
  if (lower.includes('dark')) return '85%';
  if (lower.includes('light')) return '35%';
  return '55%';
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export function CafeLanding({ config = cafeConfig }: CafeLandingProps) {
  return (
    <div className="cafe-page">
      <div className="cafe-announcement">
        Fresh roasts weekly · Free local pickup · {config.hours}
      </div>

      <section className="cafe-hero" aria-label="Hero">
        <motion.img
          src={config.heroImage}
          alt={`${config.brand} café`}
          className="cafe-hero-image"
          initial={{ scale: 1.06, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="cafe-hero-brand"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>
            {config.brand.includes(' ') ? (
              <>
                {config.brand.split(' ').slice(0, -1).join(' ')}
                <br />
                {config.brand.split(' ').slice(-1)[0]}
              </>
            ) : (
              config.brand
            )}
          </h1>
          <CoffeeBagIcon className="cafe-hero-icon" />
        </motion.div>
      </section>

      <nav className="cafe-nav" aria-label="Primary">
        <a href="#" className="cafe-nav-brand">
          {config.brand.toLowerCase()}
        </a>
        <ul className="cafe-nav-links">
          {config.navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="cafe-nav-meta">
          <a href={config.phoneHref}>{config.phone}</a>
        </div>
      </nav>

      <div className="cafe-shell">
        <motion.section className="cafe-intro" {...fadeUp}>
          <p>
            At <em>{config.brand}</em> {config.intro}
          </p>
        </motion.section>

        <motion.div className="cafe-gallery" {...fadeUp}>
          {config.gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`${config.brand} moment ${index + 1}`}
            />
          ))}
        </motion.div>

        <section className="cafe-section" id="menu">
          <div className="cafe-section-head">
            <h2>{config.sectionHeading}</h2>
            <a href="#menu" className="cafe-btn cafe-btn-primary">
              Shop All
            </a>
          </div>

          <div className="cafe-products">
            {config.products.map((product, index) => (
              <motion.article
                key={product.id}
                className="cafe-product"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="cafe-product-image"
                />
                <div>
                  <h3 className="cafe-product-name">{product.name}</h3>
                  <p className="cafe-product-price">{product.price}</p>
                </div>
                <p className="cafe-product-origin">{product.origin}</p>
                <p className="cafe-product-notes">Notes: {product.notes}</p>
                <div
                  className="cafe-roast"
                  style={{ ['--roast' as string]: roastWidth(product.roast) }}
                >
                  <div className="cafe-roast-bar" />
                  <span className="cafe-roast-label">{product.roast}</span>
                </div>
                <button type="button" className="cafe-btn cafe-btn-blue">
                  Quick View
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="cafe-band" id="about">
          <motion.div className="cafe-band-copy" {...fadeUp}>
            <p className="cafe-eyebrow">{config.subscription.eyebrow}</p>
            <h2>{config.subscription.title}</h2>
            <p>{config.subscription.body}</p>
            <a
              href={config.subscription.ctaHref}
              className="cafe-btn cafe-btn-primary"
            >
              {config.subscription.ctaLabel}
            </a>
          </motion.div>
          <motion.img
            src={config.subscription.image}
            alt="Coffee subscription"
            className="cafe-band-image"
            {...fadeUp}
          />
        </section>

        <section className="cafe-wholesale">
          <motion.div {...fadeUp}>
            <p className="cafe-eyebrow">{config.wholesale.eyebrow}</p>
            <h2>
              <em>{config.wholesale.title}</em>
              <br />
              {config.wholesale.subtitle}
            </h2>
            <p>{config.wholesale.body}</p>
            <a
              href={config.wholesale.ctaHref}
              className="cafe-btn cafe-btn-ghost"
            >
              {config.wholesale.ctaLabel}
            </a>
          </motion.div>
        </section>

        <section className="cafe-visit" id="visit">
          <motion.div {...fadeUp}>
            <h2>Visit Us</h2>
            <div className="cafe-visit-lines">
              <strong>{config.address}</strong>
              {config.addressSecondary ? (
                <strong>{config.addressSecondary}</strong>
              ) : null}
              <span>{config.hours}</span>
              <a href={config.phoneHref}>{config.phone}</a>
              <a href={`mailto:${config.email}`}>{config.email}</a>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <p className="cafe-eyebrow">Come hang</p>
            <p style={{ margin: '10px 0 0', color: 'var(--color-coffee-dust)' }}>
              {config.footerTagline}
            </p>
            <div style={{ marginTop: 20 }}>
              <a href={config.phoneHref} className="cafe-btn cafe-btn-primary">
                Call the shop
              </a>
            </div>
          </motion.div>
        </section>

        <section className="cafe-section" id="community">
          <div className="cafe-community-head">
            <p className="cafe-eyebrow">Community Board</p>
            <h2>What&apos;s Happening in Our World</h2>
          </div>
          <div className="cafe-posts">
            {config.posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="cafe-post"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img src={post.image} alt={post.title} />
                <p className="cafe-post-date">{post.date}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#community" className="cafe-btn cafe-btn-primary">
                  Read More
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <footer className="cafe-footer">
          <div>
            <div className="cafe-footer-brand">{config.brand}</div>
            <p>{config.footerTagline}</p>
          </div>
          <div className="cafe-footer-meta">
            © {new Date().getFullYear()} {config.brand}
          </div>
        </footer>
      </div>
    </div>
  );
}
