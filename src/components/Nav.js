import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

function NavBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showModal, closeModal] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const SignOut = () => {
        const token = localStorage.getItem('authToken');
    
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/adminlogout",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            localStorage.removeItem('authToken');
            alert('Logout successful');
            navigate('/PPGadminsite');
        })
    };
    const handleCloseModal = () => {
        closeModal(false);
      };
    return (
        <>
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/">
                    <img id='Logo1' src={Logo} 
                    alt="logo" 
                    width={50} 
                    height={50} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dash">Dashboard</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <div className="input-group input-group-sm mb-3 me-5 pt-3">
                            <button className="btn btn-outline-secondary" type="submit">
                                Search
                            </button>
                            <input type="text" className="form-control" />
                        </div>
                        <button 
                            id='btnbutton'
                            className="btn btn-outline-none" 
                            style={{ backgroundColor: "dark" }} 
                            type='button' 
                            onClick={() => closeModal(true)}
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </nav>
             <Modal show={showModal} onHide={handleCloseModal}>
             <Modal.Header closeButton>
               <Modal.Title>Confirm Sign Out</Modal.Title>
             </Modal.Header>
             <Modal.Body>Are you sure you want to sign out?</Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleCloseModal}>
                 Cancel
               </Button>
               <Button variant="primary" onClick={SignOut}>
                 Confirm
               </Button>
             </Modal.Footer>
           </Modal>
           </>
    );
}

export default NavBar;
