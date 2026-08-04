import { useNavigate } from "react-router-dom";



 
export default function LandingPage() {
  const navigate = useNavigate();
 
  return (
    <div className="main-container">
      <div className="landing-card">
       
 <h1>BHOP SNACKS</h1>
 <h2>Welcome</h2>
        <p>Create your snack list now</p>


        <div className="btns-container">
          <button onClick={() => navigate("/login")} className="btn">
       
             Log in
          </button>

          <button onClick={() => navigate("/signup")} className="btn">
        
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
