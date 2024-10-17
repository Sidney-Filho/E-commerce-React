import ReactStars from "react-stars";

interface StarRatingProps {
  rating: string | number;
  onRatingChange?: (newRating: number) => void
  editable?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, editable = false }) => {

  const parsedRating = typeof rating === 'string' ? parseFloat(rating) : rating; // Converte para número se for string

  return (
    <ReactStars
      count={5} // Número total de estrelas
      value={parsedRating} // Valora da classificação
      size={22} // Tamanho das estrelas
      activeColor="#ffd700" // Cor das estrelas ativas
      edit={editable} // Impedir que o usuário interaja com as estrelas
      onChange={onRatingChange}
    />
  );
};

export default StarRating;
