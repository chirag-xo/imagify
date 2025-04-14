import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react" 

const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true }}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-black'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imaginaiton into visuals</p>

    <div className='flex flex-col gap-5 md:flex-row md:gap-14 items-center'>
        <img src={assets.sample_img_1} alt="" className='rounded-lg w-80 xl:w-96'/>
        <div>
            <h2 className='text-3xl sm:text-4xl font-medium mb-4 max-w-lg text-black'>
                Introducing the AI-Powered Text to Image Generator
            </h2>
            <p className='text-gray-500 mb-3 text-sm'>Easily bring your ideas to life with our free AI powered image generator. Weather you need stunning visuals or unique imagery, our tools transforms your text into eye-catching images with just few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
            <p className='text-gray-500 text-sm'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>

        </div>
    </div>

    </motion.div>
  )
}

export default Description