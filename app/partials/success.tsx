import React from 'react';

interface FormData {
    fullName: string;
    nric: string;
    podNo: number;
    bookingDate: Date;
    podLocation: string;
    bookingDuration: string;
}

export default ({formData}: { formData: FormData }): JSX.Element => (
    <div className='flex justify-center mt-5'>
        <div className='w-full sm:w-3/4 md:w-1/2 lg:w-2/5'>
            <h1 className='text-2xl text-center underline font-semibold'>Your Booking Details</h1>
            <table className='table table-zebra'>
                <tbody>
                <tr>
                    <td>Full Name</td>
                    <td>{formData.fullName}</td>
                </tr>
                <tr>
                    <td>NRIC/FIN</td>
                    <td>{formData.nric.toUpperCase()}</td>
                </tr>
                <tr>
                    <td>Pod Number</td>
                    <td>{formData.podNo}</td>
                </tr>
                <tr>
                    <td>Booking Date</td>
                    <td>{formData.bookingDate.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Pod Location</td>
                    <td>{formData.podLocation}</td>
                </tr>
                <tr>
                    <td>Booking Duration</td>
                    <td>{formData.bookingDuration}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
);