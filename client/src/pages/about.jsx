import React from 'react'
import Navigation from '../components/navigation';

const About = () => {
  return (
      <>

        <Navigation />
      <div className='flex flex-col min-h-screen py-15 bg-main-color'>

        <div className='mt-10 text-center'>
            <h2 className='text-3xl text-bg-color font-lora'>About us</h2>
            <p className='text-sm text-accent-color'>Knowing more about us</p>
        </div>


        <div className='flex items-center justify-center gap-x-20 mt-20'>

            <div>
              <img src="about-img.avif" alt="cookies-image" width={280} className='rounded-md shadow-sm shadow-orange-200'/>
            </div>

            <div>
                <p className='w-80 text-bg-color text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem explicabo labore laudantium, architecto laborum obcaecati modi quaerat quod, cumque culpa voluptates nisi ratione. At ad quae nobis animi, labore consectetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, iure. Ducimus libero sed architecto corrupti ipsam reiciendis ad, laudantium, a quo mollitia in accusantium ullam neque nisi ab beatae. Cum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, commodi! Ad delectus fuga veniam ducimus quo non in quis quas ex, dolores dolorum minus architecto, autem libero ab unde atque? lorem.</p>
            </div>
            
        </div>

      </div>
    </>
      
  )
}

export default About;
