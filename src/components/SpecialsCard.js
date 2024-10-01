import moped from '../images/moped2.png'

const SpecialsCard = ({ image, title, price, description }) => (
    <div className="card flex-between column">
        <img className='card-img' src={image} alt={title} loading='lazy'/>
        <div  className='card-text'>
            <div className='card-title flex-between'>
                <h3>{title}</h3>
                <h3 className='card-price'>{price}</h3>
            </div>
            <p>{description}            </p>
            <div className='card-button flex align-center'>
                <a href="#order" as='h4'>Order a delivery </a>
                <img className='moped-icon' src={moped} alt='moped icon' />
            </div>
        </div>
    </div>
);

export default SpecialsCard;