import React from "react";
import { Button, Card } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

// types for storeItems
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // get quantity dynamically
  let quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      {/* for displaying card image */}
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      {/* for card body */}
      <Card.Body className="d-flex flex-column">
        {/* title for card */}
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {/* buttons */}
        <div className="mt-auto">
          {/* if quantity is 0 then add to card button else + , - and remove buttons */}
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              {" "}
              + Add to Cart{" "}
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                {/* - button */}
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  {/* displaying the quantities here */}
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                {/* + button */}
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              {/* remove item from cart */}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
