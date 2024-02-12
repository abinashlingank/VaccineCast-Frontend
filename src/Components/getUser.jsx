import React, { useState, useEffect } from 'react';

export const getUser = () => {
  const [activeUser, setActiveUser] = useState(sessionStorage.getItem('ActiveUser'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveUser(sessionStorage.getItem('ActiveUser'));
    }, 500); // Update every half second

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);
  return  activeUser;
}