function Footer() {
  return(
    <div className="h-96 flex justify-start items-start mt-4 p-20 gap-x-40 bg-zinc-800 text-white">
      <div>
        <h4 className="text-2xl mb-4 font-bold">Client Support</h4>
        <li className="flex flex-col gap-y-3">
          <a href="" className="hover:text-orange-500">Help center</a>
          <a href="" className="hover:text-orange-500">Shipping Taxs</a>
          <a href="" className="hover:text-orange-500">Your Orders</a>
          <a href="" className="hover:text-orange-500">Returns & Replacements</a>
          <a href="" className="hover:text-orange-500">Help</a>
        </li>
      </div>

      <div>
        <h4 className="text-2xl mb-4 font-bold">Get to Know Us</h4>
        <li className="flex flex-col gap-y-3">
          <a href="" className="hover:text-orange-500">Sell products on BuyStore</a>
          <a href="" className="hover:text-orange-500">Sell on BuyStore Business</a>
          <a href="" className="hover:text-orange-500">Advertise Your Products</a>
          <a href="" className="hover:text-orange-500">Shop with Points</a>
          <a href="" className="hover:text-orange-500">Reload you balance</a>
        </li>
      </div>

      <div>
        <h4 className="text-2xl mb-4 font-bold">Legal</h4>
        <li className="flex flex-col gap-y-3">
          <a href="" className="hover:text-orange-500">Terms & Conditions</a>
          <a href="" className="hover:text-orange-500">Sulla Privacy</a>
          <a href="" className="hover:text-orange-500">Cookies</a>
          <a href="" className="hover:text-orange-500">Rater Book</a>
        </li>
      </div>

    </div>
  )
}

export default Footer