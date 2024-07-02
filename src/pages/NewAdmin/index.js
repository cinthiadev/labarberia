import React, { useEffect, useState, useContext } from "react";
import './newAdmin.css';
import Header from "../../components/HeaderAdminPanel";
import { db, storage } from '../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdOutlineCancel } from "react-icons/md";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { TiCancel } from "react-icons/ti";
import logoFooter from "../../assets/images/04 logo_horizontal_mini.png";
import { FaRegFileImage } from "react-icons/fa";
import imageHeader from "../../assets/images/1-topslider02.png";
//admin
import Visibility from '../../components/Admin/Visibility';
import FooterEdit from '../../components/Admin/FooterEdit';
import ServiceEdit from '../../components/Admin/ServiceEdit';
import AboutEdit from '../../components/Admin/AboutEdit';
import LocationEdit from '../../components/Admin/LocationEdit';
import CarouselEdit from '../../components/Admin/CarouselEdit';
import TeamEdit from '../../components/Admin/TeamEdit';
import BackgroundsEdit from '../../components/Admin/BackgroundsEdit';
import GalleryEdit from '../../components/Admin/GalleryEdit';
import { AuthContext } from '../../contexts/auth';

function NewAdmin() {

  const { user, logout } = useContext(AuthContext);
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="container-admin-panel">
     
      
      <div className="logo-admin">
        <img src={logoFooter} alt='logo' />
        <button onClick={handleLogout} className="btn-delete-logout">
          Logout
        </button>
      </div>

      <h1>Welcome to Admin Page</h1>

      <CarouselEdit />

      <AboutEdit />

      <LocationEdit />

      <TeamEdit />
      
      <ServiceEdit />

      <GalleryEdit />

      <FooterEdit />

      <Visibility />

      <BackgroundsEdit />

      <div className="btn-delete-logout-footer">
        <button onClick={handleLogout} className="btn-delete-logout">
          Logout
        </button>
      </div>
    </div>
  );
}

export default NewAdmin;