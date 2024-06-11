import toast, { Toaster } from 'react-hot-toast';
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

// Graphic cards
import rtx3050 from './assets/images/rtx_3050.jpg';
import rtx3060 from './assets/images/rtx_3060.jpg';
import rtx3070 from './assets/images/rtx_3070.jpg';
import rtx3080 from './assets/images/rtx_3080.jpg';
import rtx4060 from './assets/images/rtx_4060.jpg';

// Monitors
import monitor_1 from './assets/images/monitor_1.jpg';
import monitor_2 from './assets/images/monitor_2.jpg';
import monitor_3 from './assets/images/monitor_3.jpg';
import monitor_4 from './assets/images/monitor_4.jpg';
import monitor_5 from './assets/images/monitor_5.jpg';

// Keyboards
import teclado_1 from './assets/images/hunstman_mini.jpg';
import teclado_2 from './assets/images/hyperx_alloy.jpg';
import teclado_3 from './assets/images/razer_blackwidow.jpg';
import teclado_4 from './assets/images/teclado_logitech.jpg';
import teclado_5 from './assets/images/teclado_asus.jpg';

// Motherboards
import motherboard_1 from './assets/images/motherboard_1.jpg';
import motherboard_2 from './assets/images/motherboard_2.jpg';
import motherboard_3 from './assets/images/motherboard_3.jpg';
import motherboard_4 from './assets/images/motherboard_4.jpg';
import motherboard_5 from './assets/images/motherboard_5.jpg';

// Variável para adicionar o Id aos produtos
let nextProductId = 1;

