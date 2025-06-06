import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext'

const Navbar = () => {

  const { user, setShowLogin , logOut , credit } = useContext(AppContext)

  const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center py-4'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
      </Link>
      <div>
        {
          user ?
            /*if user is logged in*/
            <div className='flex items-center gap-2 sm:gap-3'>
              <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 sm:px-6 sm:py-3 roouded-full hover:scale-105 transition-all duration-700 ease-in-out'>
                <img className='w-5' src={assets.credit_star} alt='' />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits Left : {credit} </p>
              </button>
              <p className='text-gray-600 max-sm:hidden pl-4 '>Hi, { user.name}</p>
              <div className='relative group'>
                <img src={assets.profile_icon} className="w-10 drop-shadow" alt="" />
                <div className='absolute top-0 right-0 z-10 text-black rounded pt-12 hidden group-hover:block'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li onClick={logOut}
                    className='py-1 px-2 cursor-pointer pr-10'>LogOut</li>
                  </ul>

                </div>
              </div>
            </div>
            :
            /*if user is logged out*/
            <div className='flex items-center gap-2 sm:gap-5'>
              <p onClick={() => navigate('/buy')}
                className='cursor-pointer text-black'>Pricing</p>
              <button onClick={() => setShowLogin(true)}
                className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
            </div>


        }
      </div>

    </div>
  )
}

export default Navbar