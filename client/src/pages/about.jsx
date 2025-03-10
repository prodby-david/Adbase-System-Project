import React from 'react'
import Navigation from '../components/navigation';

const About = () => {
  return (
      <>

      <Navigation />

      <div className='flex flex-col min-h-screen py-15 px-5 bg-bg-color'>

        <div className='mt-10 text-center' data-aos="fade-down" data-aos-duration="2000" data-aos-delay="800">
            <h2 className='text-3xl text-accent-color font-lora'>About us</h2>
            <p className='text-sm text-text-color'>Knowing more about us</p>
        </div>


        <div className='flex flex-col md:flex-row items-center justify-center gap-x-5 md:gap-x-20 mt-20'>

            <div data-aos="fade-right" data-aos-duration="2000" data-aos-delay="800">
              <img src="/about-img.avif" alt="cookies-image" className='rounded-md shadow-sm shadow-orange-200 w-70 h-60 object-cover md:w-70 md:h-100 md:object-center'/>
            </div>

            <div data-aos="fade-left" data-aos-duration="2000" data-aos-delay="800">
                <p className='w-full max-w-xs text-text-color text-justify mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem explicabo labore laudantium, architecto laborum obcaecati modi quaerat quod, cumque culpa voluptates nisi ratione. At ad quae nobis animi, labore consectetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, iure. Ducimus libero sed architecto corrupti ipsam reiciendis ad, laudantium, a quo mollitia in accusantium ullam neque nisi ab beatae. Cum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, commodi! Ad delectus fuga veniam ducimus quo non in quis quas ex, dolores dolorum minus architecto, autem libero ab unde atque? lorem.</p>
            </div>
            
        </div>

      </div>
    </>
      
  )
}

export default About;
