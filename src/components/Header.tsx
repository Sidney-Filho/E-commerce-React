// Importa o icone do carrinho
import { useState } from "react"
import { FaShoppingCart, FaUser, FaHeart, FaTimes  } from "react-icons/fa"
import { BsList } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { Product as ProductType } from '../interfaces'

interface HeaderProps {
  cartItemsCount: number
  products: ProductType[]
}

function Header({cartItemsCount, products}: HeaderProps) {

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [showCatalog, setShowCatalog] = useState(false)
  const navigate = useNavigate()

  function handleAccountClick() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    if(isAuthenticated) {
      navigate('/account')
    } else {
      navigate('/login')
    }
  }

  function handleSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    setSearchTerm(term)

    if(term) {
      const results = products.filter(product => 
        product.title.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredProducts(results)
    } else {
      setFilteredProducts([])
    }
  }

  function handleProductClick (id: number) {
    navigate(`/product/${id}`)
    setSearchTerm('')
    setFilteredProducts([])
  }

  function handleCatalogClick() {
    setShowCatalog(!showCatalog)
  }


  return(
    <div className="flex justify-between items-center p-8 bg-zinc-800">
      <div className="flex justify-center items-center gap-5 text-white">
        <BsList className="text-3xl cursor-pointer" onClick={handleCatalogClick}/>
        <Link to="/">
          <h1 className="text-3xl">BuyStore</h1>
        </Link>
      </div>
      {showCatalog && ( 
        <div className="absolute top-0 h-full left-0 w-96 z-50">
          <div className="bg-zinc-800 p-10 shadow-lg flex flex-col h-full">
            <div className="flex justify-start items-center gap-4">
              <FaTimes className="text-white text-2xl cursor-pointer hover:text-red-600" onClick={handleCatalogClick}/>
              <h3 className="text-3xl text-white">
                BuyStore
              </h3>
            </div>
              <span className="w-full h-dividerHeight rounded-md bg-zinc-600 mt-6"> </span>
            <Link to="/catalog" className="text-white text-lg cursor-pointer block mt-4 hover:bg-zinc-600 p-3 rounded-md focus-within:text-orange-500">
              Go to Catalog
            </Link>
          </div>
        </div>
      )}
      <div className="flex gap-4 relative">
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a product" 
          className="rounded-sm border-none w-96 py-2 bg-zinc-700 placeholder:p-4 placeholder:text-zinc-400 text-white p-4 focus-within:outline-none"
        />
        <button className="px-2 bg-orange-600 text-white rounded-sm">Search</button>

        {searchTerm && (
          <ul className="absolute top-12 w-full bg-zinc-700 rounded-md shadow-lg z-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <li
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="p-2 cursor-pointer hover:bg-zinc-600 text-white flex gap-4"
                >
                  <p className="w-4/5">
                    {product.title}
                  </p>
                  <p>
                    ${product.price.toFixed(2)}
                  </p>
                </li>
              ))
            ) : (
              <li className="p-2 text-white">Product Not Found</li>
            )}
          </ul>
        )}
      </div>

        <div className="flex gap-6">
          <Link to="/favourites" className="text-2xl text-white cursor-pointer">
            <FaHeart className="hover:text-orange-500"/>
          </Link>
            <button onClick={handleAccountClick} className="relative text-2xl text-white cursor-pointer">
              <FaUser className="hover:text-orange-500"/>
            </button>
          <Link to="/cart" className="relative text-2xl text-white cursor-pointer">
            <FaShoppingCart className="hover:text-orange-500"/>
          </Link>
        </div>
        {cartItemsCount > 0 && (
          <span className="absolute top-6 right-5 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {cartItemsCount}
        </span>
        )}
    </div>
  )
}

export default Header