import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { auth } from "../../lib/firebase"; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./login.scss";
import GoogleLogo from "../../assets/googleLogo.jpg";


const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3060/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const user = await response.json();
alert("login successful")
        login(user); 
        window.location.href = "/";

        localStorage.setItem("username", username);
        localStorage.setItem("userId", user.id);
       



      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
  
      setError("Error logging in");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); 
    try {
      const response = await signInWithPopup(auth, provider); 
      alert("Login successful");
      login(response.user);
      window.location.href = "/";
    } catch (error) {
      // Handle error
      console.error("Error logging in with Google:", error);
      setError("Google login failed");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>FITNESS</h1>
          <p>
        
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <button className="google-login" onClick={handleGoogleSignIn}>
          <img src={GoogleLogo} alt="Google Logo" width="50" height="50" />
            <span>Login with Google</span>
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;