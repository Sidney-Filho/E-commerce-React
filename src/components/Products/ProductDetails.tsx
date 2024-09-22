import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import StarRating from './StarRating';
import { useAuth } from './Context/AuthContext';
import { Product } from '../interfaces/interfaces';
import toast, { Toaster } from 'react-hot-toast';

interface Review {
  id: number;
  productId: number;
  rating: number;
  text: string;
  created_at: string;
}

interface ProductDetailsProps {
  products: Product[];
  onAddProduct: (id: number) => void;
  onAddToFavourites: (product: Product) => void;
  onRemoveFromFavourites: (id: number) => void;
  favourites: Product[];
  onUpdateProductRating: (id: number, newRating: number) => void;
}

function ProductDetails({
  products,
  onAddProduct,
  favourites,
  onAddToFavourites,
  onRemoveFromFavourites,
  onUpdateProductRating,
}: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(product?.rating || 0); // Aqui pode estar ocorrendo o erro
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncatedDescription = product?.description.slice(0, 200);

  const { user } = useAuth(); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ecommerce/api/getReviews.php?productId=${id}`);
        setReviews(response.data);

        const totalRating = response.data.reduce((acc: number, review: Review) => acc + review.rating, 0);
        const avgRating = response.data.length ? totalRating / response.data.length : 0;
        setAverageRating(avgRating);

        if (product) {
          onUpdateProductRating(product.id, avgRating);
        }
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };
    fetchReviews();
  }, [id, product, onUpdateProductRating]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!user) {
        throw new Error('You must be logged in to submit a review');
      }

      const response = await axios.post('http://localhost/ecommerce/api/postReview.php', {
        productId: product?.id,
        rating: rating,
        text: reviewText,
      });

      console.log('Review saved: ', response.data);

      const newReview = response.data.review;
      setReviews((prevReviews) => [...prevReviews, newReview]);

      const avgRating = parseFloat(response.data.averageRating);
      setAverageRating(avgRating);

      if (product) {
        onUpdateProductRating(product.id, avgRating);
      }

      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error saving review', error);
      toast.error('Failed to submit review. Please Login.');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!user) {
      alert('You must be logged in to delete a review.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost/ecommerce/api/deleteReview.php?reviewId=${reviewId}`);
      console.log('Review deleted: ', response.data);

      setReviews(reviews.filter(review => review.id !== reviewId));

      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const newAverageRating = reviews.length > 1 ? totalRating / (reviews.length - 1) : 0;
      setAverageRating(newAverageRating);

      if (product) {
        onUpdateProductRating(product.id, newAverageRating);
      }
    } catch (error) {
      console.error('Error deleting review', error);
      toast.error('Failed to delete review. Please try again later.');
    }
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const isFavourite = favourites.some((fav) => fav.id === product.id);

  function calculateDiscountAmount(originalPrice: number, promoPrice?: number): number | undefined {
    if (promoPrice !== undefined) {
      const discountAmount = originalPrice - promoPrice;
      return discountAmount;
    } else {
      return undefined;
    }
  }

  return (
    <div className="flex flex-col">
      <Toaster/>
      <div className="flex gap-5 p-8 h-full">
        <div className="p-4 bg-zinc-800 rounded-md">
          <img src={product.image} alt="Product image" className="rounded-md h-full object-cover" />
        </div>
        <div className="w-4/5 bg-zinc-800 p-10 text-white rounded-md">
          <h2 className="text-4xl mb-2">{product.title}</h2>
          <div className="mb-10 flex items-center gap-2">
            <StarRating rating={averageRating} editable={false} />
            <p className='font-bold text-xs'>
              {`${averageRating.toFixed(2)} / 5`}
            </p>
          </div>
          <div>
            {product.promoPrice ? (
              <div className="flex gap-4">
                <span className="text-4xl font-bold text-orange-500">${product.promoPrice.toFixed(2)}</span>
                <span className="text-2xl font-bold line-through">${product.price.toFixed(2)}</span>
                <div className="p-3 bg-orange-500 rounded-sm font-bold text-2xl">
                  <p>
                    {`-${calculateDiscountAmount(product.price, product.promoPrice)} $`}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="mt-14 min-h-96">
            <h2 className="text-lg font-bold mb-2">Description</h2>
            <p className="text-lg">{isDescriptionExpanded ? product.description : `${truncatedDescription}...`}</p>
            <button
              className='text-orange-500 font-bold mt-2'
              onClick={toggleDescription}
            >
              {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
          </div>
          <div className="flex gap-8 items-center mt-12">
            <button className="bg-orange-500 hover:bg-orange-600 p-5 rounded-md text-xl w-80" onClick={() => onAddProduct(product.id)}>Add to Cart</button>
            {user ? (
              isFavourite ? (
                <FaHeart className='text-3xl text-orange-600 focus-within:outline-none cursor-pointer' onClick={() => onRemoveFromFavourites(product.id)}/>
              ) : (
                <FaRegHeart className='text-3xl hover:text-orange-600 focus-within:outline-none cursor-pointer' onClick={() => onAddToFavourites(product)}/>
              )
            ) : (
              <button className='text-3xl hover:text-orange-600 focus-within:outline-none cursor-pointer' onClick={() => toast.error('You must do login to add to this product to favourites.')}>
                <FaRegHeart />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full h-full justify-start items-start pl-10 pt-8 pb-20">
          <form onSubmit={handleSubmitReview} className="w-10/12 bg-zinc-800 p-6 rounded-md">
            <h3 className="text-white text-4xl text-start font-bold">Rate this Product</h3>
            <div className="pt-6 flex items-center gap-4">
              <h4 className="text-white">Your Rating: </h4>
              <StarRating
                rating={rating}
                onRatingChange={handleRatingChange}
                editable={true}
              />
            </div>
            <div className="pt-6">
              <label className="text-white font-bold">Your comment</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="mt-4 p-2 border bg-zinc-700 border-zinc-600 rounded-md w-full h-32 focus:outline-none focus:border-zinc-500 text-white"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
        <div className="w-9/12 p-10 flex flex-col justify-center items-center">
          {reviews.length === 0 ? (
            <div className="text-white w-full text-2xl font-bold">
              <p>No Reviews for this product yet.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-6 bg-zinc-800 rounded-md shadow-md w-full">
                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} editable={false} />
                  <span className="ml-2 text-white">{review.rating} / 5</span>
                  {user && (
                    <button className="ml-auto text-white hover:text-red-500" onClick={() => handleDeleteReview(review.id)}>
                      <FaTrashAlt/>
                    </button>
                  )}
                </div>
                <p className="text-white">{review.text}</p>
                <p className="text-sm text-white">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
