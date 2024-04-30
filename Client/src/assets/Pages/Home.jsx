import { NavLink } from "react-router-dom";
import { useAuth } from '../ContextApi/ContApi';
import styles from '../Pages/Home.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
    const { isLoggedIn, user } = useAuth();

    const settings = {
        //dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };


    return (
        <>
            <div className={styles.homenav}>
                <ul>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </div>
            <section className={styles.headersection}>
                <img src="/Programing.jpg" alt="Programming" />
                <div className={styles.homehadding}>
                    <h1>Welcome to <span className={styles.name}>{isLoggedIn && user ? user.username : ''}</span> my website</h1>
                    <p> First MERN Stack Project!</p>
                </div>
            </section>
            <section className={styles.slidersection}>
                <h2>Skills</h2>
                <div className="slider-containers">
                    <Slider {...settings}>
                        <div>
                            <div className='slidecartbox' >
                                <img src="/database.png" alt="Skill 1" />
                                <h3>MongoDB</h3>
                                <p><b>Experience:</b> 3 Month</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/css.png" alt="Skill 2" />
                                <h3>Css</h3>
                                <p><b>Experience:</b> 1 year</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/html.png" alt="Skill 4" />
                                <h3>HTML</h3>
                                <p><b>Experience:</b> 1 year</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/node-js.png" alt="Skill 5" />
                                <h3>Node.js</h3>
                                <p><b>Experience:</b> 3 Month</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/react.png" alt="Skill 4" />
                                <h3>React.js</h3>
                                <p><b>Experience:</b> 3 Month</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/express-js.png" alt="Skill 4" />
                                <h3>Express.js</h3>
                                <p><b>Experience:</b> 3 Month</p>
                            </div>
                        </div>
                        <div>
                            <div className='slidecartbox'>
                                <img src="/javascript.png" alt="Skill 4" />
                                <h3>Javascript</h3>
                                <p><b>Experience:</b> 1 year</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>
            <section className={styles.testmonial}>
                <h2>Testimonial</h2>

            </section>
        </>
    );
};

export default Home;
