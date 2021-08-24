import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

let tokenConfirmation = localStorage.getItem('token')
const LaunchScreen = () => {

    const [token, setToken] = useState(false)
    useEffect(() => {

        if (localStorage.getItem('token')) {
            setToken(true)
        } else {
            setToken(false)
        }
    }, [tokenConfirmation])

    function logout() {
        localStorage.clear()
    }
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> MERN - Stack</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div className="me-3">
                                <Link to="/home">
                                    Home
                                </Link>
                            </div>
                            {token ?
                                <div className="me-3">
                                    <Link onClick={() => logout()} to='/login' className='ml-3'>
                                        Logout
                                    </Link>
                                </div>
                                :
                                <>
                                    <div className="me-3">
                                        <Link to="/login" className='ml-3'>
                                            Login
                                        </Link>
                                    </div>
                                    <div className="me-3">
                                        <Link to="/register" className='ml-3'>
                                            Register
                                        </Link>
                                    </div>
                                </>
                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </React.Fragment>
    )

}

export default LaunchScreen