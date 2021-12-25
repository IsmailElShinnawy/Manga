import React, { useState } from 'react';
import { useForm } from '../../hooks/form-hook';
import Modal from '../shared/Modal/Modal';
import { Button } from '../shared/UIKit/Buttons';
import Backdrop from '../shared/Backdrop/Backdrop';
import { ReactComponent as IconPerson } from '../../assets/icons/IconPerson.svg';
import { ReactComponent as IconPlus } from '../../assets/icons/IconPlus.svg';
import { ReactComponent as IconMinus } from '../../assets/icons/IconMinus.svg';
import { ReactComponent as IconDiamond } from '../../assets/icons/IconDiamond.svg';
import { useReservation } from '../context/ReservationContext';
import { write } from '../../service/localStorage.service';

const ConfirmChooseFlight = ({
  show,
  close,
  confirm,
  cabinClass,
  adults,
  children,
  type,
}) => {
  const [showPassengersPicker, setShowPassengersPicker] = useState(false);
  const [showCabinPicker, setShowCabinPicker] = useState(false);

  const { formState, inputHandler, clearForm } = useForm(
    {
      cabin: {
        value: cabinClass || '',
        isValid: !!cabinClass,
      },
      adults: {
        value: +adults || 0,
        isValid: +adults > 0,
      },
      children: {
        value: +children || 0,
        isValid: +children > 0,
      },
    },
    !!cabinClass && (adults || 0) + (children || 0) > 0
  );
  const {
    chooseDepartureFlightCabin,
    chooseDepartureFlightPassengers,
    chooseReturnFlightCabin,
    chooseReturnFlightPassengers,
  } = useReservation();

  return (
    <Modal sm show={show} close={close}>
      <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto'>
        Confirm choosing flight
      </h1>
      <div className='flex my-3'>
        <div className='w-1/2 flex items-center relative'>
          <IconPerson />
          <input
            type='text'
            placeholder='Number of passengers'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
            value={
              formState.inputs.adults.value + formState.inputs.children.value > 0
                ? `${
                    formState.inputs.adults.value > 0
                      ? `${formState.inputs.adults.value} Adult(s) `
                      : ''
                  } ${
                    formState.inputs.children.value > 0
                      ? `${formState.inputs.children.value} Children`
                      : ''
                  }`
                : ''
            }
            readOnly
            onFocus={() => setShowPassengersPicker(true)}
          />
          {showPassengersPicker && (
            <>
              <Backdrop hide close={() => setShowPassengersPicker(false)} />
              <div className='absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <div className='w-full flex items-center mb-2'>
                  <span className='font-nunito text-grey-primary leading-5 mr-auto select-none'>
                    Adults:
                  </span>
                  <IconMinus
                    className={`ml-2 mr-2 ${
                      formState.inputs.adults.value <= 0 ? 'opacity-50' : ''
                    }`}
                    onClick={() => {
                      if (formState.inputs.adults.value > 0)
                        inputHandler('adults', formState.inputs.adults.value - 1, true);
                    }}
                  />
                  <span className='font-nunito text-grey-primary w-8 mr-2 text-center select-none'>
                    {formState.inputs.adults.value}
                  </span>
                  <IconPlus
                    onClick={() =>
                      inputHandler('adults', formState.inputs.adults.value + 1, true)
                    }
                  />
                </div>
                <div className='w-full flex items-center'>
                  <span className='font-nunito text-grey-primary leading-5 mr-auto select-none'>
                    Children:
                  </span>
                  <IconMinus
                    className={`ml-2 mr-2 ${
                      formState.inputs.children.value <= 0 ? 'opacity-50' : ''
                    }`}
                    onClick={() => {
                      if (formState.inputs.children.value > 0)
                        inputHandler(
                          'children',
                          formState.inputs.children.value - 1,
                          true
                        );
                    }}
                  />
                  <span className='font-nunito text-grey-primary w-8 mr-2 text-center select-none'>
                    {formState.inputs.children.value}
                  </span>
                  <IconPlus
                    onClick={() =>
                      inputHandler('children', formState.inputs.children.value + 1, true)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className='w-1/2 flex items-center relative'>
          <IconDiamond width='24px' height='24px' />
          <input
            type='text'
            placeholder='Choose cabin'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
            value={formState.inputs.cabin.value || ''}
            readOnly
            onFocus={() => setShowCabinPicker(true)}
          />
          {showCabinPicker && (
            <>
              <Backdrop hide close={() => setShowCabinPicker(false)} />
              <div className='flex font-nunito flex-col absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <span
                  key='economyCabin'
                  className={`${
                    formState.inputs.cabin.value === 'economy'
                      ? 'bg-primary text-white'
                      : 'hover:bg-grey-ternary hover:bg-opacity-50'
                  } mb-2 rounded-4 hover:cursor-pointer py-2 px-3`}
                  onClick={() => inputHandler('cabin', 'economy', true)}
                >
                  Economy Class
                </span>
                <span
                  key='businessCabin'
                  className={`${
                    formState.inputs.cabin.value === 'business'
                      ? 'bg-primary text-white'
                      : 'hover:bg-grey-ternary hover:bg-opacity-50'
                  } mb-2 rounded-4 hover:cursor-pointer py-2 px-3`}
                  onClick={() => inputHandler('cabin', 'business', true)}
                >
                  Business Class
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='mr-1'>
          <Button
            text='Cancel'
            outline
            onClick={() => {
              clearForm();
              close();
            }}
          />
        </div>
        <div>
          <Button
            text='Confirm'
            disabled={
              formState.inputs.adults.value + formState.inputs.children.value === 0 ||
              !formState.inputs.cabin.isValid
            }
            onClick={() => {
              if (type === 'departure') {
                chooseDepartureFlightCabin(formState.inputs.cabin.value);
                write('departureFlightCabin', formState.inputs.cabin.value);
                chooseDepartureFlightPassengers(
                  formState.inputs.adults.value + formState.inputs.children.value
                );
                write(
                  'departureFlightPassengers',
                  formState.inputs.adults.value + formState.inputs.children.value
                );
              } else {
                chooseReturnFlightCabin(formState.inputs.cabin.value);
                write('returnFlightCabin', formState.inputs.cabin.value);
                chooseReturnFlightPassengers(
                  formState.inputs.adults.value + formState.inputs.children.value
                );
                write(
                  'returnFlightPassengers',
                  formState.inputs.adults.value + formState.inputs.children.value
                );
              }
              confirm();
              clearForm();
              close();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmChooseFlight;
