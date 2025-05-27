import React from 'react';

const CartPage = ({ cartItems }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.name} - ₱{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
