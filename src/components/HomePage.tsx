import React from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from './ProductSlide';
import { Product as ProductType } from '../interfaces';
import ImageCarousel from './ImageCarousel';
import './styles/carousel.css'

interface HomePageProps {
  products: ProductType[];
  onAddProduct: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onAddProduct }) => {
  
  // Verifica se os produtos não retornam nulo
  if(!products) {
    return null
  }
  // Filtra os produtos RTX
  const rtxProducts = products.filter(product => product.category === 'GraphicCards' && product.title.includes('RTX'));

  return (
    <div>
      <ImageCarousel/>
      <section className='py-20 px-24'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <span className='h-6 w-1 bg-orange-500'></span>
            <h2 className='text-2xl font-bold text-white'>RTX Graphics Cards</h2>
          </div>
          <Link to="/catalog?category=GraphicCards" className='text-white p-4 mt-4 border border-orange-500 rounded-md hover:bg-orange-500'>View All RTX Cards</Link>
        </div>
        <ProductSlider products={rtxProducts} onAddProduct={onAddProduct} />
      </section>
    </div>
  );
};

export default HomePage;
