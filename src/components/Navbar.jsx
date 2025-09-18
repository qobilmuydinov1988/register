import { NavLink, Link } from "react-router-dom";
import "../index.css";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useGlobalcontext } from "../hooks/useGlobalcontext.js";

import { toast } from "sonner";
import { useEffect } from "react";
function Navbar() {
  const { user, userName, dispatch } = useGlobalcontext();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        console.log(user.displayName);
        dispatch({ type: "LOGIN", payload: user });
        dispatch({ type: "PROFILE", payload: user.displayName });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        toast.success("user is signed out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="nav">
      <div className="logo">
        <Link to={"/"}>React App</Link>
      </div>
      {!user ? (
        <>
          <div className="register">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/signin"}>Sign In</NavLink>
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </div>
        </>
      ) : (
        <div className="user-nav">
          <h4>Hello {userName}!</h4>
          <div className="avatar">
            <img src="https://picsum.photos/200/300?random=1" />
          </div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
