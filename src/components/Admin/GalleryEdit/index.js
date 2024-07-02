import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebaseConnection'; // Import db and storage
import { addDoc, collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './galleryEdit.css';
import { toast } from 'react-toastify';

function GalleryEdit() {
  const [newImageHeader, setNewImageHeader] = useState({
    imageGallery1: '',
    imageGallery2: '',
    imageGallery3: '',
    imageGallery5: '',
    imageGallery6: '',
    imageGallery7: '',
    imageGallery8: ''
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
            imageGallery1: data.imageGallery1 || '',
            imageGallery2: data.imageGallery2 || '',
            imageGallery3: data.imageGallery3 || '',
            imageGallery4: data.imageGallery4 || '',
            imageGallery5: data.imageGallery5 || '',
            imageGallery6: data.imageGallery6 || '',
            imageGallery7: data.imageGallery7 || '',
            imageGallery8: data.imageGallery8 || '',
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
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Update the corresponding image field in newImageHeader with the URL
        setNewImageHeader(prevState => ({
          ...prevState,
          [fieldName]: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file.");
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
      <section className="section-admin edit-gallery" id="edit-gallery">
        <h2>Gallery</h2>
        <div className="content-edit header-images-slider">
          <div className="slider-edit-header">
            {newImageHeader.imageGallery1 && (
              <img src={newImageHeader.imageGallery1} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery1"
                name="imageGallery1"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery1').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery1')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery2 && (
              <img src={newImageHeader.imageGallery2} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery2"
                name="imageGallery2"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery2').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery2')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery3 && (
              <img src={newImageHeader.imageGallery3} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery3"
                name="imageGallery3"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery3').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery3')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery4 && (
              <img src={newImageHeader.imageGallery4} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery4"
                name="imageGallery4"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery4').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery4')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery5 && (
              <img src={newImageHeader.imageGallery5} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery5"
                name="imageGallery5"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery5').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery5')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery6 && (
              <img src={newImageHeader.imageGallery6} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery6"
                name="imageGallery6"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery6').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery6')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery7 && (
              <img src={newImageHeader.imageGallery7} />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery7"
                name="imageGallery7"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery7').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery7')}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="slider-edit-header">
            {newImageHeader.imageGallery8 && (
              <img src={newImageHeader.imageGallery8}  />
            )}
            <div className="btn-actions-header-images-slider">
              <input
                type="file"
                id="imageGallery8"
                name="imageGallery8"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the input
              />
              <button
                className="btn-admin-save btn-upload-header-images-slider"
                onClick={() => document.getElementById('imageGallery8').click()}
              >
                Upload
              </button>
              <button
                className="btn-admin-save btn-delete-header-images-slider"
                onClick={() => handleDeleteImage('imageGallery8')}
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

export default GalleryEdit;