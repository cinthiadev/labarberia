import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebaseConnection'; // Import db and storage
import { addDoc, collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './carouselEdit.css';
import { toast } from 'react-toastify';

function CarouselEdit() {
  const [newImageHeader, setNewImageHeader] = useState({
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  });

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const id = 'onpmGmWakFAHPXKAX9Hu'; // Defina um ID único para o documento no Firestore
        const footerRef = doc(db, "imagensHeader", id); // Referência ao documento com ID
        const docSnap = await getDoc(footerRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Atualizar o estado com as URLs das imagens do Firestore
          setNewImageHeader({
            image1: data.image1 || '',
            image2: data.image2 || '',
            image3: data.image3 || '',
            image4: data.image4 || '',
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchImageUrls();
  }, []); // Executar apenas uma vez ao montar o componente

  const handleChange = async (event) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];

    if (file) {
      try {
        const storageRef = ref(storage, `images/${fieldName}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Update the corresponding image field in newImageHeader
        setNewImageHeader(prevState => ({
          ...prevState,
          [fieldName]: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAddImageHeader = async () => {
    try {
      const id = 'onpmGmWakFAHPXKAX9Hu'; // Defina um ID único para o documento no Firestore
      const footerRef = doc(db, "imagensHeader", id); // Referência ao documento com ID

      // Filtrar apenas os campos que foram modificados com novas URLs de imagem
      const updatedFields = Object.keys(newImageHeader)
        .filter(key => newImageHeader[key])
        .reduce((acc, key) => {
          acc[key] = newImageHeader[key];
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
      const id = 'onpmGmWakFAHPXKAX9Hu'; // Defina um ID único para o documento no Firestore
      const footerRef = doc(db, "imagensHeader", id); // Referência ao documento com ID

      // Atualizar o campo específico para uma string vazia
      await updateDoc(footerRef, { [fieldName]: '' });

      // Atualizar o estado local
      setNewImageHeader(prevState => ({
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
      <section className="section-admin edit-header" id="edit-about">
        <h2>Header</h2>
        <div className="content-edit header-images-slider">
          <div className="slider-edit-header">
            <img src={newImageHeader.image1} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="image1"
                name="image1"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('image1').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('image1')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            <img src={newImageHeader.image2} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="image2"
                name="image2"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('image2').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('image2')}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="slider-edit-header">
            <img src={newImageHeader.image3} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="image3"
                name="image3"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('image3').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('image3')}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="slider-edit-header">
            <img src={newImageHeader.image4} />
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="image4"
                name="image4"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('image4').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('image4')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="btn-actions">
          <button className="button-save-changes-member" onClick={handleAddImageHeader}>Save Changes</button>
        </div>
      </section>
    </div>
  );
}

export default CarouselEdit;