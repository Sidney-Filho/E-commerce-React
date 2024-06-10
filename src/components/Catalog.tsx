import { useState, useMemo } from 'react';
import { Product as ProductType } from '../interfaces';
import Product from './Product';

interface CatalogProps {
  products: ProductType[];
  onAddProduct: (id: number) => void;
  onAddToFavourites: (product: ProductType) => void;
  onRemoveFromFavourites: (id: number) => void;
  favourites: ProductType[];
}

// Defina um tipo para as contagens das categorias
type CategoryCounts = {
  [key: string]: number;
}

function Catalog({ products, onAddProduct, onAddToFavourites, onRemoveFromFavourites, favourites }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const categoryCounts: CategoryCounts = { All: products.length };
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    return categoryCounts;
  }, [products]);

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div className="flex gap-6 h-full p-10">
      <aside className="flex flex-col h-3/5 bg-zinc-800 rounded-sm p-10 w-72 text-white">
        <div>
          <h3 className="text-3xl font-bold">Catalog</h3>
          <p className='mt-2'>{filteredProducts.length} results.</p>
        </div>
        <div>
          <h4 className="mt-4 text-xl font-bold">Filters</h4>
          <div className="mt-4 flex flex-col gap-2">
            {Object.keys(categories).map((category: string) => (
              <button
                key={category}
                className={`py-2 px-4 rounded ${selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-zinc-700 text-gray-300'} hover:bg-orange-700`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({categories[category]})
              </button>
            ))}
          </div>
        </div>
      </aside>
      <main className='flex gap-6 flex-wrap flex-grow w-full justify-start'>
        {filteredProducts.map(product => (
          <Product
            key={product.id}
            {...product}
            onAddProduct={onAddProduct}
            onAddToFavourites={onAddToFavourites}
            onRemoveFromFavourites={onRemoveFromFavourites}
            isFavourite={favourites.some(fav => fav.id === product.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default Catalog;
