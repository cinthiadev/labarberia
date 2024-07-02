import React, { useEffect, useState } from "react";
import './aboutEdit.css';
import { db } from '../../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

function AboutEdit() {
  const [aboutData, setAboutData] = useState({
    description1: "",
    description2: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setAboutData({
      ...aboutData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutRef = collection(db, "about");
        const querySnapshot = await getDocs(aboutRef);

        const aboutDoc = querySnapshot.docs[0];

        if (aboutDoc) {
          const data = aboutDoc.data();
          data.id = aboutDoc.id;
          setAboutData(data);
        } else {
          console.warn("No document found in the 'about' collection.");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast.error("An error occurred while fetching about data.");
      }
    };

    fetchAboutData();
  }, []);

  const handleSave = async () => {
    try {
      if (!aboutData.id) {
        console.error("Missing document ID for about data.");
        toast.error("An error occurred. Please try again.");
        return;
      }

      const aboutRef = doc(db, "about", aboutData.id);
      await updateDoc(aboutRef, {
        description1: aboutData.description1,
        description2: aboutData.description2,
      });
      setIsEdit(false);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error("An error occurred while saving data.");
    }
  };

  return (
    <div className="container">
      <section className="section-admin edit-about" id="edit-about">
        <h2>About Us</h2>
        <div className="content-edit about">
          <h3>Description</h3>
          <textarea
            id="description1"
            name="description1"
            value={aboutData.description1}
            onChange={handleChange}
            required
          />
          <textarea
            id="description2"
            name="description2"
            value={aboutData.description2}
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

export default AboutEdit;