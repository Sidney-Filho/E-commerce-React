import React from "react";
import ReactStars from "react-stars";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <ReactStars
      count={5} // Número total de estrelas
      value={rating} // Valor da classificação
      size={22} // Tamanho das estrelas
      activeColor="#ffd700" // Cor das estrelas ativas
      edit={false} // Impedir que o usuário interaja com as estrelas
    />
  );
};

export default StarRating;
