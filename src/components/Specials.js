import greekSalad from '../images/greek salad.jpg'
import bruchetta from '../images/bruchetta.svg'
import lemonDesert from '../images/lemon dessert.jpg'
import SpecialsCard from './SpecialsCard'


const Specials = () => {
    return (
        <section className="specials-container flex-center align-center column">
            <div className="text-button">
                <h1 className="specials-title">This Weeks Specials!</h1>
                <button className="specials-button">Online Menu</button>
            </div>
            <div className="specials-card flex-evenly">
                <SpecialsCard 
                    image={greekSalad}
                    title="Greek Salad"
                    price="$12.99"
                    description="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "
                />
                <SpecialsCard 
                    image={bruchetta}
                    title='Bruchetta'
                    price="$ 5.99"
                    description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
                />
                <SpecialsCard 
                    image={lemonDesert}
                    title="Lemon Dessert"
                    price="$ 5.00"
                    description="This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined. "
                />
            </div>
        </section>
    )
}
export default Specials;