import './Ticker.css';

const words = ['قدرت', 'تعهد', 'نتیجه', 'ایران زمین'];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <ul className="ticker__row" key={copy}>
            {words.concat(words).map((word, index) => (
              <li className={index % 2 === 1 ? 'is-ghost' : undefined} key={`${copy}-${index}`}>
                {word}
                <span className="ticker__dot" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