const initialProducts: ProductType[] = [

  // Graphic Cards
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3050 Ventus 2X XS 8G OC", description: 'Graphic Card RTX', price: 234.90, image: rtx3050, category: 'Graphic Cards' },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3060 Ventus 2X 12G OC", description: 'Graphic Card RTX paiosjdoijadioajdoijaaoidjoaijadoisjadoiajdioajdioajdoajioihajsiuodhauidhaiudhiauhdiuahdiuhdiuhaudihasiuhdisuahdiushaiuhd', price: 294.90, image: rtx3060, category: 'Graphic Cards' },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3070 Gaming X Trio 8G", description: 'Graphic Card RTX', price: 659.90, image: rtx3070, category: 'Graphic Cards' },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 3080 Gaming Z Trio 10G LHR", description: 'Graphic Card RTX', price: 1095.90, image: rtx3080, category: 'Graphic Cards' },
  { id: nextProductId++, title: "Graphic Card MSI GeForce RTX 4060 Ti Ventus 2X Black 8G GDDR6 OC", description: 'Graphic Card RTX', price: 399.90, image: rtx4060, category: 'Graphic Cards' },

  // Monitors
  { id: nextProductId++, title: "Monitor LG UltraGear 27GP850P-B Nano IPS 27'' QHD 16:9 180Hz(OC)/165Hz FreeSync / G-SYNC Compatible", description: 'Full HD Monitor', price: 299.90, image: monitor_1, category: 'Monitors' },
  { id: nextProductId++, title: "Monitor Lenovo D27-40 VA 27'' FHD 16:9 75Hz FreeSync", description: 'Full HD Monitor', price: 129.90, image: monitor_2, category: 'Monitors' },
  { id: nextProductId++, title: "Monitor BenQ Zowie XL2546K TN 24.5'' FHD 16:9 240Hz FreeSync Premium", description: 'Full HD Monitor', price: 429.90, image: monitor_3, category: 'Monitors' },
  { id: nextProductId++, title: "Monitor Curvo LG UltraWide 34WP75CP-B VA 34'' UWQHD 21:9 160Hz FreeSync Premium", description: 'Full HD Monitor', price: 329.90, image: monitor_4, category: 'Monitors' },
  { id: nextProductId++, title: "Monitor BenQ Mobiuz EX2710U IPS 247'' 4K UHD 16:9 144Hz FreeSync", description: 'Full HD Monitor', price: 699.90, image: monitor_5, category: 'Monitors' },

  // KeyBoards
  { id: nextProductId++, title: "Teclado Mecânico HyperX Alloy Origins 60 RGB Gaming US Red Switches", description: 'Mechanical Keyboard', price: 79.90, image: teclado_1, category: 'KeyBoards' },
  { id: nextProductId++, title: "Teclado Mecânico HyperX Alloy Elite 2 RGB Gaming US Red Switches", description: 'Mechanical Keyboard', price: 119.90, image: teclado_2, category: 'KeyBoards' },
  { id: nextProductId++, title: "Teclado Mecânico Razer Blackwidow V3 PT Tenkeyless RGB Yellow Switch", description: 'Mechanical Keyboard', price: 699.90, image: teclado_3, category: 'KeyBoards' },
  { id: nextProductId++, title: "Teclado Logitech G213 Prodigy Gaming RGB LIGHTSYNC PT Preto", description: 'Mechanical Keyboard', price: 65.90, image: teclado_4, category: 'KeyBoards' },
  { id: nextProductId++, title: "Teclado Asus Marshmallow Keyboard KW100 Wireless Bluetooth PT Beje", description: 'Mechanical Keyboard', price: 39.90, image: teclado_5, category: 'KeyBoards' },

  // Motherboards
  { id: nextProductId++, title: "Motherboards ATX MSI B650 Gaming Plus WiFi", description: 'Motherboard', price: 189.90, image: motherboard_1, category: 'MotherBoards' },
  { id: nextProductId++, title: "Motherboard ATX MSI MAG B650 Tomahawk WiFi", description: 'Motherboard', price: 219.90, image: motherboard_2, category: 'MotherBoards' },
  { id: nextProductId++, title: "Motherboard ATX MSI MPG B550 Gaming Plus", description: 'Motherboard', price: 134.90, image: motherboard_3, category: 'MotherBoards' },
  { id: nextProductId++, title: "Motherboard Micro-ATX Asus TUF Gaming B760M-Plus WiFi D4", description: 'Motherboard', price: 144.90, image: motherboard_4, category: 'MotherBoards' },
  { id: nextProductId++, title: "Motherboard ATX MSI Pro B650-S WiFi", description: 'Motherboard', price: 159.90, image: motherboard_5, category: 'MotherBoards' },
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
      toast.success(`${productToAdd.title} added to cart!`, {
        position: 'bottom-right',
        duration: 3000
      })
    }
  }

  function handleDeleteProduct(id: number) {
    setCart(cart.filter(product => product.id !== id));
    toast.error(`Remove from cart!`, {
      position: 'bottom-right',
      duration: 3000
    })
  }

  function handleAddToFavourites(product: ProductType) {
    const isAlreadyFavourite = favourites.some(fav => fav.id === product.id)
    if(isAlreadyFavourite) {
      window.alert('This product is already in favourites')
    }
    setFavourites(prevFavourites => [...prevFavourites, product])
    toast.success(`Product Add to Favourites!`, {
      position: 'bottom-right',
      duration: 3000
    })
  }

  function handleRemoveFromFavourites(id: number) {
    setFavourites(favourites.filter(product => product.id !== id));
    toast.error(`Product Removed from favourites!`, {
      position: 'bottom-right',
      duration: 3000
    })
  }

  return (
    // Router para definir rotas para a página de carrinho e detalhes do produto
    <Router>
      <Header cartItemsCount={cart.length} products={products} />
      <Routes>
        <Route path='/' element={<HomePage products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} favourites={favourites} />} />
        <Route path='/catalog' element={<Catalog products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} favourites={favourites} />} />
        <Route path='/cart' element={<Cart cartItems={cart} onDelete={handleDeleteProduct} />} />
        <Route path='/product/:id' element={<ProductDetails products={products} onAddProduct={handleAddProduct} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} favourites={favourites}/>} />
        <Route path='/favourites' element={<Favourites favourites={favourites} onAddToFavourites={handleAddToFavourites} onRemoveFromFavourites={handleRemoveFromFavourites} />} />
        <Route/>
      </Routes>
      <Footer />
      <Toaster/>
    </Router>
  );
}

export default App;
