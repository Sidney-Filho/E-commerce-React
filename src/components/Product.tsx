import { useNavigate } from 'react-router-dom'
import { Product as ProductType } from '../interfaces' 
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import { useState, useEffect } from 'react'
import StarRating from './StarRating'

// Interface do componente Product que herda os atributos do arquivo interfaces.ts
interface ProductProps extends ProductType {
  onAddProduct: (id: number) => void
  onAddToFavourites: (product: ProductType) => void;
  onRemoveFromFavourites: (id: number) => void
  isFavourite: boolean
}

function Product({id, title, description, price, image, category, rating, promoPrice, onAddProduct, onAddToFavourites, onRemoveFromFavourites, isFavourite}: ProductProps) {
  // Utiliza o navigate para navegar para renderizar rota do componente ProductDetails
  const navigate = useNavigate()
  const [isFavouriteLocal, setIsFavouriteLocal] = useState(isFavourite)

  useEffect(() => {
    setIsFavouriteLocal(isFavourite)
  }, [isFavourite])

  function truncateDescription (text: string, maxLenght: number) {
    if(text.length > maxLenght) {
      return text.substring(0, maxLenght) + '...'
    }
    return text
  }

  function truncateTitle (text: string, maxLenght: number) {
    if(text.length > maxLenght) {
      return text.substring(0, maxLenght) + '...'
    }
    return text
  }

  function handleFavouriteClick() {
    if(isFavouriteLocal) {
      onRemoveFromFavourites(id)
    } else {
      onAddToFavourites({id, title, description, price, image, category, rating})
      }
    setIsFavouriteLocal(!isFavouriteLocal)
  }

  function calculateDiscountAmount(originalPrice: number, promoPrice?: number): number | undefined {
    // Verifica se o promoPrice está definido
    if (promoPrice !== undefined) {
      // Calcula o desconto em dinheiro
      const discountAmount = originalPrice - promoPrice;
      // Retorna o valor do desconto em dinheiro
      return discountAmount;
    } else {
      // Retorna undefined se promoPrice não estiver definido
      return undefined;
    }
  }

  return(
    <div className="flex flex-col bg-zinc-800 p-3 rounded-md w-72 h-cardHeight text-white relative">
      <div className='w-full overflow-hidden cursor-pointer h-screen' onClick={() => navigate(`/product/${id}`)}>
        <img src={image} className='rounded-md w-full transform transition-transform duration-300 hover:scale-105' />
      </div>
      <div className='p-4 flex flex-col gap-3 h-full'>
        <h3 className='text-lg hover:text-orange-500 cursor-pointer' onClick={() => navigate(`/product/${id}`)}>{truncateTitle(title, 50)}</h3>
        <div className='flex items-center gap-2 justify-start'>
          <StarRating rating={rating}/>
          <p className='font-bold text-xs'>
            {`${rating} / 5`} 
          </p>
        </div>
        <p className='text-base w-full overflow-hidden overflow-ellipsis'>
          {truncateDescription(description, 30)}
        </p>
        <div className='font-bold'>
          {promoPrice ? (
            <div className='flex gap-4'>
              <div className='absolute top-5 right-6 px-1 py-1 rounded-md font-medium bg-orange-500'>
                <p>
                  {`-${calculateDiscountAmount(price, promoPrice)} $`}
                </p>
              </div>
              <span className='text-2xl text-orange-500'>${promoPrice?.toFixed(2)}</span>
              <span className='text-xl line-through text-white'>${price.toFixed(2)}</span>
            </div>
          ): (
            <span className='text-2xl'>${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center cursor-pointer px-4 gap-2'>
        <button className='p-3 m-4 rounded-sm text-white text-xl bg-orange-600 hover:bg-orange-700 w-full' onClick={() => onAddProduct(id)}>
          Add to cart
        </button>
        {isFavouriteLocal ? (
          <FaHeart data-tooltip-id={`tooltip-heart-${id}`} className='text-3xl text-orange-600 focus-within:outline-none' onClick={handleFavouriteClick}/>
        ) : (
          <FaRegHeart data-tooltip-id={`tooltip-heart-${id}`} className='text-3xl hover:text-orange-600 focus-within:outline-none' onClick={handleFavouriteClick} />
        )}
        <Tooltip id={`tooltip-heart-${id}`} content={isFavourite ? 'Remove from wishlit' : 'Add to wishlist'} place='top'/>
      </div>
    </div>
  )
}

export default Product