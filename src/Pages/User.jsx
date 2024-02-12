import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import './User.css';
import Centrecard from '../Components/Centrecard';

function User() {
    const [view, setView] = useState(false);
    const [ide, setIde] = useState();
    const [datal, setDatal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/centres');
                console.log(response.data);
                setDatal(response.data);
            } catch (err) {
                console.log("Error Fetching data", err);
            }
        };

        fetchData(); // Call the async function to fetch data
    }, []);

    const handleOpen = (id) => {
        setIde(id);
        setView(true);
    };

    const handleClose = () => {
        setView(false);
    };

    return (
        <>
            <Navbar />
            <div className="title-box"><h3>Get Vaccine! Become a Warrior against COVID</h3></div>
            <div className="user-outer-box">
                <div className="top-box"><h1>Vaccination Centres</h1></div>
                <div className="content-box">
                    <table className="centre-table">
                        <thead>
                            <tr>
                                <th>Centre Name</th>
                                <th>Place</th>
                                <th>Book a Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datal.map((centre) => (
                                <tr key={centre.id}> {/* Provide a unique key */}
                                    <td>{centre.centreName}</td>
                                    <td>{centre.centreArea}</td>
                                    <td>
                                        <button
                                            className="table-button"
                                            type="button"
                                            onClick={() => handleOpen(centre.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Centrecard isOpen={view} onClose={handleClose} id={ide} />
        </>
    );
}

export default User;
