import { Product as ProductType } from "../interfaces/interfaces"
import Product from "./Product"

interface FavouritesProps {
  favourites: ProductType[]
  onAddToFavourites: (product: ProductType) => void;
  onRemoveFromFavourites: (id: number) => void;
  onUpdatedRating: (id: number) => void;
}

function Favourites({favourites, onAddToFavourites, onRemoveFromFavourites, onUpdatedRating}: FavouritesProps) {
  return(
    <div className="flex gap-10 h-full p-10 relative">
      <aside className="flex flex-col bg-zinc-800 rounded-sm p-10 w-64 h-60 sticky self-start top-10">
        <div className="text-white">
          <h3 className="text-3xl font-bold">Favourites</h3>
          <p>{favourites.length} results.</p>
        </div>
      </aside>
      <main className='flex gap-6 flex-wrap'>
        {favourites.map(product => (
          <Product 
            key={product.id} 
            {...product} 
            onAddProduct={() => {}} 
            onAddToFavourites={onAddToFavourites}
            onRemoveFromFavourites={onRemoveFromFavourites} 
            isFavourite={true} 
            updatedRating={product.rating}
            onUpdatedRating={onUpdatedRating}
          />
        ))}
      </main>
    </div>
  )
}

export default Favourites