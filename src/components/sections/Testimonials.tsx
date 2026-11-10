import { site } from '../../data/site';
import { IconStar } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import './Testimonials.css';

export function Testimonials() {
  return (
    <section className="section section--tight testimonials">
      <div className="container">
        <div className="section-head section-head--split testimonials__head">
          <Reveal className="section-head">
            <SectionLabel index="06">نظرات ورزشکاران</SectionLabel>
            <h2 className="section-title">تجربهٔ اعضای ایران زمین</h2>
            <p className="section-lead">
              این بخش جای نظرات واقعی اعضاست. کارت‌های زیر با متن نمونه آماده شده‌اند تا با دریافت نظر و تصویر اعضا،
              جایگزین شوند.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <span className="badge">محتوای آزمایشی</span>
          </Reveal>
        </div>

        <ul className="testimonials__grid">
          {site.testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={index * 80} className="testimonial">
              <span className="testimonial__mark" aria-hidden="true">
                ”
              </span>
              <span className="testimonial__stars" aria-label={`امتیاز ${testimonial.rating} از ۵`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <IconStar key={starIndex} size={13} className={starIndex < testimonial.rating ? 'is-on' : undefined} />
                ))}
              </span>
              <p className="testimonial__quote">{testimonial.quote}</p>
              <div className="testimonial__author">
                <img src={testimonial.avatar} alt="" width={44} height={44} loading="lazy" decoding="async" />
                <span className="testimonial__author-text">
                  <span className="testimonial__name">{testimonial.name}</span>
                  <span className="testimonial__role">{testimonial.role}</span>
                </span>
              </div>
              <span className="testimonial__flag">محتوای نمونه</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
