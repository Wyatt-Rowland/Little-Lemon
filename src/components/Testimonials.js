import TestimonialsCard from './TestimonialsCard'
import TylerL from '../images/Tyler Lybrand.jpg'
import MitchS from '../images/Mitchell Symens.jpg'
import SkylarR from '../images/Skylar Rowland.jpg'
import DustyB from '../images/Dustin Brumwell.jpg'


const Testimonials = () =>  {
    return (
        <div className='testimonials-bg flex-center column align-center'>
            <h2>Testimonials</h2>
            <section className='testimonials-container'>
                <TestimonialsCard 
                    rating='4.7/5'
                    image={TylerL}
                    name='Tyler L'
                    review='Amazing food, amazing workers, everything was AMAZING!!!!'
                />
                <TestimonialsCard 
                    rating='4.7/5'
                    image={SkylarR}
                    name='Skylar R'
                    review='Great food, not so great wait times for large groups. '
                />
                <TestimonialsCard 
                    rating='4.7/5'
                    image={MitchS}
                    name='Turkey?'
                    review='There was a bug in my food, that would normally be so gross. I’m a bird so it ended up being fine but still.'
                />
                <TestimonialsCard 
                    rating='4.7/5'
                    image={DustyB}
                    name='Dusty B'
                    review='The atmosphere of the restaurant was great, and I really like the new reservation page on the site!'
                />
            </section>
        </div>
    );
}

export default Testimonials;