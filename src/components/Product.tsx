import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product as ProductType } from '../interfaces';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import StarRating from './StarRating';

interface ProductProps extends ProductType {
  onAddProduct: (id: number) => void;
  onAddToFavourites: (product: ProductType) => void;
  onRemoveFromFavourites: (id: number) => void;
  isFavourite: boolean;
  updatedRating: number;
  onUpdatedRating: (id: number, newRating: number) => void;
}

function Product({
  id,
  title,
  description,
  price,
  image, 
  category,
  rating,
  promoPrice,
  onAddProduct,
  onAddToFavourites,
  onRemoveFromFavourites,
  isFavourite,
  updatedRating,
  onUpdatedRating
}: ProductProps) {
  const navigate = useNavigate();
  const [isFavouriteLocal, setIsFavouriteLocal] = useState(isFavourite);

  // Atualiza o estado local quando a propriedade isFavourite muda
  useEffect(() => {
    setIsFavouriteLocal(isFavourite);
  }, [isFavourite]);

  // Manipula o clique no ícone de favorito
  function handleFavouriteClick() {
    if (isFavouriteLocal) {
      onRemoveFromFavourites(id);
    } else {
      onAddToFavourites({ id, title, description, price, image, category, rating });
    }
    setIsFavouriteLocal(!isFavouriteLocal); // Alterna o estado local de favorito
  }

  // Calcula o valor do desconto se promoPrice estiver definido
  function calculateDiscountAmount(originalPrice: number, promoPrice?: number): number | undefined {
    if (promoPrice !== undefined) {
      return originalPrice - promoPrice;
    }
    return undefined;
  }

  return (
    <div className="flex flex-col bg-zinc-800 p-3 rounded-md w-72 h-cardHeight text-white relative">
      <div className="w-full h-full overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${id}`)}>
        <img
          src={image}// Utiliza diretamente o caminho da imagem fornecido pelo backend
          className="rounded-md h-full w-full transform transition-transform duration-300 hover:scale-105"
          alt={title}
        />
      </div>
      <div className="p-4 flex flex-col gap-3 h-full">
        <h3 className="text-lg hover:text-orange-500 cursor-pointer line-clamp-2 h-14" onClick={() => navigate(`/product/${id}`)}>
          {title}
        </h3>
        <div className="flex items-center gap-2 justify-start">
          <StarRating
            rating={updatedRating}
            editable={false}
            onRatingChange={(newRating) => onUpdatedRating(id, newRating)}
          />
          <p className="font-bold text-xs">{`${updatedRating.toFixed(2)} / 5`}</p>
        </div>
        <p className="text-base w-full truncate h-6">{description}</p>
        <div className="font-bold">
          {promoPrice ? (
            <div className="flex gap-4 relative">
              <div className="absolute top-2 right-2 px-1 py-1 rounded-md font-medium bg-orange-500 text-white">
                {`-${calculateDiscountAmount(price, promoPrice)?.toFixed(2)} $`}
              </div>
              <span className="text-2xl text-orange-500">${promoPrice.toFixed(2)}</span>
              <span className="text-xl line-through text-white">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-2xl">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center cursor-pointer px-4 gap-2">
        <button
          className="p-3 m-4 rounded-sm text-white text-xl bg-orange-600 hover:bg-orange-700 w-full"
          onClick={() => onAddProduct(id)}
        >
          Add to cart
        </button>
        {isFavouriteLocal ? (
          <FaHeart
            data-tooltip-id={`tooltip-heart-${id}`}
            className="text-3xl text-orange-600 focus-within:outline-none"
            onClick={handleFavouriteClick}
          />
        ) : (
          <FaRegHeart
            data-tooltip-id={`tooltip-heart-${id}`}
            className="text-3xl hover:text-orange-600 focus-within:outline-none"
            onClick={handleFavouriteClick}
          />
        )}
        <Tooltip id={`tooltip-heart-${id}`} content={isFavouriteLocal ? 'Remove from wishlist' : 'Add to wishlist'} place="top" />
      </div>
    </div>
  );
}

export default Product;
