import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './footer.css';
import { FaRegCopyright } from "react-icons/fa6";
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import logoFooter from "../../assets/images/06 logo_horizontal_semrosto.png";

function Footer() {

  const [footerData, setFooterData] = useState({
    address: "",
    email: "",
    tel: "",
    schedules1: "",
    schedules2: "",
    schedules3: "",
    schedules4: ""
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const footerRef = collection(db, "footer"); // Get a reference to the collection
        const querySnapshot = await getDocs(footerRef);

        // Assuming there's only one document in the "footer" collection
        const footerDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

        if (footerDoc) { // Check if a document exists
          const data = footerDoc.data();
          setFooterData(data);
        } else {
          console.warn("No document found in the 'footer' collection.");
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
        // Handle error
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div className="content">
   
      <footer>
        <img src={logoFooter} className="logo-footer" alt='logo footer' />
        <div className="contact-info">
          <p>{footerData.tel}</p>
          <p>{footerData.email}</p>
          <p>{footerData.address}</p>
        </div>
        <div className="opening-hours">
          <p style={{ paddingBottom: '10px'}}>Opening Hours:</p>
          <p>{footerData.schedules1}</p>
          <p>{footerData.schedules2}</p>
          <p>{footerData.schedules3}</p>
          <p>{footerData.schedules4}</p>
        </div>
        <div className='admin-panel'>
          <Link to="/login" target='_blank'>
            <p style={{ paddingBottom: '10px'}}>Administrator Panel</p>
          </Link>
        </div>
        <div className="copyright">
          <p><FaRegCopyright className="icon-copy-footer" /> La Barberia 2023. All rights reserved.</p>
        </div>
      </footer>
     </div>
  );

}

export default Footer;