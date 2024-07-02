
import './aboutUs.css';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function AboutUs() {

  const [aboutData, setAboutData] = useState({
    description1: "",
    description2: "",
  });

  const [newBackgrounds, setNewBackgrounds] = useState({
    aboutImage1: '',
    aboutImage2: ''
  });

  useEffect(() => {
    const fetchImageHeader = async () => {
      try {
        const footerRef = collection(db, "backgrounds"); // Get a reference to the collection
        const querySnapshot = await getDocs(footerRef);

        // Assuming there's only one document in the "footer" collection
        const footerDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

        if (footerDoc) { // Check if a document exists
          const data = footerDoc.data();
          setNewBackgrounds(data);
        } else {
          console.warn("No document found in the 'footer' collection.");
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
        // Handle error
      }
    };

    fetchImageHeader();
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutRef = collection(db, "about"); // Get a reference to the collection
        const querySnapshot = await getDocs(aboutRef);

        // Assuming there's only one document in the "footer" collection
        const aboutDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

        if (aboutDoc) { // Check if a document exists
          const data = aboutDoc.data();
          setAboutData(data);
        } else {
          console.warn("No document found in the 'about' collection.");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        // Handle error
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className='container'>
      <section className="about-us-mobile" id="about-us">
        <div className="parallax-about" >
          <div className="background-about1" >
            <img src={newBackgrounds.aboutImage1} />
            <div className="about-description">
              <h2>About us</h2>
              <p>{aboutData.description1}</p>
              <p>{aboutData.description2}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-us-desktop" id="about-us">
        <div className="parallax-about" >
          <div className="background-about1" style={{ backgroundImage: `url(${newBackgrounds.aboutImage1})` }} >
            <div className="about-description">
              <h2>About us</h2>
              <p>{aboutData.description1}</p>
              <p>{aboutData.description2}</p>
            </div>
          </div>
          <div className="background-about2" style={{ backgroundImage: `url(${newBackgrounds.aboutImage2})` }} ></div>
        </div>
      </section >
    </div >
  );
}

export default AboutUs;
