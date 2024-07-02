import './carousel.css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import logoCarousel from "../../assets/images/logo_winstonNC2.png";
import { db } from '../../services/firebaseConnection';
import { collection, getDocs } from "firebase/firestore";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Carousel() {
    const [newImageHeader, setNewImageHeader] = useState({
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    });

    useEffect(() => {
        const fetchImageHeader = async () => {
            try {
                const footerRef = collection(db, "imagensHeader");
                const querySnapshot = await getDocs(footerRef);
                const footerDoc = querySnapshot.docs[0];

                if (footerDoc) {
                    const data = footerDoc.data();
                    setNewImageHeader(data);
                } else {
                    console.warn("No document found in the 'footer' collection.");
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchImageHeader();
    }, []);

    return (
        <div className='hero' id='home'>
            <div className="carousel-bg">
                <img className="logoBgCarousel" src={logoCarousel} alt='logo-main' />
            </div>
            <div className='images'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    effect={'fade'}
                    loop={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectFade, Navigation, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide> <img src={newImageHeader.image1} alt="Slide 1" /></SwiperSlide>
                    <SwiperSlide> <img src={newImageHeader.image2} alt="Slide 2" /></SwiperSlide>
                    <SwiperSlide> <img src={newImageHeader.image3} alt="Slide 3" /></SwiperSlide>
                    <SwiperSlide> <img src={newImageHeader.image4} alt="Slide 4" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Carousel;