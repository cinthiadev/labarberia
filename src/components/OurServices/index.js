import './ourServices.css';
import { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs } from "firebase/firestore";

const OurServices = () => {
    const [services, setServices] = useState([]);
    const [combos, setCombos] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollection = await getDocs(collection(db, 'services'));
                const servicesData = servicesCollection.docs.map(doc => doc.data());
                // Remover a ordenação e manter a ordem de entrada
                setServices(servicesData);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        const fetchCombos = async () => {
            try {
                const combosCollection = await getDocs(collection(db, 'combos'));
                const combosData = combosCollection.docs.map(doc => doc.data());
                // Ordenar os combos por nome, por exemplo
                const sortedCombos = combosData.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setCombos(sortedCombos);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        fetchServices();
        fetchCombos();


    }, []);

    const [newBackgrounds, setNewBackgrounds] = useState({
        servicesImage1: ''
      });
    

    useEffect(() => {
        const fetchImageHeader = async () => {
            try {
                const footerRef = collection(db, "backgrounds"); // Get a reference to the collection
                const querySnapshot = await getDocs(footerRef);

                // Assuming there's only one document in the "footer" collection
                const footerDoc = querySnapshot.docs[0]; // Get the first document (assuming one)

                if (footerDoc) { // Check if a document exists
                    const data = footerDoc.data();
                    setNewBackgrounds(data);
                } else {
                    console.warn("No document found in the 'footer' collection.");
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
                // Handle error
            }
        };

        fetchImageHeader();
    }, []);

    return (
        <div className='contents' style={{ backgroundImage: `url(${newBackgrounds.servicesImage1})` }}>
            <div className=''>
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
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 'bold', width: '35%' }}>{service.name}</td>
                                        <td style={{ width: '70%' }}>{service.description}</td>
                                        <td style={{ width: '10%' }}>{service.time}</td>
                                        <td style={{ fontWeight: 'bold', width: '10%' }}>{service.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr>
                                    <th>Combos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combos.map((combo, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 'bold' }} >{combo.name}</td>
                                        <td >{combo.description}</td>
                                        <td >{combo.time}</td>
                                        <td style={{ fontWeight: 'bold' }} >{combo.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>
                            <i>Seniors (60+), Active Duty Military & First Responders Discount 10% off applied to all services</i>
                        </p>

                        <p style={{ textAlign: 'center', marginTop: '20px' }}>
                            * please be aware prices vary with each barber
                        </p>
                    </div>
                    <div className="price-table table-mobile">
                        <table>
                            <thead>
                                <tr style={{ margin: '20px 0' }}>
                                    <th style={{ fontWeight: 'bold', fontSize: '20px', width: '60%', textAlign: 'left', color: 'red' }}>Service</th>
                                    <th style={{ fontWeight: 'bold', fontSize: '20px', width: '20%', textAlign: 'left', color: 'red' }}>Time</th>
                                    <th style={{ fontWeight: 'bold', fontSize: '20px', width: '20%', textAlign: 'left', color: 'red' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 'bold', width: '60%' }}>{service.name}</td>
                                        <td style={{ width: '20%', fontSize: '14px' }}>{service.time}</td>
                                        <td style={{ fontWeight: 'bold', width: '20%', fontSize: '14px' }}>{service.price}</td>
                                        <td style={{ width: '60%', fontSize: '10px' }}>{service.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr style={{ marginBottom: '20px' }}>
                                    <th style={{ fontWeight: 'bold', fontSize: '20px', width: '60%', textAlign: 'left', color: 'red' }}>Combos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combos.map((combo, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 'bold', width: '60%' }}>{combo.name}</td>
                                        <td style={{ width: '20%', fontSize: '14px' }}>{combo.time}</td>
                                        <td style={{ fontWeight: 'bold', width: '20%', fontSize: '14px' }}>{combo.price}</td>
                                        <td style={{ width: '60%', fontSize: '10px' }}>{combo.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{ textAlign: 'center', fontSize: '14px' }}>
                            <i>Seniors (60+), Active Duty Military & First Responders Discount 10% off applied to all services</i>
                        </p>
                        <p style={{ textAlign: 'center', fontSize: '14px' }}>
                            * please be aware prices vary with each barber
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OurServices;