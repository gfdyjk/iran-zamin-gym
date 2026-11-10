import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Ticker } from './components/sections/Ticker';
import { Coach } from './components/sections/Coach';
import { Programs } from './components/sections/Programs';
import { Facilities } from './components/sections/Facilities';
import { Join } from './components/sections/Join';
import { VideoStory } from './components/sections/VideoStory';
import { Testimonials } from './components/sections/Testimonials';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Coach />
        <Programs />
        <Facilities />
        <Join />
        <VideoStory />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
