import { useEffect, useState } from 'react';
import './home.css';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import Gallery from '../../components/Gallery';
import AboutUs from '../../components/AboutUs';
import OurLocation from '../../components/OurLocation';
import OurServices from '../../components/OurServices';
import Team from '../../components/Team';
import Footer from '../../components/Footer';

const Home = () => {
  const initialVisibilityState = {
    header: true,
    aboutUs: true,
    ourLocation: true,
    ourServices: true,
    team: true,
    gallery: true,
    footer: true,
  };

  const [visibilityState, setVisibilityState] = useState(initialVisibilityState);

  useEffect(() => {
    const storedVisibility = JSON.parse(localStorage.getItem('visibilityState'));
    if (storedVisibility) {
      setVisibilityState(storedVisibility);
    }
  }, []);

  return (
    <div className="container">
      <Header />
      {visibilityState.header && <Carousel />}
      {visibilityState.aboutUs && <AboutUs />}
      {visibilityState.ourLocation && <OurLocation />}
      {visibilityState.ourServices && <OurServices />}
      {visibilityState.team && <Team />}
      {visibilityState.gallery && <Gallery />}
      {visibilityState.footer && <Footer />}
    </div>
  );
};

export default Home;