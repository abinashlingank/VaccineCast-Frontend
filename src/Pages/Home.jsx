import Navbar from "../Components/Navbar";
import mainim from '../assets/main.jpeg';


function Home(){
    const user = sessionStorage.getItem("User")
    return(
        <>
        <Navbar user={user}/>
        <div style={{position:'relative', top:'50px'}}>
        <center>
        <h1 style={{color:'#D5F0C1'}}>Book Your COVID-19 Vaccination Appointment Today!</h1>
        <img src={mainim} alt="" style={{height:'20%', width:'50%'}}/>
        <h3 style={{color:'#F9F7C9'}}>Protect Yourself and Others -Schedule Your Vaccination Now</h3>
        <h2 style={{color:'darkcyan'}}>Click <span style={{backgroundColor:'yellowgreen'}}>VaccineCentres</span> and Find your nearest Vaccination Centre</h2>
        <h3 style={{color:'aqua'}}>Login now and Book your Slot</h3>
        </center>
        </div>
        </>
    )
}
export default Home;