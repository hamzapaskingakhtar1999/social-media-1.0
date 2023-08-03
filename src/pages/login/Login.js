import React, { useState } from "react";
import "./Login.scss";

/* Fireabase */
import { auth, provider } from "../../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

/* Images / SVG's / ICONS */
import LoginImage from "../../asset/Login.svg";
import { FcGoogle } from "react-icons/fc";

/* React Router DOM */
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /* Sign In using Username and Password */
  const login = async () => {
    try {
      const userRegistered = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userRegistered);
    } catch (error) {
      alert(error);
      console.log(error.message);
    }
    navigate("/");
  };

  /* Using Google Account */
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      alert(error);
    }
    navigate("/");
  };

  return (
    <div className="login">
      <div className="user-left">
        <h1>Login to your account</h1>
        <div className="login-form">
          <p style={{ marginBottom: "-3px" }}>Email</p>
          <input
            type="email"
            placeholder="you@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <p style={{ marginBottom: "-3px" }}>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button onClick={login}>Sign In</button>
        <button className="center-icon" onClick={signInWithGoogle}>
          {" "}
          <FcGoogle style={{ fontSize: "22px" }} /> Sign In with Google
        </button>
        <br />
        <hr />
        <span style={{ color: "grey" }}>Don't have an account?</span>{" "}
        <Link to="/register">Sign Up Instead</Link>
      </div>

      <div className="user-right">
        <img src={LoginImage} />
      </div>
    </div>
  );
};

export default Login;
