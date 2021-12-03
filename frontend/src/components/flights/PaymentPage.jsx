import React from 'react';
import { Button } from '../shared/UIKit/Buttons';
import { Input } from '../shared/UIKit/Inputs';
import './payment.css';

const PaymentsPage = () => {
  return (
    <main className='PaymentsPage page px-24 pt-14'>
      <div className='text-primary font-nunito font-extrabold text-2xl mr-auto'>
        PaymentMetod
      </div>
      <p className='text-grey-primary font-nunito text-lg py-4'>
        Manga Flights processes your payment securely with end-to-end encryption
      </p>
      <div className='text-white font font-nunito text-lg bg-primary  px-5 py-3   rounded-4 w-1/6 '>
        <Button text='Credit Card' />
      </div>
      <div className='text-grey-primary font-nunito text-lg pt-14 pb-2 '>
        Credit Card Details
      </div>
      <div className='py-2 px-3 w-1/2'>
        <Input
          type='text'
          placeholder='Name'
          className=' placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none wi'
        />
      </div>
      <div className='py-2 px-3 w-1/2'>
        <Input
          type='text'
          placeholder='Credit Card Number'
          className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
        />
      </div>
      <div className='py-2 px-3 w-1/4'>
        <Input
          type='text'
          placeholder='Expiry Date'
          className='placeholder-shown:text-grey-secondary ml-4 flex-row outline-none'
        />
      </div>
      <div className='py-2 px-3  w-1/4'>
        <Input
          type='text'
          placeholder='CVV'
          className='  placeholder-shown:text-grey-secondary ml-4 '
          display='flex'
        />
      </div>
      <div className='text-grey-primary font-nunito text-lg pt-6 pb-2 '>
        Cancellation Policy
      </div>
      <p className='text-grey-primary font-nunito text-base py-4'>
        This flight has a flexible cancellation policy.
      </p>
      <div className='container w-2/4'>
        <Button text='Back to seat select' className=' button1' />
        <Button text='Confirm Payment' />
      </div>
    </main>
  );
};

export default PaymentsPage;
