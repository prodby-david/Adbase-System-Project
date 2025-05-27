import React from 'react';

const FavoritesPage = ({ favoriteItems }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      {favoriteItems && favoriteItems.length > 0 ? (
         <ul>
          {favoriteItems.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.name} - ₱{item.price}
            </li>
          ))}
        </ul>
      ) : (
       <p>No favorite items yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
