import Adcentre from "../Components/Adcentre";
import Navbar from "../Components/Navbar";
import { getUser } from "../Components/getUser";
import './User.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Adminmain(){
  const [view, setView] = useState(false);
  const [ide, setIde] = useState();
  const [datal, setDatal] = useState([]);
  const navigate = useNavigate();
  const handleadd = () =>{
    navigate('/addvc');
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('/api/centres');
              // alert(response.data);
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
    const user = getUser();
    if(user==='admin'){
    return(
        <>
            <Navbar />
            <div className="title-box"><h3>Adding a new Vaccine Center</h3><button className="add-btn" style={{display:'inline-block'}} onClick={handleadd}>ADD</button></div>
            <div className="user-outer-box">
            <div className="top-box"><h1>Current Vaccination Centres</h1></div>
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
            <Adcentre isOpen={view} onClose={handleClose} id={ide} />
        </>
    );}else{
      alert("unauthorised Access");
    }
}

export default Adminmain;