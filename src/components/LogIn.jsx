import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from './AppContext'
import { motion } from "motion/react" 

const LogIn = () => {
    const [state, setstate] = useState('Login')
    const {setShowLogin} = useContext(AppContext)

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    },[])
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30w flex items-center justify-center'>
    <motion.form
    initial={{opacity:0.2,y:100}}
    transition={{duration:0.3}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true }}
    className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm mt-3'>Welcome back! Please Sign in to continue</p>

        {state !== 'Login' && <div className='flex border px-5 py-2 items-center gap-2 rounded-full mt-5 '>
            <img width={25} src={assets.profile_icon} alt=''/>
            <input type='text' className='outline-none text-sm' placeholder='Full Name' required/>
        </div>}

        <div className='flex border px-4 py-2 items-center gap-2 rounded-full mt-4 '>
            <img width={35} src={assets.email_icon} alt=''/>
            <input type='email' className='outline-none text-sm' placeholder='Email Id' required/>
        </div>

        <div className='flex border px-6 py-2 items-center gap-2 rounded-full mt-4 '>
            <img width={20} src={assets.lock_icon} alt=''/>
            <input type='password' className='outline-none text-sm' placeholder='Password ' required/>
        </div>
        <p className='text-sm text-blue-600 my-4 cursor-pointer '>Forgot Password ?</p>

        <button 
        className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'Create Account'}</button>

        { state === 'Login' ? <p className=' mt-5 text-center'>Don't have an account ?  
        <span className='text-blue-600 cursor-pointer' onClick={()=>setstate('Sign Up')} >  Sign Up</span></p>

        :

        <p className=' mt-5 text-center'>Already have an account ?   
        <span className='text-blue-600 cursor-pointer' onClick={()=> setstate('Login')}>  Login</span></p>}

        <img onClick={()=>(setShowLogin(false))}src={assets.cross_icon} alt='' className='absolute top-5 right-5 cursor-pointer'/>

    </motion.form>
      

    </div>
  )

}

export default LogIn