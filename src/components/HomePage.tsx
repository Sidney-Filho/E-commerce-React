import Product from "./Product"
import ImageCarousel from "./ImageCarousel"
import { Product as ProductType } from '../interfaces'

interface HomePageProps {
  products: ProductType[];
  onAddProduct: (id: number) => void;
  onAddToFavourites: (product: ProductType) => void;
}

function HomePage({products, onAddProduct, onAddToFavourites}: HomePageProps) {
  return(
    <div>
      <ImageCarousel/>
      <div className='flex items-center justify-center p-10 gap-10 flex-wrap h-full'>
          {products.map((product) => (
            <Product key={product.id} {...product} onAddProduct={onAddProduct} onAddToFavourites={onAddToFavourites} />
          ))}
      </div>
    </div>
  )
}

export default HomePage