import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WishlistItem from "./wishlistItem"; // Create this component
import "./wishlist.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Retrieve wishlist items from localStorage and store them in state
    const keys = Object.keys(localStorage);
    const items = keys.filter((key) => localStorage.getItem(key) === "true");
    // now fetch the items from the API

    setWishlistItems(items);
  }, []);

  return (
    <div>
      <h2>My Wishlist</h2>
      <div className="wishlist">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="allItems">
            {wishlistItems.map((itemId) => (
              <WishlistItem key={itemId} itemId={itemId} />
            ))}
          </div>
        )}
      </div>
      <Link to="/catalogus">Back to Catalogus</Link>
    </div>
  );
};

export default WishlistPage;
