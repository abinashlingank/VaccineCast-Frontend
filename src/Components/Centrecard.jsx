import './Centrecard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Centrecard({ isOpen, onClose, id }) {
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

    const handleDecrementSlot = async (centreId) => {
        try {
            const response = await axios.get(`/api/decrementSlot/${centreId}`);
            // alert(response.data); // Log the response from the server
            // You can handle the response here, such as displaying a success message
            if(response.data === "Centre not found or no available slots left"){
              alert("No available slots in this centre")
            }else{
              alert("slot booked succesfully")
            }
        } catch (error) {
            // console.error("Error decrementing available slot:", error);
            // Handle errors, such as displaying an error message to the user
            alert("No available slots in this centre")
        }
    };

    if (!isOpen || !datal) {
        return null;
    }

    const { centreName, totalSeats, address, functionTime, centreArea, centreHead, contactNumber, availableSlot } = datal;

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
                        <h4>Centre Head</h4>
                        <p>{centreHead}</p>
                        <h4>Contact Number</h4>
                        <p>{contactNumber}</p>
                    </div>
                    <div className='centre-right'>
                        <h4>Available Time</h4>
                        <p>{functionTime}</p>
                        <h4>Address</h4>
                        <p>{address}</p>
                        <h4>Total Slots</h4>
                        <p>{totalSeats}</p>
                        <h4>Available Slots</h4>
                        <p>{availableSlot}</p>
                    </div>
                </div>
                {/* <br></br> */}
                <button className='book-btn' onClick={() => handleDecrementSlot(id)}>Book a Slot</button>
            </div>
        </>
    );
}

export default Centrecard;
