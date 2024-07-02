import { useState, useEffect } from "react";
import './gallery.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebaseConnection';

function Gallery() {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchImageHeader = async () => {
            try {
                const footerRef = collection(db, "imagensHeader"); // Get a reference to the collection
                const querySnapshot = await getDocs(footerRef);

                // Assuming there's only one document in the "imagensHeader" collection
                const footerDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

                if (footerDoc) { // Check if a document exists
                    const data = footerDoc.data();
                    const urls = [
                        data.imageGallery1,
                        data.imageGallery2,
                        data.imageGallery3,
                        data.imageGallery4,
                        data.imageGallery5,
                        data.imageGallery6,
                        data.imageGallery7,
                        data.imageGallery8
                    ].filter(Boolean); // Filter out any undefined or null values
                    setImageUrls(urls);
                } else {
                    console.warn("No document found in the collection.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error
            }
        };

        fetchImageHeader();
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const currentIndex = imageUrls.indexOf(selectedImage);
        if (currentIndex < imageUrls.length - 1) {
            setSelectedImage(imageUrls[currentIndex + 1]);
        }
    };

    const prevImage = () => {
        const currentIndex = imageUrls.indexOf(selectedImage);
        if (currentIndex > 0) {
            setSelectedImage(imageUrls[currentIndex - 1]);
        }
    };

    return (
        <div className='content'>
            <section className="gallery" id="gallery">
                <div className=''>
                    <h2>Gallery</h2>
                    <div className="images-gallery">
                        {imageUrls.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                onClick={() => openModal(image)}
                            />
                        ))}

                        {selectedImage && (
                            <div className="modal">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <img src={selectedImage} alt="Selected" />
                                <button className="prev" onClick={prevImage}>&#10094;</button>
                                <button className="next" onClick={nextImage}>&#10095;</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Gallery;