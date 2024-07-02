import './header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoHeader from "../../assets/images/05 rosto.png";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import CheckinButton from '../../components/CheckinButton';

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenBackground, setMenuOpenBackground] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setMenuOpenBackground(!menuOpen);
    };

    const scrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = targetElement.getBoundingClientRect().top;
            scroll.scrollTo(offset, {
                duration: 800,
            });
            setMenuOpen(false);
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setMenuOpenBackground(false);
    };

    return (
        <div className="content">

            <header>

                <Link className='logoHeader' to="https://www.labarberiasc.com/"> <img src={logoHeader} alt='logo header' /> </Link>

                <div className={`menu-toggle ${menuOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
                    {!menuOpen ? (
                        <div className='menu-bar'>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    ) : (
                        <div className="close-icon">x</div>
                    )}
                </div>

                <nav className={`navbar ${menuOpen ? 'open' : ''} ${menuOpenBackground ? 'open-background' : ''}`}>
                    <ScrollLink
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        className="nav-link"
                        onClick={() => closeMenu()}
                    >Home</ScrollLink>
                    <ScrollLink
                        to="about-us"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        className="nav-link"
                        onClick={() => closeMenu()}
                    >About us</ScrollLink>
                    <ScrollLink
                        to="services"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        className="nav-link"
                        onClick={() => closeMenu()}
                    >Services</ScrollLink>
                    <ScrollLink
                        to="gallery"
                        spy={true}
                        smooth={true}
                        offset={-60}
                        duration={500}
                        className="nav-link"
                        onClick={() => closeMenu()}
                    >Gallery</ScrollLink>

                </nav>

                <div className='social-media'>
                    <a className='icon-social-media' href='https://www.instagram.com/labarberiasocialclub' target='_blank'><FaInstagram size={20} /></a>
                    <a className='icon-social-media' href='https://www.facebook.com/profile.php?id=61554720562847' target='_blank'><FaFacebook size={20} /></a>
                </div>
            </header>

        </div>
    );
}

export default Header;
