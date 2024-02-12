import './Centrecard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Adcentre({ isOpen, onClose, id }) {
    const [datal, setDatal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/specentres/' + id);
                setDatal(response.data);
            } catch (err) {
                console.log("Error Fetching data", err);
            }
        };

        fetchData(); // Call the async function to fetch data

        // Update data every half second
        const intervalId = setInterval(fetchData, 500);

        // Cleanup function to clear interval on unmount or when id changes
        return () => clearInterval(intervalId);
    }, [id]); // Include 'id' in the dependency array to re-fetch data when 'id' changes



    if (!isOpen || !datal) {
        return null;
    }

    const { centreName, totalSeats, address, functionTime, centreArea, centreHead, contactNumber, availableSlot, latitude, longitude} = datal;

    return (
        <>
            <div className="centre-out"></div>
            <div className="centre-box">
                <h4 style={{ position: 'absolute', float: 'right', color: 'red', display: 'block', right: '50px', top: '50px' }} onClick={onClose}>close</h4>
                <div className='centre-contain'>
                    <div className='centre-left'>
                        <h4>Centre Name</h4>
                        <p>{centreName}</p>
                        <h4>Centre Area</h4>
                        <p>{centreArea}</p>
                        <h4>Latitude</h4>
                        <p>{latitude}</p>
                        <h4>Centre Head</h4>
                        <p>{centreHead}</p>
                        <h4>Contact Number</h4>
                        <p>{contactNumber}</p>
                    </div>
                    <div className='centre-right'>
                        <h4>Available Time</h4>
                        <p>{functionTime}</p>
                        <h4>Address</h4>
                        <p style={{fontSize:'larger'}}>{address}</p>
                        <h4>Longitude</h4>
                        <p>{longitude}</p>
                        <h4>Total Slots</h4>
                        <p>{totalSeats}</p>
                        <h4>Available Slots</h4>
                        <p>{availableSlot}</p>
                    </div>
                </div>
                {/* <br></br> */}
                {/* <button className='book-btn' onClick={() => handleDecrementSlot(id)}>Book a Slot</button> */}
            </div>
        </>
    );
}

export default Adcentre;
