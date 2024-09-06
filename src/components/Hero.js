import restFood from '../images/restauranfood.jpg'

const Hero = () => {
    return (
        <div className='hero-container flex-between'>
            <div className='flex-center'>
                <h1 className='title-text'>Little Lemon</h1>
                <h2 className='location-text'>Chicago</h2>
                <p className='rest-description'>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. </p>
                <button className='reservation-button'>Reserve a Table</button>
            </div>
            <div>
                <img className='hero-img' src={restFood} alt='Delicious Restaurant Food'/>
            </div>
        </div>
    )
}
export default Hero;