
import './ourLocation.css';
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function OurLocation() {

    const [locationData, setLocationData] = useState({
        description1: "",
        description2: "",
        address: "",
        googleAddressURL: "",
        observation: "",
    });

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const locationRef = collection(db, "location"); // Get a reference to the collection
                const querySnapshot = await getDocs(locationRef);

                // Assuming there's only one document in the "footer" collection
                const locationDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

                if (locationDoc) { // Check if a document exists
                    const data = locationDoc.data();
                    setLocationData(data);
                } else {
                    console.warn("No document found in the 'location' collection.");
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
                // Handle error
            }
        };

        fetchLocationData();
    }, []);


    const [newBackgrounds, setNewBackgrounds] = useState({
        locationImage1: '',
        locationImage2: '',
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

    return (
        <div className='container'>
            <section className="our-location-desktop" id="our-location">
                <div className="parallax-our-location" >
                    <img className="background-ourLocation1" src={newBackgrounds.locationImage1} />
                    <div className="background-ourLocation2" style={{ backgroundImage: `url(${newBackgrounds.locationImage2})` }}>
                        <div className="about-our-location">
                            <h2>Our Location</h2>
                            <p>{locationData.description1}</p>
                            <p>{locationData.description2}</p>
                            <p className='local'> <FaLocationDot className="iconLocation" />{locationData.address} </p>
                            <br />
                            <iframe src={locationData.googleAddressURL} width="100%" ></iframe>
                            <br />
                            <p>{locationData.observation}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="our-location-mobile" id="our-location">
                <div className="parallax-our-location" >
                    <div className="background-ourLocation2">
                        <img src={newBackgrounds.locationImage1} />
                        <div className="about-our-location">
                            <h2>Our Location</h2>
                            <p>{locationData.description1}</p>
                            <p>{locationData.description2}</p>
                            <p className='local'> <FaLocationDot className="iconLocation" />{locationData.address} </p>
                            <br />
                            <iframe src={locationData.googleAddressURL} width="100%" ></iframe>
                            <br />
                            <p>{locationData.observation}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OurLocation;
