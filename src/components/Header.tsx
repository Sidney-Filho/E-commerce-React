import { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Product as ProductType } from "../interfaces/interfaces";
import { useAuth } from "./AuthContext";
import toast, { Toaster } from 'react-hot-toast';

interface HeaderProps {
  cartItemsCount: number;
  products: ProductType[];
}

function Header({ cartItemsCount, products }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false)
  const navigate = useNavigate();
  const { user, logout } = useAuth()

  // Refs for the menu and user modal
  const menuRef = useRef<HTMLDivElement>(null);
  const userModalRef = useRef<HTMLDivElement>(null);

  // Effect para controlar o scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (showCatalog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Restaura para o comportamento default
    };
  }, [showCatalog]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if(showCatalog && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCatalog(false)
      }
      if(showModalUser && userModalRef.current && !userModalRef.current.contains(event.target as Node)) {
        setShowModalUser(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return() => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[showCatalog, showModalUser])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }

  function handleProductClick(id: number) {
    navigate(`/product/${id}`);
    setSearchTerm("");
    setFilteredProducts([]);
  }

  function handleCatalogClick() {
    setShowCatalog(!showCatalog);
  }

  function handleShowModalUser() {
    setShowModalUser(!showModalUser)
  }

  function handleLogout() {
    logout()
    toast.success('Successfuly logged out!')
  }

  function handleSearch() {
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setFilteredProducts([]);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <header className="relative">
      <Toaster/>
      {showCatalog && <div className="fixed top-0 left-0 w-full h-dvh bg-black opacity-50 z-40"></div>}
      <div className="flex justify-between items-center p-8 bg-zinc-800 shadow-md relative z-50">
        <div className="flex justify-center items-center gap-5 text-white">
          <BsList className="text-3xl cursor-pointer hover:text-orange-500 transition-colors" onClick={handleCatalogClick} />
          <Link to="/">
            <h1 className="text-3xl">BuyStore</h1>
          </Link>
        </div>
        <div
          ref={menuRef}
          className={`absolute top-0 h-full left-0 w-96 z-50 transform transition-transform duration-300 ${
            showCatalog ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="bg-zinc-800 p-10 shadow-lg flex flex-col h-screen">
            <div className="flex justify-start items-center gap-4">
              <BsX
                size={38}
                className="text-white text-2xl cursor-pointer hover:text-orange-500 transition-colors"
                onClick={handleCatalogClick}
              />
              <h3 className="text-3xl text-white">BuyStore</h3>
            </div>
            <span className="w-full h-dividerHeight rounded-md bg-zinc-600 mt-6"></span>
            <Link 
              to='/' 
              className="text-white text-lg cursor-pointer block mt-4 hover:bg-zinc-600 p-3 rounded-md focus-within:text-orange-500"
              onClick={handleCatalogClick}
            >
                Home
            </Link>
            <Link
              to="/catalog"
              className="text-white text-lg cursor-pointer block mt-4 hover:bg-zinc-600 p-3 rounded-md focus-within:text-orange-500"
              onClick={handleCatalogClick}
            >
              Go to Catalog
            </Link>
          </div>
        </div>
        <div className="flex gap-4 relative">
          <div className="flex gap-4">
            <div className="absolute text-white bottom-[12px] left-3 text-lg">
              <BsSearch />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search for a product"
              className="rounded-sm border-none w-96 py-2 bg-zinc-700 placeholder:p-1 placeholder:text-zinc-400 text-white px-10 focus-within:outline-none"
            />
            <button onClick={handleSearch} className="px-2 bg-orange-600 hover:bg-orange-500 text-white rounded-sm">Search</button>
          </div>

          {searchTerm && (
            <ul className="absolute top-12 w-full bg-zinc-700 rounded-md shadow-lg z-10">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <li
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="p-2 cursor-pointer hover:bg-zinc-600 text-white flex gap-4"
                  >
                    <p className="w-4/5">{product.title}</p>
                    <p>${product.price.toFixed(2)}</p>
                  </li>
                ))
              ) : (
                <li className="p-2 text-white">Product Not Found</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex gap-8 relative">
          <Link to="/favourites" className="text-2xl text-white cursor-pointer">
            <FaHeart className="hover:text-orange-500" />
          </Link>
          <div ref={userModalRef} className="text-lg text-white cursor-pointer text-center" onClick={handleShowModalUser}>
            <div
              className={`bg-zinc-700 rounded-md absolute top-12 h-fit left-[-100px] z-50 ${ showModalUser ? "translate-y-0" : "-translate-y-96"}`}
            >
                {user ? (
                  <div>
                    <Link to="/dashboard" className="text-lg text-white cursor-pointer">
                      <div className="flex justify-center items-center gap-2 border-b-2 border-b-zinc-500 w-64 p-2 bg-zinc-700 hover:bg-zinc-600 rounded-t-lg">
                        <FaUser />
                        <p>My Dashboard</p>
                      </div>
                    </Link>
                    <div className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-b-lg">
                    <div onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                    <Link to='/login' className="text-lg text-white cursor-pointer" onClick={handleShowModalUser}>
                      <div className="flex justify-center items-center gap-2 w-64 p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg">
                        <FaUser />
                        <p>Login</p>
                      </div>
                    </Link>
                )}
            </div>

            <FaUser className="hover:text-orange-500 text-2xl"/>
          </div>

          <Link to="/cart" className="relative text-2xl text-white cursor-pointer">
            <FaShoppingCart className="hover:text-orange-500" />
          </Link>

        </div>
        {cartItemsCount > 0 && (
          <span className="absolute top-6 right-5 bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItemsCount}
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
