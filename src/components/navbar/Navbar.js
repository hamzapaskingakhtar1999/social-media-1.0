import React, { useState, useEffect } from "react";
/* SCSS */
import "./Navbar.scss";
/* React Router DOM */
import { Link } from "react-router-dom";
/* Firebase */
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const signout = async () => {
    await signOut(auth);
  };
  /*  const [userState, setUserState] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []); */
  return (
    <nav className="navbar">
      <h1>Social Breeze</h1>
      <div>
        <Link to="/" className="link">
          Home
        </Link>

        {!user ? (
          <Link to="/login" className="link">
            {user ? "" : "Login"}
          </Link>
        ) : (
          <Link to="/createpost" className="link">
            Create Post
          </Link>
        )}
      </div>
      {user ? (
        <>
          <p style={{ color: "white" }}>Logged In User: {user.email}</p>
          <img
            src={user?.photoURL || ""}
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            referrerPolicy="no-referrer"
          />
          <button onClick={signout} className="signout-button">
            Sign Out
          </button>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
