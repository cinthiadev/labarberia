import React, { useEffect, useState } from "react";
import './adminCourses.css';
import Header from "../../components/HeaderAdminPanel";
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdOutlineCancel } from "react-icons/md";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { TiCancel } from "react-icons/ti";

function AdminCourses() {
  const [services, setServices] = useState([]);
  const [combos, setCombos] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newCombos, setNewCombos] = useState('');
  const [newCombosName, setNewCombosName] = useState('');
  const [newCombosDescription, setNewCombosDescription] = useState('');
  const [newCombosTime, setNewCombosTime] = useState('');
  const [newCombosPrice, setNewCombosPrice] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServiceTime, setNewServiceTime] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [showAddFieldsServices, setShowAddFieldsServices] = useState(false);
  const [showAddFieldsCombos, setShowAddFieldsCombos] = useState(false);
  const [showAddFieldsContinuouslyServices, setShowAddFieldsContinuouslyServices] = useState(false);
  const [showAddFieldsContinuouslyCombos, setShowAddFieldsContinuouslyCombos] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          editedName: doc.data().name,
          editedDescription: doc.data().description,
          editedTime: doc.data().time,
          editedPrice: doc.data().price
        }));
        // Ordenar os serviços com base na data de entrada em ordem decrescente
        const sortedServices = servicesData.sort((a, b) => {
          // Assuming createdAt is a timestamp
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setServices(sortedServices);
      } catch (error) {
        console.error("Error fetching services: ", error);
        toast.error("Failed to fetch services. Please try again.");
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "combos"));
        const combosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), editedName: doc.data().name, editedDescription: doc.data().description, editedTime: doc.data().time, editedPrice: doc.data().price }));
        setCombos(combosData);
      } catch (error) {
        console.error("Error fetching services: ", error);
        toast.error("Failed to fetch services. Please try again.");
      }
    };

    fetchServices();
  }, []);


  const handleEditClick = (id) => {
    setEditingItemId(id);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleSaveChangesServices = async (serviceId) => {
    try {
      const serviceToUpdate = services.find(service => service.id === serviceId);
      const { editedName, editedDescription, editedTime, editedPrice } = serviceToUpdate;

      // Validate required fields
      if (!editedName || !editedPrice) {
        toast.error('Fill in the name and price fields to save the changes!');
        return; // Exit the function if validation fails
      }

      const serviceRef = doc(db, 'services', serviceId);
      const updatedData = {
        name: editedName,
        description: editedDescription,
        time: editedTime,
        price: editedPrice
      };

      await updateDoc(serviceRef, updatedData);
      toast.success('Service changes saved successfully!');

      // Update the state with the modified service object (same logic as before)

      setEditingItemId(null);
    } catch (error) {
      console.error('Error updating service data:', error);
      toast.error('Failed to update the service. Please try again.');
    }
  };

  const handleSaveChangesCombos = async (comboId) => {
    try {
      const comboToUpdate = combos.find(combo => combo.id === comboId);
      const { editedName, editedDescription, editedTime, editedPrice } = comboToUpdate;

      // Validate required fields
      if (!editedName || !editedPrice) {
        toast.error('Fill in the name and price fields to save the changes!');
        return;
      }

      const comboRef = doc(db, 'combos', comboId);
      const updatedData = {
        name: editedName,
        description: editedDescription,
        time: editedTime,
        price: editedPrice
      };

      await updateDoc(comboRef, updatedData);
      toast.success('Combo changes saved successfully!');

      // Atualize o estado com o objeto de combo modificado (mesma lógica que antes)
      setEditingItemId(null);
    } catch (error) {
      console.error('Error updating combo data:', error);
      toast.error('Failed to update combo. Please try again.');
    }
  };


  const handleInputChange = (id, field, value) => {
    setServices(prevServices => prevServices.map(service => {
      if (service.id === id) {
        return { ...service, [field]: value };
      }
      return service;
    }));
  };

  const handleInputChangeCombos = (id, field, value) => {
    setCombos(prevCombos => prevCombos.map(combo => {
      if (combo.id === id) {
        return { ...combo, [field]: value };
      }
      return combo;
    }));
  };


  const handleDeleteService = async (serviceId) => {
    try {
      const serviceRef = doc(db, 'services', serviceId);
      await deleteDoc(serviceRef);
      toast.success('Service deleted successfully!');

      // Atualize o estado local removendo o serviço excluído
      setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete the service. Please try again.');
    }
  };

  const handleDeleteCombo = async (comboId) => {
    try {
      const serviceRef = doc(db, 'combos', comboId);
      await deleteDoc(serviceRef);
      toast.success('Combo successfully deleted!');

      // Atualize o estado local removendo o serviço excluído
      setServices(prevCombos => prevCombos.filter(combo => combo.id !== comboId));
    } catch (error) {
      console.error('Error when deleting the combo:', error);
      toast.error('Failed to delete the combo. Please try again.');
    }
  };



  const handleAddService = async () => {
    try {
      if (!newServiceName || !newServiceTime || !newServicePrice) {
        toast.error('Fill in all the fields to add the new service!');
        return;
      }

      const newServiceData = {
        name: newServiceName,
        description: newServiceDescription,
        time: newServiceTime,
        price: newServicePrice
      };

      const serviceRef = await addDoc(collection(db, "services"), newServiceData);
      toast.success('New service added successfully!');

      // Update state with the newly added service
      setServices([...services, { id: serviceRef.id, ...newServiceData }]); // Add new service ID to state array

      // Clear new service input fields
      setNewServiceName('');
      setNewServiceDescription('');
      setNewServiceTime('');
      setNewServicePrice('');
    } catch (error) {
      console.error('Error adding new service:', error);
      toast.error('Failed to add new service. Please try again.');
    }
  };

  const handleAddCombo = async () => {
    try {
      if (!newCombosName || !newCombosTime || !newCombosPrice) {
        toast.error('Fill in all the fields to add the new combo!');
        return;
      }

      const newCombosData = {
        name: newCombosName,
        description: newCombosDescription,
        time: newCombosTime,
        price: newCombosPrice
      };

      const comboRef = await addDoc(collection(db, "combos"), newCombosData);
      toast.success('New service added successfully!');

      // Update state with the newly added service
      setCombos([...combos, { id: comboRef.id, ...newCombosData }]); // Add new service ID to state array

      // Clear new service input fields
      setNewCombosName('');
      setNewCombosDescription('');
      setNewCombosTime('');
      setNewCombosPrice('');
    } catch (error) {
      console.error('Error when adding a new combo:', error);
      toast.error('Failed to add new combo. Please try again.');
    }
  };


  const handleToggleShowAddFieldsContinuouslyServices = () => {
    setShowAddFieldsContinuouslyServices(prevState => !prevState);
    if (!showAddFieldsContinuouslyServices) {
      setShowAddFieldsServices(true);
    }
  };

  const handleToggleShowAddFieldsContinuouslyCombos = () => {
    setShowAddFieldsContinuouslyCombos(prevState => !prevState);
    if (!showAddFieldsContinuouslyCombos) {
      setShowAddFieldsCombos(true);
    }
  };

  return (
    <div className="container-admin-panel">
      <Header />
      <div className="content-panel">
        <div className="intro-add-courses">
        </div>
        <section className="services" id="services">
          <h2>Our Services</h2>
          <div className="price-table table-main">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>What is included</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedName} onChange={(e) => handleInputChange(service.id, 'editedName', e.target.value)} />
                      ) : (
                        service.name
                      )}
                    </td>
                    <td>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedDescription} onChange={(e) => handleInputChange(service.id, 'editedDescription', e.target.value)} />
                      ) : (
                        service.description
                      )}
                    </td>
                    <td>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedTime} onChange={(e) => handleInputChange(service.id, 'editedTime', e.target.value)} />
                      ) : (
                        service.time
                      )}
                    </td>
                    <td>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedPrice} onChange={(e) => handleInputChange(service.id, 'editedPrice', e.target.value)} />
                      ) : (
                        service.price
                      )}
                    </td>
                    <td className="td-actions">
                      {editingItemId === service.id ? (
                        <>
                          <button className="button-save" onClick={() => handleSaveChangesServices(service.id)}><FaCheck className="icon" />Save</button>
                          <button className="button-cancel" onClick={handleCancelEdit}><MdOutlineCancel className="icon" />Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="button-edit" onClick={() => handleEditClick(service.id)}> <MdEdit className="icon" /> Edit</button>
                          <button className="button-del" onClick={() => handleDeleteService(service.id)}><MdDelete className="icon" />Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {showAddFieldsServices && (
                  <tr>
                    <td>
                      <input type="text" value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newServiceDescription} onChange={(e) => setNewServiceDescription(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newServiceTime} onChange={(e) => setNewServiceTime(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} />
                    </td>
                    <td className="td-actions">
                      <button className="button-save" onClick={handleAddService}><FaPlus className="icon" />Add</button>
                      <button className="button-cancel" onClick={() => setShowAddFieldsServices(false)}><MdOutlineCancel className="icon" />Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
            <button className="include" onClick={handleToggleShowAddFieldsContinuouslyServices}>Include Service</button>
            <table>
              <thead>
                <tr>
                  <th>Combos</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="actions"></th>
                </tr>
              </thead>
              <tbody>
                {combos.map((combo, index) => (
                  <tr key={index}>
                    <td>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.name} onChange={(e) => handleInputChangeCombos(combo.id, 'name', e.target.value)} />
                      ) : (
                        combo.name
                      )}
                    </td>
                    <td>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.description} onChange={(e) => handleInputChangeCombos(combo.id, 'description', e.target.value)} />
                      ) : (
                        combo.description
                      )}
                    </td>
                    <td>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.time} onChange={(e) => handleInputChangeCombos(combo.id, 'time', e.target.value)} />
                      ) : (
                        combo.time
                      )}
                    </td>
                    <td>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.price} onChange={(e) => handleInputChangeCombos(combo.id, 'price', e.target.value)} />
                      ) : (
                        combo.price
                      )}
                    </td>
                    <td className="td-actions">
                      {editingItemId === combo.id ? (
                        <>
                          <button className="button-save" onClick={() => handleSaveChangesCombos(combo.id)}><FaCheck className="icon" />Save</button>
                          <button className="button-cancel" onClick={handleCancelEdit}><MdOutlineCancel className="icon" />Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="button-edit" onClick={() => handleEditClick(combo.id)}> <MdEdit className="icon" /> Edit</button>
                          <button className="button-del" onClick={() => handleDeleteCombo(combo.id)}><MdDelete className="icon" />Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {showAddFieldsCombos && (
                  <tr>
                    <td>
                      <input type="text" value={newCombosName} onChange={(e) => setNewCombosName(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosDescription} onChange={(e) => setNewCombosDescription(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosTime} onChange={(e) => setNewCombosTime(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosPrice} onChange={(e) => setNewCombosPrice(e.target.value)} />
                    </td>
                    <td className="td-actions">
                      <button className="button-save" onClick={handleAddCombo}><FaPlus className="icon" />Add</button>
                      <button className="button-cancel" onClick={() => setShowAddFieldsCombos(false)}><MdOutlineCancel className="icon" />Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>


            </table>
            <button className="include" onClick={handleToggleShowAddFieldsContinuouslyCombos}>Include Combo</button>
          </div>





          <div className="price-table table-mobile">
            <table>
              <thead>
                <tr style={{ margin: '20px 0' }}>
                  <th style={{ fontWeight: 'bold', fontSize: '20px', width: '60%', textAlign: 'left', color: 'red' }}>Service</th>
                  <th style={{ fontWeight: 'bold', fontSize: '20px', width: '20%', textAlign: 'left', color: 'red' }}>Time</th>
                  <th style={{ fontWeight: 'bold', fontSize: '20px', width: '20%', textAlign: 'left', color: 'red' }}>Price</th>
                  <th className="actions"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>

                    <td style={{ fontWeight: 'bold', width: '60%' }}>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedName} onChange={(e) => handleInputChange(service.id, 'editedName', e.target.value)} />
                      ) : (
                        service.name
                      )}
                    </td>
                    <td style={{ width: '20%', fontSize: '14px' }}>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedTime} onChange={(e) => handleInputChange(service.id, 'editedTime', e.target.value)} />
                      ) : (
                        service.time
                      )}
                    </td>
                    <td style={{ fontWeight: 'bold', width: '20%', fontSize: '14px' }}>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedPrice} onChange={(e) => handleInputChange(service.id, 'editedPrice', e.target.value)} />
                      ) : (
                        service.price
                      )}
                    </td>
                    <td style={{ width: '60%', fontSize: '10px' }}>
                      {editingItemId === service.id ? (
                        <input type="text" value={service.editedDescription} onChange={(e) => handleInputChange(service.id, 'editedDescription', e.target.value)} />
                      ) : (
                        service.description
                      )}
                    </td>
                    <td className="td-actions">
                      {editingItemId === service.id ? (
                        <>
                          <button className="button-save" onClick={() => handleSaveChangesServices(service.id)}><FaCheck className="icon" />Save</button>
                          <button className="button-cancel" onClick={handleCancelEdit}><MdOutlineCancel className="icon" />Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="button-edit" onClick={() => handleEditClick(service.id)}> <MdEdit className="icon" /> Edit</button>
                          <button className="button-del" onClick={() => handleDeleteService(service.id)}><MdDelete className="icon" />Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {showAddFieldsServices && (
                  <tr>
                    <td style={{ fontWeight: 'bold', width: '60%' }}>
                      <input placeholder="Title" type="text" value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} />
                    </td>
                    <td style={{ width: '20%', fontSize: '14px' }}>
                      <input type="text" value={newServiceTime} onChange={(e) => setNewServiceTime(e.target.value)} />
                    </td>
                    <td style={{ fontWeight: 'bold', width: '20%', fontSize: '14px' }}>
                      <input type="text" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} />
                    </td>
                    <td style={{ width: '60%', fontSize: '10px' }}>
                      <input placeholder="Description" type="text" value={newServiceDescription} onChange={(e) => setNewServiceDescription(e.target.value)} />
                    </td>

                    <td className="td-actions">
                      <button className="button-save" onClick={handleAddService}><FaPlus className="icon" />Add</button>
                      <button className="button-cancel" onClick={() => setShowAddFieldsServices(false)}><MdOutlineCancel className="icon" />Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>
              <button className="include-mobile" onClick={handleToggleShowAddFieldsContinuouslyServices}>Include Service</button>
              <thead>
                <tr style={{ marginBottom: '20px' }}>
                  <th style={{ fontWeight: 'bold', fontSize: '20px', width: '60%', textAlign: 'left', color: 'red' }}>Combos</th>
                </tr>
              </thead>
              <tbody>
                {combos.map((combo, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold', width: '60%' }}>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.name} onChange={(e) => handleInputChangeCombos(combo.id, 'name', e.target.value)} />
                      ) : (
                        combo.name
                      )}</td>
                    <td style={{ width: '20%', fontSize: '14px' }}>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.time} onChange={(e) => handleInputChangeCombos(combo.id, 'time', e.target.value)} />
                      ) : (
                        combo.time
                      )}
                    </td>
                    <td style={{ fontWeight: 'bold', width: '20%', fontSize: '14px' }}>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.price} onChange={(e) => handleInputChangeCombos(combo.id, 'price', e.target.value)} />
                      ) : (
                        combo.price
                      )}</td>
                    <td style={{ width: '60%', fontSize: '10px' }}>
                      {editingItemId === combo.id ? (
                        <input type="text" value={combo.description} onChange={(e) => handleInputChangeCombos(combo.id, 'description', e.target.value)} />
                      ) : (
                        combo.description
                      )}</td>
                    <td className="td-actions">
                      {editingItemId === combo.id ? (
                        <>
                          <button className="button-save" onClick={() => handleSaveChangesCombos(combo.id)}><FaCheck className="icon" />Save</button>
                          <button className="button-cancel" onClick={handleCancelEdit}><MdOutlineCancel className="icon" />Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="button-edit" onClick={() => handleEditClick(combo.id)}> <MdEdit className="icon" /> Edit</button>
                          <button className="button-del" onClick={() => handleDeleteCombo(combo.id)}><MdDelete className="icon" />Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {showAddFieldsCombos && (
                  <tr>
                    <td>
                      <input type="text" value={newCombosName} onChange={(e) => setNewCombosName(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosDescription} onChange={(e) => setNewCombosDescription(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosTime} onChange={(e) => setNewCombosTime(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={newCombosPrice} onChange={(e) => setNewCombosPrice(e.target.value)} />
                    </td>
                    <td className="td-actions">
                      <button className="button-save" onClick={handleAddCombo}><FaPlus className="icon" />Add</button>
                      <button className="button-cancel" onClick={() => setShowAddFieldsCombos(false)}><MdOutlineCancel className="icon" />Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="include-mobile" onClick={handleToggleShowAddFieldsContinuouslyCombos}>Include Combo</button>

          </div>

        </section>
      </div>
    </div>
  );
}

export default AdminCourses;