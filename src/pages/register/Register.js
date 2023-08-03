import React, { useEffect, useState } from "react";
import "./Register.scss";
/* Router Dom */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/* Icons */
import { FcGoogle } from "react-icons/fc";
/* Assets */
import registerImage from "../../asset/Login.svg";
/* Firebase */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref } from "firebase/storage";

import { AiOutlineUpload } from "react-icons/ai";

import { auth } from "../../config/firebase-config";

import { storage } from "../../config/firebase-config";

import { v4 } from "uuid";
import { uploadBytes, getDownloadURL } from "firebase/storage";
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");

  const [user, setUser] = useState({});
  const [downloadurl, setDownloadurl] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async (event) => {
    try {
      const userRegistered = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        password
      );

      const imageRef = ref(storage, `profile/${v4()}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setDownloadurl(url);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }

    navigate("/");
  };

  return (
    <div className="register">
      <div className="user-left">
        <h1>Create an account</h1>
        <div className="register-form">
          <p style={{ marginBottom: "-3px" }}>Name</p>
          <input
            type="text"
            placeholder="John Doe"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
          <p style={{ marginBottom: "-3px" }}>Email</p>
          <input
            type="email"
            placeholder="you@gmail.com"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            required
          />
          <p style={{ marginBottom: "-3px" }}>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <p style={{ marginBottom: "-3px" }}>Confirm Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            required
          />
        </div>
        <input
          type="file"
          id="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <label htmlFor="file">
          Upload Image : <AiOutlineUpload fontSize="32px" />
        </label>
        <button onClick={register} className="submitBtn">
          Register
        </button>
        <h2>User: {user ? user.email : "No User Logged In"}</h2>
        <button className="center-icon">
          {" "}
          <FcGoogle style={{ fontSize: "22px" }} /> Sign Up with Google
        </button>
        <br />
        <hr />
        <span style={{ color: "grey" }}>Already have an account?</span>{" "}
        <Link to="/login">Sign in Instead</Link>
      </div>

      <div className="user-right">
        <img src={registerImage} />
      </div>
    </div>
  );
};

export default Register;
