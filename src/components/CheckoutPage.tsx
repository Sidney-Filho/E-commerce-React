import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

function CheckoutPage(){

  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost/ecommerce/api/payment.php', {
        name,
        cardNumber,
        expiryDate,
        cvv
      })
      toast.success('Payment Succed!', {
        duration: 6000
      })
      console.log(response.data.message)
      
    } catch(error) {
      console.error('Payment Error: ', error)
      alert('Payment error, try again')
    }
  }

  return(
    <div className="w-full h-screen flex items-center justify-center">
      <Toaster/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 text-white w-2/4">
        <div className="flex flex-col gap-3">
          <label>Card Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-sm p-2 border-none bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none" 
            placeholder="Card Name"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Card Number</label>
          <input 
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)} 
            className="rounded-sm p-2 border-none bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none" 
            placeholder="0000 0000 0000 0000"
            required
          />
        </div>
        <div className="flex flex-col gap-3"> 
          <label>Expiry Date</label>
          <input 
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)} 
            className="rounded-sm p-2 border-none bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none"
            placeholder="MM/YY"
            required 
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>CVV</label>
          <input 
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)} 
            className="rounded-sm p-2 border-none bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none"
            placeholder="123"
            required 
          />
        </div>
        <button type="submit" className="bg-green-500 p-4 text-xl hover:bg-green-600">
          Pay
        </button>
      </form>
    </div>
  )
}

export default CheckoutPage