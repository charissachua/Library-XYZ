'use client';
import axios from 'axios';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {isValidNricFin, roundDate} from '@/app/Utils';
import Success from '@/app/partials/success';

/**
 * Login component handles user login functionality.
 *
 * @returns The rendered Login page.
 */
export default () => {
    // Constants
    const podOptions = Array.from({length: 8}, (_, index) => index + 1);
    const podLocationList = ['Red Room', 'Blue Room', 'Green Room', 'Yellow Room', 'Purple Room', 'Orange Room', 'Pink Room', 'Brown Room'];

    // Initialize the form data using the useState hook
    const [formData, setFormData] = useState({
        fullName: '',
        nric: '',
        podNo: 0,
        podLocation: '',
        bookingDuration: '',
        captcha: false,
        success: false
    });
    const [error, setError] = useState('');
    const [bookingDate, setBookingDate] = useState(roundDate(new Date()));

    // Update the form data when the user types
    const updateForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (e.target.name === 'podNo') {
            setFormData({
                ...formData,
                podNo: parseInt(e.target.value),
                podLocation: podLocationList[Math.floor(Math.random() * podLocationList.length)]
            });
        }
    };

    // Event handler for updating bookingDate
    const handleBookingDateChange = (date: Date) => {
        if (date) setBookingDate(roundDate(new Date(date)));
    };

    // When the user submits the form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.captcha) {
            setError('Please complete the captcha.');
            return;
        } else if (!formData.fullName || !formData.nric || formData.podNo === 0 || !bookingDate || !formData.bookingDuration) {
            setError('Please fill in all the fields.');
            return;
        } else if (!isValidNricFin(formData.nric)) {
            setError('Please enter a valid NRIC/FIN.');
            return;
        }
        try {
            const response = await axios.post('/api/book', {...formData, bookingDate});
            if (response.status !== 200) {
                setError(response.data);
                return;
            }
            setFormData({...formData, success: true});
        } catch (err) {
            setError('Unable to submit form. Please try again later.');
            console.error('Unable to submit form: ', err);
        }
    };

    if (formData.success) {
        return <div className='overflow-hidden'><Success formData={{...formData, bookingDate}}/></div>;
    }
    return (
        <div className='flex justify-center'>
            <form className='p-2 w-full max-w-md' onSubmit={handleSubmit} noValidate>
                <h5 className='text-lg pb-2 text-center mt-6 mb-7'>Sign In</h5>
                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='text'
                        name='fullName'
                        id='fullName'
                        onChange={updateForm}
                        className='block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        autoComplete='off'
                    />
                    <label
                        htmlFor='fullName'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Full Name
                    </label>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='text'
                        name='nric'
                        id='nric'
                        onChange={updateForm}
                        className='block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        autoComplete='off'
                    />
                    <label
                        htmlFor='nric'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        NRIC/FIN
                    </label>
                </div>
                <div className='relative z-0 w-full mb-6'>
                    <label className='block text-gray-500 text-sm mb-1'>Select Pod Number:</label>
                    <select
                        className='select select-bordered w-full max-w-xs bg-transparent'
                        onChange={updateForm}
                        name='podNo'
                        value={formData.podNo}
                    >
                        <option disabled value='0'>Select Pod</option>
                        {podOptions.map((pod) => (
                            <option key={pod} value={pod}>
                                Pod {pod}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='relative z-0 w-full mb-6'>
                    <label className='block text-gray-500 text-sm mb-1'>Select Date & Time:</label>
                    <DatePicker
                        disabledKeyboardNavigation
                        selected={bookingDate}
                        onChange={handleBookingDateChange}
                        showTimeSelect
                        popperPlacement='left'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        className='border rounded-md px-4 py-2 bg-transparent focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>
                <div className='relative z-0 w-full mb-4'>
                    <label className='block text-gray-500 text-sm mb-1'>Select Duration:</label>
                    <select className='select select-bordered w-full max-w-xs mb-2 bg-transparent' onChange={updateForm}
                            name='bookingDuration'
                            value={formData.bookingDuration}>
                        <option disabled value=''>Select Duration</option>
                        <option value='30 minutes'>30 minutes</option>
                        <option value='1 hour'>1 hour</option>
                        <option value='1.5 hours'>1.5 hours</option>
                        <option value='2 hours'>2 hours</option>
                    </select>
                </div>
                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        disabled
                        type='text'
                        name='podLocation'
                        id='podLocation'
                        onChange={updateForm}
                        className='block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        value={formData.podLocation}
                    />
                    <label
                        htmlFor='podLocation'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Pod Location
                    </label>
                </div>
                <div className='mb-4'>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                        onChange={() => setFormData({...formData, captcha: true})}
                        onExpired={() => setFormData({...formData, captcha: false})}
                    />
                </div>
                <div className='text-error mb-4 font-semibold'>{error ? `Error: ${error}` : ''}</div>
                <button className='btn btn-primary w-full' type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
}
