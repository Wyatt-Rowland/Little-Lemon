import React, {useState} from "react";
import checked from '../images/checked.png'
import unchecked from '../images/unchecked.webp'

const BookingPage = () => {
    const [formPage, setFormPage] = useState();

    return (
        <div className="reservation-container">
            <section className="reservation-form">
                <h3>Form Progress</h3>
                <div class="dashboard">
                    <svg>
                        <circle class="bg" cx="57" cy="57" r="52" />
                        <circle class="meter-3" cx="57" cy="57" r="52" />
                    </svg>
                    
                    {/* <svg>
                        <circle class="bg" cx="57" cy="57" r="52" />
                        <circle class="meter-2" cx="57" cy="57" r="52" />
                    </svg>
                    <svg>
                        <circle class="bg" cx="57" cy="57" r="52" />
                        <circle class="meter-3" cx="57" cy="57" r="52" />
                    </svg> */}
                </div>
                <h3>Reservation Information</h3>
                <div className="form-inputs">
                    <div className="form-group">
                        <label htmlFor="Guest Number">Guest Numbers</label>
                            <select name="guests" id="guests">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>                                
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateTime">Date and Time</label>
                        <input 
                            type="datetime-local" 
                            id="dateTime" 
                            name="dateTime" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateTime">Date and Time</label>
                        <input 
                            type="datetime-local" 
                            id="dateTime" 
                            name="dateTime" 
                        />
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="Occasion">Occasion</label>
                        <select name="occasions" id="occasions">
                            <option value="Birthday">Birthday</option>
                            <option value="Date">Romantic Date</option>
                            <option value="Family Gathering">Family Gathering</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </div>


                <button className="button">Next</button>
            </section>
        </div>
    );
}

export default BookingPage;

