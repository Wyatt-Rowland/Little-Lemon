import Guys1 from '../images/LL Guys 1.png'
import Guys2 from '../images/LL guys 2.png'


const SiteInfo = () => {
    return (
      <section className="site-info">
        <section className='site-text'>
            <header className="site-info-header">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
            </header>
            <article className="site-info-content">
                <p>
                    Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant.
                </p>
                <p>
                    To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
                </p>
            </article>
        </section>
        <section className='site-pics'>
            <div className="site-info-images">
                <img
                    src={Guys2}
                    alt="Image representing Mario and Adrian's culinary journey"
                    className="top-left-image site-img"
                />
                <img
                    src={Guys1}
                    alt="Image representing Little Lemon's restaurant ambiance"
                    className="top-right-image site-img"
                />
            </div>
        </section>
      </section>
    );
  };
  
  export default SiteInfo;