import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Fashion Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home</Nav.Link>
                            <Nav.Link href="#">Products</Nav.Link>
                            <Nav.Link href="#">Cart</Nav.Link>
                            <Nav.Link href="#">SignUp</Nav.Link>
                            <Nav.Link href="#">LogIn</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br />
            </div>
        );
    }
}

export default Header;