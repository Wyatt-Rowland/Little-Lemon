import greekSalad from '../images/greek salad.jpg'
import moped from '../images/moped2.png'

const Specials = () => {
    return (
        <div className="specials-container">
            <div className="text-button">
                <h1 className="specials-title">This Weeks Specials!</h1>
                <button className="specials-button">Online Menu</button>
            </div>
            <div className="specials-card">
                <div className="card">
                    <img src={greekSalad} alt='greek salad'/>
                    <div>
                        <div className='card-title'>
                            <h3>Greek Salad</h3>
                            <h3 className='card-price'>$12.99</h3>
                        </div>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </p>
                        <div className='card-button'>
                            <a as='h4'>Order a delivery </a>
                            <img className='moped-icon' src={moped} alt='moped icon' />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img className='card-img' src={greekSalad} alt='greek salad'/>
                </div>
                <div className="card">
                    <img className='card-img' src={greekSalad} alt='greek salad'/>

                </div>
            </div>
        </div>
    )
}
export default Specials;