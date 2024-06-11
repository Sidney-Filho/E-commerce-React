import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Product as ProductType } from '../interfaces';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCarousel from './ImageCarousel';
import './styles/carousel.css'

interface HomePageProps {
  products: ProductType[];
  onAddProduct: (id: number) => void;
  onAddToFavourites: (product: ProductType) => void;
  favourites: ProductType[];
}

const HomePage: React.FC<HomePageProps> = ({ products, onAddProduct }) => {
  const rtxProducts = products.filter(product => product.category === 'Graphic Cards' && product.title.includes('RTX'));

  const settings = {
    dots: true,
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
    <div>
      <ImageCarousel/>
      <section className="mt-10 px-20 py-20 w-full">
        <div className="flex justify-between items-center h-full mb-4">
          <h2 className="text-3xl font-bold text-white">RTX Graphics Cards</h2>
          <Link to="/catalog?category=rtx" className="border-2 border-orange-500 p-4 rounded-md text-white hover:bg-orange-500">View All RTX Cards</Link>
        </div>
        <Slider {...settings}>
          {rtxProducts.map(product => (
            <div key={product.id} className="p-4">
              <div className="bg-zinc-800 rounded-lg p-6">
                <img src={product.image} alt={product.title} className="w-full h-44 object-cover rounded"/>
                <h3 className="text-white mt-4">{product.title}</h3>
                <p className="text-orange-600">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => onAddProduct(product.id)} 
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default HomePage;
