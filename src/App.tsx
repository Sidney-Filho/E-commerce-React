// App.tsx

import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Product as ProductType } from './interfaces/interfaces';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import axios from 'axios';
import './App.css';

// Importa os componentes
import Header from './components/Header';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import Catalog from './components/Catalog';
import Favourites from './components/Favourites';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDashBoard from './components/UserDashboard';

function App() {
  // Cria um estado que contém arrays, para adicionar produtos ao carrinho e aos favoritos
  const [cart, setCart] = useState<ProductType[]>([]);
  const [favourites, setFavourites] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/ecommerce/api/getProducts.php');
        setProducts(response.data);
        console.log(response.data);
      } catch(error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (id: number) => {
    const productToAdd = products.find(product => product.id === id);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
      toast.success(`${productToAdd.title} added to cart!`, {
        position: 'bottom-right',
        duration: 3000
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setCart(cart.filter(product => product.id !== id));
    toast.error(`Remove from cart!`, {
      position: 'bottom-right',
      duration: 3000
    });
  };

  const handleAddToFavourites = (product: ProductType) => {
    const isAlreadyFavourite = favourites.some(fav => fav.id === product.id);
    if (isAlreadyFavourite) {
      window.alert('This product is already in favourites');
    }
    setFavourites(prevFavourites => [...prevFavourites, product]);
    toast.success(`Product Add to Favourites!`, {
      position: 'bottom-right',
      duration: 3000
    });
  };

  const handleRemoveFromFavourites = (id: number) => {
    setFavourites(favourites.filter(product => product.id !== id));
    toast.error(`Product Removed from favourites!`, {
      position: 'bottom-right',
      duration: 3000
    });
  };

  const onUpdateProductRating = (id: number, newRating: number) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === id) {
          return { ...product, rating: newRating };
        }
        return product;
      });
    });
  };

  return (
    // Router para definir rotas para a página de carrinho e detalhes do produto
    <AuthProvider>
      <Header cartItemsCount={cart.length} products={products} />
      <Routes>
        <Route path='/' element={<HomePage products={products} onAddProduct={handleAddProduct} />} />
        <Route path='/catalog' element={<Catalog products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} favourites={favourites} />} />
        <Route path='/cart' element={<Cart cartItems={cart} onDelete={handleDeleteProduct} />} />
        <Route path='/product/:id' element={<ProductDetails products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} favourites={favourites} onUpdateProductRating={onUpdateProductRating} />} />
        <Route path='/favourites' element={<Favourites favourites={favourites} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<RegisterPage />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='' element={<UserDashBoard />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
