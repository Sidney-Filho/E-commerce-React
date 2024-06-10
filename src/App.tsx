import { useState, useEffect } from 'react';
import { Product as ProductType } from './interfaces';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importa os componentes
import Header from './components/Header';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import Catalog from './components/Catalog';
import Favourites from './components/Favourites';
import Footer from './components/Footer';

// Importa as Imagens dos Produtos
import rtx3050 from './assets/images/rtx_3050.jpg';
import rtx3060 from './assets/images/rtx_3060.jpg';
import rtx3070 from './assets/images/rtx_3070.jpg';
import rtx3080 from './assets/images/rtx_3080.jpg';

// Variável para adicionar o Id aos produtos
let nextProductId = 1;

const initialProducts: ProductType[] = [
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3050 Ventus 2X XS 8G OC", description: 'Graphic Card RTX', price: 234.90, image: rtx3050 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3060 Ventus 2X 12G OC", description: 'Graphic Card RTX', price: 294.90, image: rtx3060 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3070 Gaming X Trio 8G", description: 'Graphic Card RTX', price: 659.90, image: rtx3070 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3080 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 87.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 2060 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 289.90, image: rtx3080 },
];

function App() {

  // Cria um estado que contém arrays, para adicionar produtos ao carrinho e aos favoritos
  const [cart, setCart] = useState<ProductType[]>([]);
  const [favourites, setFavourites] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);


  useEffect(() => {
    // Inicializa os produtos uma vez quando o componente é montado
    setProducts(initialProducts);
  }, []);

  function handleAddProduct(id: number) {
    const productToAdd = products.find(product => product.id === id);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
    }
  }

  function handleDeleteProduct(id: number) {
    setCart(cart.filter(product => product.id !== id));
  }

  function handleAddToFavourites(product: ProductType) {
    const isAlreadyFavourite = favourites.some(fav => fav.id === product.id)
    if(isAlreadyFavourite) {
      window.alert('Esse produto ja foi add')
    }
    setFavourites(prevFavourites => [...prevFavourites, product])
  }

  function handleRemoveFromFavourites(id: number) {
    setFavourites(favourites.filter(product => product.id !== id));
  }

  return (
    // Router para definir rotas para a página de carrinho e detalhes do produto
    <Router>
      <Header cartItemsCount={cart.length} products={products} />
      <Routes>
        <Route path='/' element={<HomePage products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} />} />
        <Route path='/catalog' element={<Catalog products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} favourites={favourites} />} />
        <Route path='/cart' element={<Cart cartItems={cart} onDelete={handleDeleteProduct} />} />
        <Route path='/product/:id' element={<ProductDetails products={products} />} />
        <Route path='/favourites' element={<Favourites favourites={favourites} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
