
const TestimonialsCard = ({ image, name, review, rating }) => (
    <div className="testimonial-card">
        <h3>{rating}</h3>
        <div className="testimonial-image-title flex-center">
            <img className='testimonial-image' src={image} alt={name} />
            <h3>{name}</h3>
        </div>
        <p className="testimonial-para">{review}</p>
    </div>
);

export default TestimonialsCard;