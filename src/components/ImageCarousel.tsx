import "react-responsive-carousel/lib/styles/carousel.min.css"; // Necessário para os estilos
import { Carousel } from 'react-responsive-carousel';
import './styles/carousel.css'

import banner1 from '../assets/images/bannerImg/banner-1.jpg'
import banner2 from '../assets/images/bannerImg/banner-2.jpg'
import banner3 from '../assets/images/bannerImg/banner-3.jpg'

function ImageCarousel() {
  return(
    <div className="w-full">
      <Carousel 
        showThumbs={false} 
        infiniteLoop useKeyboardArrows 
        autoPlay
        showStatus={false}
        interval={4000}
        transitionTime={500}
      >
        <div>
          <img src={banner1} alt="Image 1" className="w-full h-96 object-cover"/>
        </div>
        <div>
          <img src={banner2} alt="Image 2" className="w-full h-96 object-cover" />
        </div>
        <div>
          <img src={banner3} alt="Image 3" className="w-full h-96 object-cover" />
        </div>
      </Carousel>
    </div>
  )
}

export default ImageCarousel