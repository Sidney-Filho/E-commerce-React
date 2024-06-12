import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert('Please enter your email address.');
      return; // Prevent form submission if email is empty
    }
    try {
      const response = await axios.post('http://localhost/ecommerce/api/registerUser.php', {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(response.data)

      if(response.data.status === 'success') {
        navigate('/login')
        toast.success('User created successfully!'), {
          position: 'top-center',
          duration: 4000
        }
      } else {
        toast.error('Error! This user already exists!'), {
          position: 'top-center',
          duration: 4000
        }
        
      }
    } catch(error) {
      console.error('There was an error!', error)
    }
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return(
    <div className="w-full pb-36 flex justify-center items-start mt-20 text-white">
      <Toaster/>
      <div className="bg-zinc-800 p-10 w-2/4">
        <h3 className="text-2xl text-center mb-6 font-bold">Register</h3>
        <form action="POST" method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-6">
            <label id="username" htmlFor="username"> Username </label>
            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="p-2 text-black" required />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label id="email" htmlFor="email"> Email </label>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="p-2 text-black" required />
          </div>
          <div className="flex flex-col gap-2">
            <label id="password" htmlFor=""> Password </label>
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 text-black" required/>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button type="submit" className="p-4 bg-orange-500 w-full">
              Create Account
            </button>
          </div>
          <div className="flex gap-1 justify-center mt-10">
            <p>Already have an account? </p>
            <Link to='/login' className="text-orange-400 hover:text-orange-600">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage