import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "./AuthContext";


function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent <HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost/ecommerce/api/login.php', {
        email,
        password
      })
      const data = response.data
      if(data.status === 'success') {
        login(response.data.user)
        toast.success('Login successfully!', {
          position: 'top-center',
          duration: 4000
        })
        console.log(data.user)
      } else {
        toast.error('Username or password invalid'), {
          position: 'top-center',
          duration: 4000
        }
      }
    } catch(error) {
      console.error('There was an error!', error)
    }
  }

  return(
    <div className="w-full pb-36 flex justify-center items-start mt-20 text-white">
      <div className="bg-zinc-800 p-10 w-2/4">
        <h3 className="text-4xl text-center mb-8 font-bold">Login</h3>
        <form action="POST" method="POST" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2 mb-6">
            <label id="email" htmlFor="email" className="font-bold">Email</label>
            <input 
              name="email" 
              type="text" 
              placeholder="Email" 
              className="rounded-sm border-none w-full p-3 bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label id="password" htmlFor="password" className="font-bold">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              className="rounded-sm border-none w-full p-3 bg-zinc-700 placeholder:text-zinc-400 text-white focus-within:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-10">
              <button type="submit" className="p-4 bg-orange-500 w-2/4 hover:bg-orange-600 rounded-md">
                  Login
              </button>
          </div>
          <div className="flex gap-2 justify-center items-center mt-6 text-base text-center">
            <p>Don't have an account? </p>
            <Link to='/create-account' className="text-orange-400 hover:text-orange-600">
              Create Account
            </Link>
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  )
}

export default LoginPage