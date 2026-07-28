'use client';

import { jrBlogPosts, jrBlogSection } from '@/data/jr-blog';
import './jr-blog.css';

function VideoCorners() {
  return (
    <>
      <span className="jr-blog-corner jr-blog-corner--tl" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--tr" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--bl" aria-hidden />
      <span className="jr-blog-corner jr-blog-corner--br" aria-hidden />
    </>
  );
}

function BlogVideo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <div className={className}>
      <video autoPlay loop muted playsInline preload="auto" src={src} />
      <div className="jr-blog-video-overlay" />
      <span className="jr-blog-video-plus" aria-hidden>
        +
      </span>
      <VideoCorners />
    </div>
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

export function JrBlogSection() {
  const featured = jrBlogPosts.find((p) => p.type === 'featured');
  const standard = jrBlogPosts
    .filter((p) => p.type === 'standard')
    .sort((a, b) => a.display_order - b.display_order);

  if (!featured) return null;

  return (
    <section className="jr-blog" id="blog">
      <div className="jr-blog-inner">
        <span className="jr-blog-badge">{jrBlogSection.badge}</span>
        <h2 className="jr-blog-heading">{jrBlogSection.heading}</h2>

        <div className="jr-blog-header-bottom">
          <p className="jr-blog-subtitle">{jrBlogSection.subtitle}</p>
          <a href="#blog" className="jr-blog-cta">
            {jrBlogSection.ctaLabel}
          </a>
        </div>

        <article className="jr-blog-featured">
          <BlogVideo
            src={featured.video_url}
            className="jr-blog-video-wrap jr-blog-video-wrap--featured"
          />

          <div className="jr-blog-featured-content">
            {featured.badge && (
              <span className="jr-blog-must-read">{featured.badge}</span>
            )}
            <h3 className="jr-blog-featured-title">{featured.title}</h3>
            {featured.description && (
              <p className="jr-blog-featured-desc">{featured.description}</p>
            )}
            <div className="jr-blog-featured-footer">
              {featured.author && (
                <span className="jr-blog-author">{featured.author}</span>
              )}
              <CategoryBadge
                label={featured.category}
                color={featured.category_color}
              />
            </div>
          </div>
        </article>

        <div className="jr-blog-grid">
          {standard.map((post) => (
            <article key={post.id}>
              <BlogVideo
                src={post.video_url}
                className="jr-blog-video-wrap jr-blog-video-wrap--card"
              />
              <div className="jr-blog-card-title-row">
                <h4 className="jr-blog-card-title">{post.title}</h4>
                <CategoryBadge
                  label={post.category}
                  color={post.category_color}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
