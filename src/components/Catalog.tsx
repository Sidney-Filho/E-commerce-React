  import { useState, useMemo, useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
  import { Product as ProductType } from '../interfaces';
  import Product from './Product';

  interface CatalogProps {
    products: ProductType[];
    onAddProduct: (id: number) => void;
    onAddToFavourites: (product: ProductType) => void;
    onRemoveFromFavourites: (id: number) => void;
    favourites: ProductType[];
  }

  type CategoryCounts = {
    [key: string]: number;
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function Catalog({ products, onAddProduct, onAddToFavourites, onRemoveFromFavourites, favourites }: CatalogProps) {
    const query = useQuery();
    const categoryFromQuery = query.get('category');
    const searchFromQuery = query.get('search')
    
    const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery || 'All');
    const [searchTerm, setSearchTerm] = useState(searchFromQuery || '');
    const [sortOrder, setSortOrder] = useState<'default' | 'price-desc' | 'price-asc'>('default');
    const [catalogProducts, setCatalogProducts] = useState<ProductType[]>(products)

    useEffect(() => {
      if (categoryFromQuery) {
        setSelectedCategory(categoryFromQuery);
      }
      if(searchFromQuery) {
        setSearchTerm(searchFromQuery)
      }
    }, [categoryFromQuery, searchFromQuery]);

    const categories = useMemo(() => {
      const categoryCounts: CategoryCounts = { All: catalogProducts.length };
      catalogProducts.forEach((product: ProductType) => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      });
      return categoryCounts;
    }, [catalogProducts]);

    const filteredProducts = useMemo(() => {
      let filtered = selectedCategory === 'All' 
        ? catalogProducts 
        : selectedCategory === 'rtx' 
        ? catalogProducts.filter((product: ProductType) => product.category === 'Graphic Cards' && product.title.includes('RTX')) 
        : catalogProducts.filter((product: ProductType) => product.category === selectedCategory);

        if(searchTerm) {
          filtered = filtered.filter((product: ProductType) => 
            product.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
          )
        }

      if (sortOrder === 'price-desc') {
        filtered.sort((a: ProductType, b: ProductType) => {
          const priceA = a.promoPrice || a.price;
          const priceB = b.promoPrice || b.price;
          return priceB - priceA;
        });
      } else if (sortOrder === 'price-asc') {
        filtered.sort((a: ProductType, b: ProductType) => {
          const priceA = a.promoPrice || a.price;
          const priceB = b.promoPrice || b.price;
          return priceA - priceB;
        });
      } else {
        // Embaralhar apenas quando sortOrder é 'default'
        filtered.sort(() => Math.random() - 0.5);
      }

      return filtered;
    }, [catalogProducts, selectedCategory, searchTerm, sortOrder]);

    const handleUpdateProductRating = (id: number, newRating: number) => {
      setCatalogProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === id ? {...product, rating: newRating} : product
        )
      )
    }

    return (
      <div className="flex gap-6 h-full p-10 relative">
        <aside className="sticky top-10 self-start flex flex-col bg-zinc-800 rounded-sm p-10 w-72 text-white">
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
            <div className="mt-4">
              <h4 className="text-xl font-bold">Sort By</h4>
              <select 
                className="mt-2 p-2 rounded bg-zinc-700 text-gray-300 cursor-pointer focus-within:outline-none"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'default' | 'price-desc' | 'price-asc')}
              >
                <option value="default">Default</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>
          </div>
        </aside>
        <main className='flex gap-6 flex-wrap flex-grow w-full justify-start'>
          {filteredProducts.map((product: ProductType) => (
            <Product
              key={product.id}
              {...product}
              onAddProduct={onAddProduct}
              onAddToFavourites={onAddToFavourites}
              onRemoveFromFavourites={onRemoveFromFavourites}
              isFavourite={favourites.some((fav: ProductType) => fav.id === product.id)}
              updatedRating={product.rating}
              onUpdatedRating={handleUpdateProductRating}
            />
          ))}
        </main>
      </div>
    );
  }

  export default Catalog;
