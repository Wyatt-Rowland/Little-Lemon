import Hero from './Hero';
import Specials from './Specials'
import Testimonials from './Testimonials.js'

const Main = () => {


    return (
      <main className="main">
        <div role='grid' className='main-grid'>
          <div className='hero-background flex-center'>
            <Hero />
          </div>
          <div className='specials-bg'>
            <Specials />
          </div>
          <div className='testimonials-bg'>
            <Testimonials />
          </div>
        </div>
      </main>
    );
  }

  export default Main;