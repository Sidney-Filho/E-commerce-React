import React, { useState } from "react";
import axios from "axios";

interface ProductReviewsForm {
  productId: number;
  onReviewSubmit: () => void
}

function ProductReviewsForm ({ productId, onReviewSubmit }: ProductReviewsForm) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/postReviews.php", {
        productId,
        rating,
        text,
      });
      if (response.data.message) {
        onReviewSubmit(); // Atualiza a lista de reviews após a submissão bem-sucedida
        alert(response.data.message);
      } else {
        alert("Failed to save review");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review");
    }
  };

  return (
    <form className="product-reviews-form" onSubmit={handleSubmit}>
      <h3>Add Review</h3>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ProductReviewsForm;
