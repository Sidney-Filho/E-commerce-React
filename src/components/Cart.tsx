import { Product } from "../interfaces/interfaces"
import { FaTimes } from "react-icons/fa"

interface CartProps {
  cartItems: Product[]
  onDelete: (id: number) => void
}

function Cart({cartItems, onDelete}: CartProps) {

  const total = cartItems.reduce((sum, item) => {
    const itemPrice = item.promoPrice !== undefined ? item.promoPrice : item.price;
    return sum + itemPrice
  }, 0);


  return(
    <div className="p-8 text-white h-screen">
      <h2 className="text-3xl mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex justify-between gap-16">
          <div className="flex flex-col gap-4 w-4/5">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-zinc-700 p-4 rounded-md text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex">
                      {item.promoPrice ? (
                        <div className="flex gap-2">
                          <span className="text-orange-500">${item.promoPrice.toFixed(2)}</span>
                          <span className="line-through">${item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <div>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <button className="text-white text-2xl p-4 hover:text-red-600" onClick={() => onDelete(item.id)}>
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-3/12 h-1/2 bg-zinc-700 p-6 rounded-md text-white">
            <p>
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart