import React, { useEffect, useState } from "react";
import './serviceEdit.css';
import { db } from '../../../services/firebaseConnection';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, orderBy } from "firebase/firestore";
import { toast } from 'react-toastify';

function ServiceEdit() {
  const [services, setServices] = useState([]);
  const [combos, setCombos] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedComboId, setSelectedComboId] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServiceTime, setNewServiceTime] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceOrder, setNewServiceOrder] = useState('');
  const [newCombosName, setNewCombosName] = useState('');
  const [newCombosDescription, setNewCombosDescription] = useState('');
  const [newCombosTime, setNewCombosTime] = useState('');
  const [newCombosPrice, setNewCombosPrice] = useState('');
  const [newType, setNewType] = useState('');
  const [showAddFieldsServices, setShowAddFieldsServices] = useState(false);
  const [showAddFieldsCombos, setShowAddFieldsCombos] = useState(false);
  const [typeOptions, setTypeOptions] = useState(['Service', 'Combo']);

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
          editedPrice: doc.data().price,
          editedType: doc.data().type,
          editedOrder: doc.data().order
        }));
        const sortedServices = servicesData.sort((a, b) => {
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


  const handleSaveChangesServices = async (serviceId) => {
    try {
      const serviceToUpdate = services.find(service => service.id === serviceId);
      const { editedName, editedDescription, editedTime, editedPrice, editedType, editedOrder } = serviceToUpdate;

      if (!editedName || !editedPrice) {
        toast.error('Fill in the name and price fields to save the changes!');
        return;
      }

      const serviceRef = doc(db, 'services', serviceId);
      const updatedData = {
        name: editedName,
        description: editedDescription,
        time: editedTime,
        price: editedPrice,
        type: editedType,
        order: editedOrder
      };

      await updateDoc(serviceRef, updatedData);
      toast.success('Service changes saved successfully!');

    } catch (error) {
      console.error('Error updating service data:', error);
      toast.error('Failed to update the service. Please try again.');
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

  const handleDeleteService = async (serviceId) => {
    try {
      const serviceRef = doc(db, 'services', serviceId);
      await deleteDoc(serviceRef);
      toast.success('Service deleted successfully!');

      setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete the service. Please try again.');
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
        price: newServicePrice,
        type: newType,
        order: newServiceOrder,
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
      setNewType('');
      setNewServiceOrder('');
    } catch (error) {
      console.error('Error adding new service:', error);
      toast.error('Failed to add new service. Please try again.');
    }
  };

  const handleServiceSelectionChange = (e) => {
    setSelectedServiceId(e.target.value);
  };


  const selectedService = services.find(service => service.id === selectedServiceId) || {
    editedDescription: '',
    editedTime: '',
    editedPrice: '',
    editedOrder: ''
  };


  return (
    <div className="container">
      <section className="section-admin edit-services" id="edit-services">
        <div className="title-services-edit">
          <h2>Our Services</h2>
        </div>

        {!showAddFieldsServices ? (
          <>
            <div className="content-edit">
              <select value='' onChange={handleServiceSelectionChange}>
                <option value="">Select the service you want to edit here</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="content-edit">
              <h3>Service Title</h3>
              <input
                type="text"
                value={selectedService.editedName}
                onChange={(e) => handleInputChange(selectedServiceId, 'editedName', e.target.value)}
              />
              <h3 className="description-textarea">Description</h3>
              <textarea
                id="message"
                value={selectedService.editedDescription}
                onChange={(e) => handleInputChange(selectedServiceId, 'editedDescription', e.target.value)}
              />
            </div>

            <div className="content-edit-flex">
              <div>
                <h3>Time</h3>
                <input
                  type="text"
                  value={selectedService.editedTime}
                  onChange={(e) => handleInputChange(selectedServiceId, 'editedTime', e.target.value)}
                />
              </div>
              <div>
                <h3>Price</h3>
                <input
                  type="text"
                  value={selectedService.editedPrice}
                  onChange={(e) => handleInputChange(selectedServiceId, 'editedPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="content-edit">
              <h3>Type</h3>
              <select
                value={selectedService.editedType}
                onChange={(e) => handleInputChange(selectedServiceId, 'editedType', e.target.value)}
              >
                <option value="">Select type</option>
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="group-buttons-actions-service">
              <div className="group-delete-save">
                <button className="button-delete-service" onClick={() => handleDeleteService(selectedServiceId)}>Delete</button>
                <button className="button-save-changes-member" onClick={() => handleSaveChangesServices(selectedServiceId)}>Save Changes</button>
              </div>
            </div>
            <button className="btn-admin-add" onClick={() => setShowAddFieldsServices(true)}>Add New Service</button>
          </>
        ) : (
          <>
            <div className="content-edit">
              <h3>Service Title</h3>
              <input
                type="text"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>

            <div className="content-edit">
              <h3>Description</h3>
              <textarea
                id="newServiceDescription"
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
              />
            </div>

            <div className="content-edit-flex">
              <div>
                <h3>Time</h3>
                <input
                  type="text"
                  value={newServiceTime}
                  onChange={(e) => setNewServiceTime(e.target.value)}
                />
              </div>
              <div>
                <h3>Price</h3>
                <input
                  type="text"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                />
              </div>

            </div>

            <div className="content-edit">
              <h3>Type</h3>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="">Select type</option>
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div>
                <h3>Order</h3>
                <input
                  type="number"
                  value={newServiceOrder}
                  onChange={(e) => setNewServiceOrder(e.target.value)}
                />
              </div>
            </div>

            <div className="group-buttons-actions-service">
              <div className="group-delete-save">
                <button className="button-delete-service" onClick={() => setShowAddFieldsServices(false)}>Cancel</button>
                <button className="button-save-changes-member" onClick={handleAddService}>Save</button>
              </div>
            </div>
        

          </>
        )}


      </section>

    </div>
  );
}

export default ServiceEdit;