'use client';

import './jr-blog.css';
import './jr-section.css';

type JrAnimatedSectionProps = {
  id: string;
  label: string;
  title: string;
  body: string;
  items: string[];
  index: number;
  image: string;
  imageAlt: string;
  gridImages?: string[];
  featuredBadge: string;
  category: string;
  categoryColor: string;
  ctaLabel: string;
  ctaHref: string;
};

function ImageCorners() {
  return (
    <>
      <span className="jr-blog-corner jr-blog-corner--tl" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--tr" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--bl" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--br" aria-hidden />
    </>
  );
}

function CategoryBadge({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span className="jr-blog-category" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}

export function JrAnimatedSection({
  id,
  label,
  title,
  body,
  items,
  index,
  image,
  imageAlt,
  gridImages,
  featuredBadge,
  category,
  categoryColor,
  ctaLabel,
  ctaHref,
}: JrAnimatedSectionProps) {
  const reversed = index % 2 === 1;
  const featuredTitle = items[0] ?? title;
  const gridItems = items.slice(1);

  return (
    <section className="jr-blog jr-section" id={id}>
      <div className="jr-blog-inner">
        <span className="jr-blog-badge">{label}</span>
        <h2 className="jr-blog-heading">{title}</h2>

        <div className="jr-blog-header-bottom">
          <p className="jr-blog-subtitle">{body}</p>
          <a href={ctaHref} className="jr-blog-cta">
            {ctaLabel}
          </a>
        </div>

        <article
          className={`jr-blog-featured${reversed ? ' jr-section-featured--reversed' : ''}`}
        >
          <div className="jr-blog-video-wrap jr-blog-video-wrap--featured jr-section-image-wrap">
            <img src={image} alt={imageAlt} />
            <div className="jr-blog-video-overlay" />
            <ImageCorners />
          </div>

          <div className="jr-blog-featured-content">
            <span className="jr-blog-must-read">{featuredBadge}</span>
            <h3 className="jr-blog-featured-title">{featuredTitle}</h3>
            <p className="jr-blog-featured-desc">{body}</p>
            <div className="jr-blog-featured-footer">
              <span className="jr-blog-author">JR Construction</span>
              <CategoryBadge label={category} color={categoryColor} />
            </div>
          </div>
        </article>

        {gridItems.length > 0 && (
          <div className="jr-blog-grid">
            {gridItems.map((item, i) => (
              <article key={item}>
                <div className="jr-section-card-media">
                  <img
                    src={gridImages?.[i] ?? image}
                    alt=""
                    aria-hidden
                  />
                  <div className="jr-blog-video-overlay" />
                  <ImageCorners />
                </div>
                <div className="jr-blog-card-title-row">
                  <h4 className="jr-blog-card-title">{item}</h4>
                  <CategoryBadge label={category} color={categoryColor} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
