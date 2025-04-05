import React from 'react'
import Navigation from '../components/navigation';

const About = () => {
  return (
      <>

      <Navigation />

      <div className='flex flex-col min-h-screen py-15 px-5 bg-bg-color'>

        <div className='mt-10 text-center' data-aos="fade-down" data-aos-duration="2000">
            <h2 className='text-3xl text-accent-color font-lora'>About us</h2>
            <p className='text-sm text-text-color'>Knowing more about us</p>
        </div>

        <p className='text-center font-semibold text-accent-color mt-20 text-lg' data-aos="fade-down" data-aos-duration="2000">Our Story</p>
        
        <div className='flex flex-col md:flex-row items-center justify-center gap-x-5 md:gap-x-20 mt-5'>

            <div data-aos="fade-right" data-aos-duration="2000">
              <img src="/about-img.avif" alt="cookies-image" className='rounded-md shadow-sm shadow-orange-200 w-70 h-60 object-cover md:w-70 md:h-100 md:object-center'/>
            </div>

            <div data-aos="fade-left" data-aos-duration="2000">
                <p className='w-full max-w-xs text-text-color text-justify mt-3'>It started at Ovenly Hazel with just a simple, genuine love of baking cookies that infuse happiness and warmth in every bite. It began as a small test kitchen in someone's home but soon blossomed into a well-loved neighborhood staple, rich in flavors, using only high-quality ingredients, and baked by hand to perfection.

                Spurred on by the warm scent of freshly baked cookies, we embarked on our mission to design a shop in which each cookie has a tale to tell. From traditional chocolate chip to unique flavor combinations, we make every treat with care and devotion so that each consumer can taste the delight of home-baked freshness.

                At Ovenly Hazel, we don't just believe in baking, we craft moments of pleasure, nostalgia, and joy, one cookie at a time.
                </p>
            </div>
            
        </div>

      </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-x-5 md:gap-x-20 mt-5 pb-5'>
            <div data-aos="fade-left" data-aos-duration="2000">
              <p className='w-full max-w-xs text-text-color text-justify mt-3'>As our passion for baking grew, so did our dedication to delivering cookies that not only satisfy cravings but also bring people together. Every batch we create is made with love, patience, and the goal of delivering a taste of warmth and comfort. We believe that a great cookie isn’t just about its ingredients it’s about the memories and smiles that come with each bite. 

              From the very first moment the dough is mixed to the final golden-brown perfection, each step of our process is handled with care. We pour our hearts into every cookie, ensuring that they are not just delicious but also a reminder of the simple joys in life. Our journey continues as we explore new flavors, expand our community, and share our love for baking with even more people.
              </p>
            </div>
            <div data-aos="fade-right" data-aos-duration="2000">
              <img src="cookies2.avif" alt="cookies2" className='rounded-md shadow-sm shadow-orange-200 w-70 h-60 object-cover md:w-70 md:h-100 md:object-center'/>
            </div>
        </div>
    </>
      
  )
}

export default About;
