import ModalLogin from "./Modallogin";
import { useState } from "react";
import './Navbar.css';
import logocast from '../assets/logo.png';
import { getUser } from "./getUser";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    const user = getUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () =>{
        // console.log("clicked");
        sessionStorage.removeItem("ActiveUser");
        alert("Logged out Successfully")
        navigate('/');
    };
    const handleMain = () =>{
        if(user=='admin'){
            navigate('/admin');
        }else{
            navigate('/user');
        }
    }
    const handleLogo = () =>{
        navigate('/');
    }

    const openVC=()=>{
        navigate('/vaccinecentres');
    }
    const handleOpen = () => {
        setIsOpen(true);
        navigate('/');
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav>
                <img src={logocast} alt="logo"  />
                <h1 onClick={handleLogo}>VaccineCast</h1>
                <ul>
                    <li>Features</li>
                    <li onClick={openVC}>VaccineCentres</li>
                    {user === undefined || user === null ? (
                        <li onClick={handleOpen}>Login</li>
                    ) : (<>
                        <li onClick={handleMain}>{"MainPage"}</li>
                        <li onClick={handleLogout}>{user}</li>
                        </>
                    )}
                </ul>
            </nav>
            <ModalLogin isOpen={isOpen} onClose={handleClose} />
        </>
    );
}

export default Navbar;