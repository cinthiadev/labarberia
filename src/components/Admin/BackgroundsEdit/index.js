import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebaseConnection'; // Import db and storage
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './backgroundsEdit.css';
import { toast } from 'react-toastify';

function BackgroundsEdit() {
  const [newBackgrounds, setNewBackgrounds] = useState({
    aboutImage1: '',
    aboutImage2: '',
    locationImage1: '',
    locationImage2: '',
    servicesImage1: '',
    servicesImage2: '',
  });

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const id = 'idbackgrounds'; // Defina um ID único para o documento no Firestore
        const footerRef = doc(db, "backgrounds", id); // Referência ao documento com ID
        const docSnap = await getDoc(footerRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Atualizar o estado com as URLs das imagens do Firestore
          setNewBackgrounds({
            aboutImage1: data.aboutImage1 || '',
            aboutImage2: data.aboutImage2 || '',
            locationImage1: data.locationImage1 || '',
            locationImage2: data.locationImage2 || '',
            servicesImage1: data.servicesImage1 || '',
            servicesImage2: data.servicesImage2 || '',
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("An error occurred while fetching images.");
      }
    };

    fetchImageUrls();
  }, []); // Executar apenas uma vez ao montar o componente

  const handleChange = async (event) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];

    if (file) {
      try {
        const storageRef = ref(storage, `backgrounds/${fieldName}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Update the corresponding image field in newBackgrounds
        setNewBackgrounds(prevState => ({
          ...prevState,
          [fieldName]: imageUrl,
        }));
        toast.success(`${fieldName} uploaded successfully!`);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("An error occurred while uploading the image.");
      }
    }
  };

  const handleAddBackgrounds = async () => {
    try {
      const id = 'idbackgrounds'; // Defina um ID único para o documento no Firestore
      const footerRef = doc(db, "backgrounds", id); // Referência ao documento com ID

      // Filtrar apenas os campos que foram modificados com novas URLs de imagem
      const updatedFields = Object.keys(newBackgrounds)
        .filter(key => newBackgrounds[key])
        .reduce((acc, key) => {
          acc[key] = newBackgrounds[key];
          return acc;
        }, {});

      await updateDoc(footerRef, updatedFields);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data.");
    }
  };

  const handleDeleteImage = async (fieldName) => {
    try {
      const id = 'idbackgrounds'; // Defina um ID único para o documento no Firestore
      const footerRef = doc(db, "backgrounds", id); // Referência ao documento com ID

      // Atualizar o campo específico para uma string vazia
      await updateDoc(footerRef, { [fieldName]: '' });

      // Atualizar o estado local
      setNewBackgrounds(prevState => ({
        ...prevState,
        [fieldName]: '',
      }));

      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred while deleting the image.");
    }
  };

  return (
    <div className="container">
      <section className="section-admin edit-header" id="edit-backgrounds">

        <h2>Background Images</h2>
        <h2>About Us</h2>
        <div className="content-edit header-images-slider">
          <div className="slider-edit-header">
            <img src={newBackgrounds.aboutImage1}  />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="aboutImage1"
                name="aboutImage1"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('aboutImage1').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('aboutImage1')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            <img src={newBackgrounds.aboutImage2}  />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="aboutImage2"
                name="aboutImage2"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('aboutImage2').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('aboutImage2')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <h2>Our Location</h2>
        <div className="content-edit header-images-slider">
          <div className="slider-edit-header">
            <img src={newBackgrounds.locationImage1} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="locationImage1"
                name="locationImage1"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('locationImage1').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('locationImage1')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            <img src={newBackgrounds.locationImage2}  />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="locationImage2"
                name="locationImage2"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('locationImage2').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('locationImage2')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <h2>Our Services</h2>
        <div className="content-edit header-images-slider">
          <div className="slider-edit-header">
            <img src={newBackgrounds.servicesImage1} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="servicesImage1"
                name="servicesImage1"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} 
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('servicesImage1').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('servicesImage1')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="btn-actions">
          <button className="button-save-changes-member" onClick={handleAddBackgrounds}>Save Changes</button>
        </div>
      </section>
    </div>
  );
}

export default BackgroundsEdit;