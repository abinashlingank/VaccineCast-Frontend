import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { getUser } from "../Components/getUser";
import GoogleMap from "../Components/Map";

function Vaccinecentres() {
  const user = getUser();
  const [datal, setDatal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/vaccentres');
        setDatal(response.data);
      } catch (err) {
        console.log("Error Fetching data", err);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <Navbar user={user} />
      {datal && <GoogleMap datal={datal} />}
    </>
  );
}

export default Vaccinecentres;