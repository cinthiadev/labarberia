import React, { useEffect, useState } from "react";
import './locationEdit.css';
import { db } from '../../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

function LocationEdit() {
  const [locationData, setLocationData] = useState({
    description1: "",
    description2: "",
    address: "",
    googleAddressURL: "",
    observation: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setLocationData({
      ...locationData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationRef = collection(db, "location");
        const querySnapshot = await getDocs(locationRef);

        if (!querySnapshot.empty) {
          const locationDoc = querySnapshot.docs[0];
          const data = locationDoc.data();
          data.id = locationDoc.id;
          setLocationData(data);
        } else {
          console.warn("No document found in the 'location' collection.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        toast.error("An error occurred while fetching location data.");
      }
    };

    fetchLocationData();
  }, []);

  const handleSave = async () => {
    try {
      if (!locationData.id) {
        console.error("Missing document ID for footer data.");
        toast.error("An error occurred. Please try again.");
        return; // Exit if no ID is available
      }

      const locationRef = doc(db, "location", locationData.id); // Create reference with ID
      await updateDoc(locationRef, locationData);
      setIsEdit(false);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data.");
    }
  };
  return (
    <div className="container">
      <section className="section-admin edit-ourlocation" id="edit-ourlocation">
        <h2>Our Location</h2>

        <div className="content-edit ourlocation">
          <h3>Description</h3>
          <textarea
            id="description1"
            name="description1"
            value={locationData.description1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-edit">
          <textarea
            id="description2"
            name="description2"
            value={locationData.description2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-edit">
          <h3>Location Address</h3>
          <textarea
            id="address"
            name="address"
            value={locationData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-edit">
          <h3>Google Address URL</h3>
          <textarea
            id="googleAddressURL"
            name="googleAddressURL"
            value={locationData.googleAddressURL}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-edit">
          <textarea
            id="observation"
            name="observation"
            value={locationData.observation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="btn-actions">
          <button className="button-save-changes-member" onClick={handleSave}>Save Changes</button>
        </div>
      </section>
    </div>
  );
}

export default LocationEdit;