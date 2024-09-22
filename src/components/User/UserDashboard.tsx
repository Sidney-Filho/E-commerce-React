import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


function Dashboard() {
  const { user, logout } = useAuth();
  const [deleteStatus, setDeleteStatus] = useState('')

  const handleDeleteAccount = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/ecommerce/api/deleteUser.php?id=${id}`)
      if(response.data.status === 'success') {
        toast.success('Account Deleted', {
          position: 'top-center',
          duration: 4000
        })
        setDeleteStatus('success')
        logout()
      } else {
        setDeleteStatus('error')
      }
    } catch(error) {
      console.error('Error deleting account: ', error)
      setDeleteStatus('error')
    }
  }

  if(!user) {
    return
  }

  return (
    <div className='flex justify-center items-start mt-20 h-screen w-full'>
        <div className='bg-zinc-800 text-white p-10 rounded-md w-2/4'>
          <h1 className='text-3xl font-bold'>Welcome, {user?.username}</h1>
          <div className='mt-6'>
            <p className='text-xl'>Your e-mail: {user?.email}</p>
          </div>
          <div className='mt-20'>
            <button 
              className='p-4 border-2 rounded-md border-red-600 hover:bg-red-600 text-white' 
              onClick={() => handleDeleteAccount(user?.id)}>
              Delete Your Account
            </button>
              {deleteStatus === 'success' && <p className='text-green-500 mt-2'>Account deleted successfully</p>}
              {deleteStatus === 'error' && <p className='text-red-500 mt-2'>Failed to delete account</p>}
          </div>
        </div>
        <Toaster/>
    </div>
  );
}

export default Dashboard;
