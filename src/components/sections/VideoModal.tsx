import { useEffect, useState } from 'react';
import { site } from '../../data/site';
import { IconPause, IconPlay } from '../ui/Icons';
import { Modal } from '../ui/Modal';
import './VideoModal.css';

type Props = { open: boolean; onClose: () => void };

/**
 * Plays the club film when `site.video.src` points to a real video file.
 * Until then it plays an editable sample reel built from the club photos,
 * clearly labelled as a preview.
 */
export function VideoModal({ open, onClose }: Props) {
  const media = site.video;
  const frames = media.reel.length > 0 ? media.reel : [media.poster];
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setPlaying(true);
    setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open || !playing || media.src) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [open, playing, frames.length, media.src]);

  const step = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + frames.length) % frames.length);
  };

  return (
    <Modal open={open} onClose={onClose} label={media.title} size="media">
      <div className="video-modal">
        {media.src ? (
          <video className="video-modal__file" src={media.src} poster={media.poster} controls autoPlay playsInline />
        ) : (
          <>
            <div className="video-modal__reel">
              {frames.map((frame, frameIndex) => (
                <img
                  key={`${frame}-${frameIndex}`}
                  src={frame}
                  alt=""
                  className={frameIndex === index ? 'is-active' : undefined}
                  loading={frameIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}
              <span className="video-modal__badge badge">پیش‌نمایش نمونه</span>
              <span className="video-modal__title">{media.title}</span>
            </div>

            <div className="video-modal__bar">
              <div className="video-modal__controls">
                <button
                  type="button"
                  className="video-modal__btn"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? 'توقف پخش' : 'پخش'}
                >
                  {playing ? <IconPause size={16} /> : <IconPlay size={16} />}
                </button>
                <button type="button" className="video-modal__btn" onClick={() => step(1)} aria-label="تصویر بعدی">
                  <span aria-hidden="true">‹</span>
                </button>
                <button type="button" className="video-modal__btn" onClick={() => step(-1)} aria-label="تصویر قبلی">
                  <span aria-hidden="true">›</span>
                </button>
              </div>

              <div className="video-modal__dots">
                {frames.map((frame, frameIndex) => (
                  <button
                    key={`dot-${frame}-${frameIndex}`}
                    type="button"
                    className={frameIndex === index ? 'is-active' : undefined}
                    onClick={() => setIndex(frameIndex)}
                    aria-label={`نمایش تصویر ${frameIndex + 1}`}
                    aria-current={frameIndex === index}
                  />
                ))}
              </div>

              <p className="video-modal__note">
                این پیش‌نمایش از تصاویر باشگاه ساخته شده است؛ ویدیوی رسمی ایران زمین به‌زودی جایگزین می‌شود.
              </p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
