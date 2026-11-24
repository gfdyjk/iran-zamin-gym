import { Reveal } from './Reveal';

type Props = {
  index: string;
  label: string;
  title: string;
  lede?: string;
  wide?: boolean;
  id?: string;
};

export function SectionHeading({ index, label, title, lede, wide, id }: Props) {
  return (
    <div className={`section__head${wide ? ' section__head--wide' : ''}`}>
      <Reveal as="p" className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span>{label}</span>
      </Reveal>
      <Reveal as="h2" className="section__title" delay={70} id={id}>
        {title}
      </Reveal>
      {lede ? (
        <Reveal as="p" className="section__lede" delay={130}>
          {lede}
        </Reveal>
      ) : null}
    </div>
  );
}
