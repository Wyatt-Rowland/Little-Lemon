import { Link } from 'react-router-dom';  // Import Link for navigation
import restImg from '../images/Restaurant Image.png'

const Footer = () => {
    return (
      <footer>
        <section className='doormat-contact footer-section'>
          <nav>
            <h3>Doormat Navigation</h3>
            <ul className='doormat-nav footer-list'>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/menu" className="nav-link">Menu</Link></li>
              <li><Link to="/reservations" className="nav-link">Reservations</Link></li>
              <li><Link to="/order-online" className="nav-link">Order Online</Link></li>
              <li><Link to="/login" className="nav-link">Login</Link></li>
            </ul>
          </nav>
          <div className='contact'>
            <h3>Contact Us</h3>
              <ul className='footer-list'>
                <li>Address</li>
                <li>Phone number</li>
                <li>Email</li>              
              </ul>            
          </div>
        </section>
        <section className='img-social footer-section'>
          <img className='footer-img' src={restImg} />
          <div className='social-links'>
            <h3>Social Media Links</h3>
            <ul className='footer-list'>
              <li>Facebook</li>
              <li>LinkedIn</li>
            </ul>            
          </div>

        </section>
      </footer>
    );
  }
  
  export default Footer;