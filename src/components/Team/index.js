import { useState, useEffect } from "react";
import './team.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebaseConnection';
import imageHeader from "../../assets/images/1-topslider01.jpeg";

function Team() {
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        const fetchBarbers = async () => {
            const barbersCollection = collection(db, 'team'); // 'barbers' é o nome da sua coleção no Firestore
            const barbersSnapshot = await getDocs(barbersCollection);
            const barbersList = barbersSnapshot.docs.map(doc => doc.data());
            setBarbers(barbersList);
        };

        fetchBarbers();
    }, []);

    return (
        <div className='content'>
            <section className="team" id="team">
                <h2>The Team</h2>
                <div className="group-members">
                    {barbers.map((barber, index) => (
                        <div className="card-info" key={index}>
                            <div className="image-member-page">
                                <img className="" src={barber.imageUrl || imageHeader} />
                            </div>
                            <div className="member-info">
                                <h3>{barber.name}</h3>
                                <p>{barber.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Team;