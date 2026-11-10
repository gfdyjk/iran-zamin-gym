import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Facility } from '../../data/site';
import { IconArrowLeft, IconArrowRight, IconClose } from '../ui/Icons';
import './Gallery.css';

type Props = {
  items: Facility[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

/** Full-screen gallery lightbox with keyboard navigation. */
export function Gallery({ items, index, onChange, onClose }: Props) {
  const open = index !== null;
  const current = index ?? 0;

  const step = useCallback(
    (direction: 1 | -1) => {
      onChange((current + direction + items.length) % items.length);
    },
    [current, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') step(1);
      if (event.key === 'ArrowRight') step(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, step]);

  if (!open) return null;
  const item = items[current];

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`گالری تصاویر — ${item.title}`}>
      <button type="button" className="lightbox__backdrop" onClick={onClose} aria-label="بستن گالری" />

      <div className="lightbox__top">
        <span className="lightbox__counter" dir="ltr">
          {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="بستن گالری">
          <IconClose size={20} />
        </button>
      </div>

      <figure className="lightbox__stage">
        <img src={item.image} alt={item.title} key={item.id} />
        <figcaption className="lightbox__caption">
          <span className="lightbox__title">{item.title}</span>
          <span className="lightbox__desc">{item.description}</span>
        </figcaption>
      </figure>

      <div className="lightbox__nav">
        <button type="button" className="lightbox__arrow" onClick={() => step(1)} aria-label="تصویر قبلی">
          <IconArrowRight size={22} />
        </button>
        <button type="button" className="lightbox__arrow" onClick={() => step(-1)} aria-label="تصویر بعدی">
          <IconArrowLeft size={22} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
