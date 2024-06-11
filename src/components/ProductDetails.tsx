import { useParams } from "react-router-dom"
import { Product } from "../interfaces"
import { FaHeart, FaRegHeart } from "react-icons/fa"

interface ProductDetailsProps {
  products: Product[]
  onAddProduct: (id: number) => void
  onAddToFavourites: (product: Product) => void;
  onRemoveFromFavourites: (id: number) => void
  favourites: Product[]
}

function ProductDetails({products, onAddProduct, favourites, onAddToFavourites, onRemoveFromFavourites}: ProductDetailsProps) {

  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === Number(id))

  if(!product) {
    return <div>Product Not Found</div>
  }

  const isFavourite = favourites.some(fav => fav.id === product.id)

  return(
    <div className="flex gap-5 p-8">
      <div className="p-4 bg-zinc-800 rounded-md">
        <img src={product.image} alt="Product image" className="rounded-md"/>
      </div>
      <div className="w-4/5 bg-zinc-800 p-10 text-white rounded-md">
        <h2 className="text-4xl mb-10">{product.title}</h2>
        <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
        <div className="mt-24 h-2/4">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <p className="text-xl">{product.description}</p>
        </div>
        <div className="flex gap-8 items-center">
          <button className="bg-orange-500 hover:bg-orange-600 p-5 rounded-md text-xl w-80" onClick={() => onAddProduct(product.id)}>Add to Cart</button>
          {isFavourite ? (
            <FaHeart className='text-3xl text-orange-600 focus-within:outline-none cursor-pointer' onClick={() => onRemoveFromFavourites(product.id)}/>
            ) : (
            <FaRegHeart className='text-3xl hover:text-orange-600 focus-within:outline-none cursor-pointer' onClick={() => onAddToFavourites(product)}/>
          )}
        </div>
      </div>
    </div>
  )

}

export default ProductDetails