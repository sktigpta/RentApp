import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/Logo.svg";
import MaleAvatar from "../assets/avatar/MaleAvatar.png";
import { Link } from 'react-router-dom';
import { useAuth } from '../storeing-data/auth';

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    // Add event listener to listen for clicks on the document body
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <header>
      <nav>

        <Link to="/">
          <div className="navbar-logo">
            <img src={Logo} alt="hello" />
          </div>
        </Link>

        {isLoggedIn ? (
          <>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
              <div className="navbar-profile">
                <div
                  onClick={toggleProfileMenu}
                >
                  <img src={MaleAvatar} alt="" />
                </div>
              </div>

              {profileMenuOpen && (
                <div ref={profileMenuRef}>
                  <div className="profile-menu ">
                    <div className="profilepic">
                      <div className="avatar">
                      </div>
                    </div>
                    <h2 style={{ fontSize: "1.2em" }}>{user.fullname}</h2>
                    <p style={{ opacity: "0.4", fontSize: "1em", marginBottom: "1em" }}>@{user.username}</p>
                    <Link className="li proLi" to="/user" onClick={closeProfileMenu}>Your Account</Link>
                    <Link className="li proLi" to="/contact" onClick={closeProfileMenu}>Write Us</Link>
                    <Link className="li proLi" to="/notifications" onClick={closeProfileMenu}>Notifications</Link>
                    <Link className="li proLi" to="/notifications" onClick={closeProfileMenu}>Register as Business?</Link>

                    {user.isAdmin === true && ( // Check if user is admin
                      <Link className="li proLi" to="/admin" onClick={closeProfileMenu}> Admin Panel</Link>
                    )}

                    <Link className="li proLi logOO" to="/logout" onClick={closeProfileMenu}>Logout</Link>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="navbar-login">
            <Link to="/login"><button>Login</button></Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;