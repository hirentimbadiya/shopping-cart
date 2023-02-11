import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Nav, Navbar as NavBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useShoppingCart from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
      </Container>
      {cartQuantity > 0 && (
        <Button
          onClick={openCart}
          style={{
            height: "2.8rem",
            width: "2.8rem",
            marginRight: "10px",
            position: "relative",
          }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              right: "0",
              transform: "translate(25% , -25%)",
            }}
          >
            {cartQuantity}
          </div>
        </Button>
      )}
    </NavBs>
  );
};

export default Navbar;
