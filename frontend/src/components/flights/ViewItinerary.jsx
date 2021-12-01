
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { Button } from '../shared/UIKit/Buttons';
import FlightsPage from './FlightsPage';

function viewItinerary() {
    return(
             
<div className=' w-8/12 h-16 border-1 border-light-greenn rounded-lg px-16  mt-20 ml-16 mr-96 bg-grey-5'>
<p className =' w-12/12 font-nunito text-lg leading-5 text-light-greenn  h-5  pt-5 pb-5 pl-6, pr-12' >Your flight has been booked successfully! Your confirmation number is #381029

</p> 

<div className='text-primary font-nunito font-extrabold text-2xl  mt-10 '>
          <h1>Bon voyage, Sophia!</h1> </div>

<div className = 'font-nunito font-medium text-gray-600 mt-4  '>
<h1> Confirmation number: #381029</h1>
</div>
<div className ='font-nunito font-light text text-gray-400  text-lg mt-4'>
    <h1>Thank you for booking your travel with Manga Flights! Below is a summary of your trip to Narita airport in Tokyo, Japan. We've sent a copy of your booking confirmation to your email address. You can also find this page again in My trips. </h1>
</div>
<div className= 'font-nunito text-gray-600 font-bold h-8 mt-14'>
<h1>Flight summary</h1>
</div>
<div className='font-nunito mt-6 h-6  text-gray-600'>
    <h1>Departing February 25th, 2021</h1>
</div>
<div className=' w-full h-16 border-1  border-white  rounded-4  mt-4 ml-16 mr-96 bg-white'>
<div className=' ml-20 mt-3 h-5 text-gray-900'> <h1>12 Sep departing </h1>
     </div>
<div className='mt-1 ml-20 text h-5 text-gray-400 font-light'> <h1>12546AT2</h1>
</div>
<div className='ml-60   -mt-11 text-gray-900 h-5 '> <h1>7:00AM - 9:15AM </h1> 
<div className='ml-44 -mt-6 text-gray-900 h-5 '> <h1>Class A </h1> 
<div className ='font-nunito font-light text text-gray-400  text-sm  '> <h1>24 seats</h1></div>
<div className='ml-28  -mt-11 text-gray-900 h-5 '> <h1>$624 </h1> 
<div className ='font-nunito font-light text text-gray-400  text-sm  '> <h1>round trip</h1></div>
</div>
</div>
</div>
</div>
<div className ='font-nunito  mt-3 font-light text text-gray-400  text-sm  '> <h1>Seat 9F (economy, window), 1 checked bag</h1></div>

<div className= 'font-nunito text-gray-600  h-6 mt-14'>
<h1>Arriving March 21st, 2021 </h1> </div>
<div className=' w-full h-16 border-1  border-white  rounded-4  mt-4 ml-16 mr-96 bg-white'>
<div className=' ml-20 mt-3 h-5 text-gray-900'> <h1>12 Sep departing </h1>
     </div>
<div className='mt-1 ml-20 text h-5 text-gray-400 font-light'> <h1>12546AT2</h1>
</div>
<div className='ml-60   -mt-11 text-gray-900 h-5 '> <h1>7:00AM - 9:15AM </h1> 
<div className='ml-44 -mt-6 text-gray-900 h-5 '> <h1>Class A </h1> 
<div className ='font-nunito font-light text text-gray-400  text-sm  '> <h1>24 seats</h1></div>
<div className='ml-28  -mt-11 text-gray-900 h-5 '> <h1>$624 </h1> 
<div className ='font-nunito font-light text text-gray-400  text-sm  '> <h1>round trip</h1></div>
</div>
</div>
</div>
</div>
<div className ='font-nunito  mt-3 font-light text text-gray-400  text-sm  '> <h1>Seat 4F (business, window), 1 checked bag</h1></div>

<div className= 'font-nunito text-gray-600 font-bold text-lg h-8 mt-14'><h1>Price breakdown</h1></div>
<div className='w-full grid grid-cols-2 border-b-1 border-pale-purple last:border-b-0 py-3 px-4  '>
      <div className='col-span-1  mt-6 font-light text-gray-400 text-lg'> <h1>Departing Flight</h1> </div>
      <div className='col-span-1 font-light text-gray-400 text-lg ml-6 mt-6'><h1>$251.0</h1></div>
      <div className='col-2-span-1 mt-6 font-light text-gray-400 text-lg'> <h1>Arriving Flight</h1> </div>
      <div className='col-2-span-2 font-light text-gray-400 text-lg ml-6 mt-6'><h1>$251.0</h1></div>
      
      <div className=' font-nunito mt-6 text-gray-900 text-lg'> <h1>Amount paid</h1></div>
      <div className=' font-nunito mt-6 ml-6 text-gray-900 text-lg'> <h1>$503.0</h1> </div>
    </div>
    
    
    
</div> 



    )
};


export default viewItinerary;