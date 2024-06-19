import React from 'react';
import Slider from 'react-slick';
import { Product as ProductType } from '../interfaces/interfaces';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/carousel.css'

interface ProductSliderProps {
  products: ProductType[];
  onAddProduct: (id: number) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, onAddProduct }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 864,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map(product => (
        <div key={product.id} className="p-4">
          <div className="bg-zinc-800 rounded-lg p-6 h-full">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded"/>
            <h3 className="text-white mt-4">{product.title}</h3>
            {product.promoPrice ? (
              <div className='flex gap-4 py-2'>
                <span className='text-2xl text-orange-500 font-bold'>${product.promoPrice.toFixed(2)}</span>
                <span className='text-xl line-through text-white font-bold'>${product.price.toFixed(2)}</span>
              </div>
            ): (
              <div className='py-2 px-0'>
                <span className='text-2xl text-white font-bold'>${product.price.toFixed(2)}</span>
              </div>
            )}
            <button 
              onClick={() => onAddProduct(product.id)} 
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
