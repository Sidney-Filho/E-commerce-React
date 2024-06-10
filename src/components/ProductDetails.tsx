import { useParams } from "react-router-dom"
import { Product } from "../interfaces"

interface ProductDetailsProps {
  products: Product[]
}

function ProductDetails({products}: ProductDetailsProps) {

  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === Number(id))

  if(!product) {
    return <div>Product Not Found</div>
  }

  return(
    <div className="flex gap-5 p-8">
      <div className="p-4 bg-zinc-800 rounded-md">
        <img src={product.image} alt="" className="rounded-md"/>
      </div>
      <div className="w-4/5 bg-zinc-800 p-10 text-white rounded-md">
        <h2 className="text-4xl mb-10">{product.title}</h2>
        <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
        <div className="mt-24 h-2/4">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <p className="text-xl">{product.description}</p>
        </div>
        <div className="flex">
          <button className="border hover:bg-white hover:text-black p-5 rounded-md text-xl">Add to Cart</button>
        </div>
      </div>
    </div>
  )

}

export default ProductDetails