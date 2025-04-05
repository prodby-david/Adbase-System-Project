import React from 'react'
import Navigation from '../components/navigation';

const FAQ = () => {
  return (

    <>
    <Navigation />


    <div className='flex flex-col items-center justify-center min-h-screen'>

        <div data-aos="fade-right" data-aos-duration="2000">
            <h1 className='text-lg md:text-xl lg:text-3xl font-semibold text-accent-color mt-30 mb-10'>Frequently Asked Questions</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-5 pb-10' data-aos="fade-down" data-aos-duration="2000">

            <div>
                <h2 className='text-md lg:text-lg font-semibold text-accent-color'>What is Ovenly Hazel?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>Ovenly Hazel is a homegrown cookie shop that specializes in handcrafted, freshly baked cookies made from high-quality ingredients.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>Do you offer gift packaging?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>Yes! We have special gift packaging for birthdays, holidays, and special occasions.</p>
            </div>

            <div>
                <h2  className='text-md lg:text-lg  font-semibold text-accent-color'>How do I place an order?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>You can order through our website, social media, or visit our store in person.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>Do you offer same-day delivery?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>Yes! Orders placed before 1pm can be delivered on the same day.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>What are the delivery areas and fees?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>We deliver within Metro Manila. Delivery fees depend on your location and will be calculated at checkout.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>Can I cancel my order?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>You can cancel your order within 3 hours, but once it's in production, we cannot cancel it.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>What payment methods do you accept?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>We accept cash, credit/debit cards, GCash, and online bank transfers.</p>
            </div>

            <div>
                <h2 className='text-md lg:text-lg  font-semibold text-accent-color'>How long does delivery take?</h2>
                <p className='mt-3 text-text-color max-w-[500px] text-sm md:text-md lg:text-base'>Orders within Metro Manila usually arrive within 1 to 2 hours.</p>
            </div>

        </div>
      
    </div>
    </>
  )
}

export default FAQ;
