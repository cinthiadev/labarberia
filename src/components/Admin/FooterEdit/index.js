import React, { useEffect, useState } from "react";
import './footerEdit.css';
import { db } from '../../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdOutlineCancel } from "react-icons/md";
import { FaPlus, FaCheck } from "react-icons/fa6";

function FooterEdit() {
  const [footerData, setFooterData] = useState({
    address: "",
    email: "",
    tel: "",
    title: "",
    schedules1: "",
    schedules2: "",
    schedules3: "",
    schedules4: ""
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setFooterData({
      ...footerData,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const footerRef = collection(db, "footer"); // Get a reference to the collection
        const querySnapshot = await getDocs(footerRef);

        // Assuming there's only one document in the "footer" collection
        const footerDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

        if (footerDoc) { // Check if a document exists
          const data = footerDoc.data();
          data.id = footerDoc.id;
          setFooterData(data);
        } else {
          console.warn("No document found in the 'footer' collection.");
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
        toast.error("An error occurred while fetching footer data.");
      }
    };

    fetchFooterData();
  }, [db]);

  const handleSave = async () => {
    try {
      if (!footerData.id) {
        console.error("Missing document ID for footer data.");
        toast.error("An error occurred. Please try again.");
        return; // Exit if no ID is available
      }

      const footerRef = doc(db, "footer", footerData.id); // Create reference with ID
      await updateDoc(footerRef, footerData);
      setIsEdit(false);
      toast.success("Footer data saved successfully!");
    } catch (error) {
      console.error("Error saving footer data:", error);
      toast.error("An error occurred while saving footer data.");
    }
  };


  const handleUpdateFooter = async () => {
    try {
      const footerRef = doc(db, "footer", "XnUSDidtNAOH37bgfYM0"); // Substitua "document-id-here" pelo ID real do documento
      await updateDoc(footerRef, footerData);
      toast.success("Footer updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update footer!");
    }
  };

  return (
    <div className="container">

      <section className="edit-footer">
        <h2>Footer</h2>
        <div className="footer-edit">
          <input
            type="tel"
            id="tel"
            name="tel"
            value={footerData.tel || ''}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={footerData.email || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="address"
            name="address"
            value={footerData.address || ''}
            onChange={handleChange}
            required
          />
            <input
            type="text"
            id="title"
            name="title"
            value={footerData.title || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="schedules1"
            name="schedules1"
            value={footerData.schedules1 || ''}
            onChange={handleChange}
            required
          />
<input
                  type="text"
                  id="schedules2"
                  name="schedules2"
                  value={footerData.schedules2 || ''}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  id="schedules3"
                  name="schedules3"
                  value={footerData.schedules3 || ''}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  id="schedules4"
                  name="schedules4"
                  value={footerData.schedules4 || ''}
                  onChange={handleChange}
                  required
                />
        </div>


        <div className="btn-actions">
          <button className="button-save-changes-member" onClick={handleSave}>Save Changes</button>
        </div>
      </section>
    </div >
  );
}

export default FooterEdit;