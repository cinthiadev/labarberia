import React, { useEffect, useState } from "react";
import './teamEdit.css';
import { db, storage } from '../../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

function TeamEdit() {
  const [teamData, setTeamData] = useState([]);
  const [newBarberData, setNewBarberData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageFile, setImageFile] = useState(null);


  const handleChange = (event, isNew = false) => {
    const { name, value, files } = event.target;
    if (name === 'imageUrl' && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Criar URL para a prévia da imagem
      if (isNew) {
        setNewBarberData({
          ...newBarberData,
          imageUrl: imageUrl
        });
      } else {
        setImageFile(file);
        setTeamData(prev => prev.map(item => item.id === event.target.id ? {
          ...item,
          imageUrl: imageUrl
        } : item));
      }
    } else {
      if (isNew) {
        setNewBarberData({
          ...newBarberData,
          [name]: value,
        });
      } else {
        setTeamData(prev => prev.map(item => item.id === event.target.id ? {
          ...item,
          [name]: value,
        } : item));
      }
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamRef = collection(db, "team");
        const querySnapshot = await getDocs(teamRef);
        const team = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setTeamData(team);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };

    fetchTeamData();
  }, []);

  const handleSave = async (id) => {
    try {
      // Verifica se o item com o ID fornecido existe em teamData
      const existingData = teamData.find(item => item.id === id);
      if (!existingData) {
        throw new Error(`Item with ID ${id} not found in teamData.`);
      }

      let imageUrl = existingData.imageUrl;

      if (imageFile) {
        const imageRef = ref(storage, `teamImages/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Atualiza os dados no estado local antes de enviar para o Firestore
      const updatedData = { ...existingData, imageUrl };
      const teamRef = doc(db, "team", id);
      await updateDoc(teamRef, updatedData);

      // Atualiza o estado local com os novos dados
      setTeamData(prevTeamData => prevTeamData.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      ));

      setIsEdit(false);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data.");
    }
  };

  const handleAddNew = async () => {
    try {
      let imageUrl = newBarberData.imageUrl;

      if (imageFile) {
        const imageRef = ref(storage, `teamImages/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const newDocRef = await addDoc(collection(db, "team"), { ...newBarberData, imageUrl });
      setTeamData([...teamData, { id: newDocRef.id, ...newBarberData, imageUrl }]);
      setNewBarberData({
        name: "",
        description: "",
        imageUrl: "",
      });
      setImageFile(null);
      setIsAdding(false);
      toast.success("New barber added successfully!");
    } catch (error) {
      console.error("Error adding new barber:", error);
      toast.error("An error occurred while adding new barber.");
    }
  };

  const handleCancelNewBarber = () => {
    setNewBarberData({
      name: "",
      description: "",
      imageUrl: "",
    });
    setImageFile(null);
    setIsAdding(false);
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "team", id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setTeamData(teamData.filter(item => item.id !== id));
      toast.success("Barber deleted successfully!");
    } catch (error) {
      console.error("Error deleting barber:", error);
      toast.error("An error occurred while deleting barber.");
    }
  };

  const handleSaveNewBarber = async () => {
    try {
      let imageUrl = newBarberData.imageUrl;

      if (imageFile) {
        const imageRef = ref(storage, `teamImages/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const newDocRef = await addDoc(collection(db, "team"), { ...newBarberData, imageUrl });
      setTeamData([...teamData, { id: newDocRef.id, ...newBarberData, imageUrl }]);
      setNewBarberData({
        name: "",
        description: "",
        imageUrl: "",
      });
      setImageFile(null);
      setIsAdding(false);
      toast.success("New barber added successfully!");
    } catch (error) {
      console.error("Error adding new barber:", error);
      toast.error("An error occurred while adding new barber.");
    }
  };


  return (
    <div className="container-team ">
      <h2>Team</h2>
      {teamData.map(barber => (
        <section className="section-admin edit-team group-members-edit " id="edit-team">

          <div key={barber.id} className="title-services-edit-team">
            <div className="image-member-page">
              <img className="image-member-edit" src={barber.imageUrl || ''} />
            </div>
            <div className="container-info">
              <div className="infos-members-edit">
                <h3>Name</h3>
                <input
                  type="text"
                  id={barber.id}
                  name="name"
                  value={barber.name}
                  onChange={(e) => handleChange(e, false)}
                  required
                />
              </div>
              <div className="description-member-desktop">
                <h3>Description</h3>
                <textarea
                  id={barber.id}
                  name="description"
                  value={barber.description}
                  onChange={(e) => handleChange(e, false)}
                  required
                />

                <div className="group-buttons-actions">
                  <div className="group-delete">
                    <button
                      className="button-delete-member"
                      onClick={() => handleDelete(barber.id, barber.imageUrl)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="group-change-save">
                    <input
                      type="file"
                      id="imageUrl"
                      name="imageUrl"
                      accept="image/*"
                      onChange={(e) => handleChange(e, false)}
                      style={{ display: 'none' }}
                    />
                    <button
                      className="button-change-photo-member"
                      onClick={() => document.getElementById('imageUrl').click()}
                    >
                      Change Photo
                    </button>
                    <button className="button-save-changes-member" onClick={() => handleSave(barber.id)}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-member-mobile">
            <h3>Description</h3>
            <textarea
              id={barber.id}
              name="description"
              value={barber.description}
              onChange={(e) => handleChange(e, false)}
              required
            />
            <div className="group-buttons-actions">
              <div className="group-delete">
                <button
                  className="button-delete-member"
                  onClick={() => handleDelete(barber.id, barber.imageUrl)}
                >
                  Delete
                </button>
              </div>
              <div className="group-change-save">
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  accept="image/*"
                  onChange={(e) => handleChange(e, false)}
                  style={{ display: 'none' }}
                />
                <button
                  className="button-change-photo-member"
                  onClick={() => document.getElementById('imageUrl').click()}
                >
                  Change Photo
                </button>
                <button className="button-save-changes-member" onClick={() => handleSave(barber.id)}>Save Changes</button>
              </div>
            </div>
          </div>
        </section>
      ))
      }

      {
        isAdding && (
          <div className="add-barber">
            <div className="title-services-edit-team">
              <img className="image-member image-member-add" src={newBarberData.imageUrl || ''} /> {/* Corrigido aqui */}

              <div className="container-info">
                <div className="infos-members-edit">
                  <h3>Name</h3>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newBarberData.name}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />

                </div>
                <div className="description-member-desktop">
                  <h3>Description</h3>
                  <textarea
                    id="description"
                    name="description"
                    value={newBarberData.description}
                    onChange={(e) => handleChange(e, true)}
                    required
                  />
                  <div className="group-buttons-actions">
                <div className="group-delete">
                  <button
                    className="button-delete-member"
                    onClick={handleCancelNewBarber}
                  >
                    Cancel
                  </button>
                </div>
                <div className="group-change-save">
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="button-change-photo-member"
                    onClick={() => document.getElementById('imageUrl').click()}
                  >
                    Add Photo
                  </button>
                  <button className="button-save-changes-member" onClick={handleSaveNewBarber}>Save</button>
                </div>
              </div>
                </div>

              </div>

            </div>
            <div className="description-member-mobile">
              <h3>Description</h3>
              <textarea
                id="description"
                name="description"
                value={newBarberData.description}
                onChange={(e) => handleChange(e, true)}
                required
              />
              <div className="group-buttons-actions">
                <div className="group-delete">
                  <button
                    className="button-delete-member"
                    onClick={handleCancelNewBarber}
                  >
                    Cancel
                  </button>
                </div>
                <div className="group-change-save">
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="button-change-photo-member"
                    onClick={() => document.getElementById('imageUrl').click()}
                  >
                    Add Photo
                  </button>
                  <button className="button-save-changes-member" onClick={handleSaveNewBarber}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )
      }


      {
        !isAdding && (
          <div className="btn-actions-team">
            <button className="btn-admin-add" onClick={() => setIsAdding(true)}>Add New Barber</button>
          </div>
        )
      }

    </div >

  );
}

export default TeamEdit;