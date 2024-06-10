import { Product as ProductType } from '../interfaces'
import Product from './Product'


interface CatalogProps {
  products: ProductType[]
  onAddProduct: (id: number) => void
  onAddToFavourites: (product: ProductType) => void
  onRemoveFromFavourites: (id: number) => void
  favourites: ProductType[]
}

function Catalog({products, onAddProduct, onAddToFavourites, onRemoveFromFavourites, favourites}: CatalogProps){
  return(
    <div className="flex gap-6 h-full p-10">
      <aside className="flex flex-col h-3/5 bg-zinc-800 rounded-sm p-10 w-72 text-white">
        <div>
          <h3 className="text-3xl font-bold">Catalog</h3>
          <p className='mt-2'>{products.length} results.</p>
        </div>
        <div>
          <h4>Filters</h4>
        </div>
      </aside>
      <main className='flex gap-6 flex-wrap flex-grow w-full justify-start'>
          {products.map(product => (
            <Product key={product.id} {...product} onAddProduct={onAddProduct} onAddToFavourites={onAddToFavourites} onRemoveFromFavourites={onRemoveFromFavourites} isFavourite={!favourites.find(fav => fav.id === product.id)}/>
          ))}
      </main>
    </div>
  )
}

export default Catalog