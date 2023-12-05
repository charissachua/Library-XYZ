import {NextRequest, NextResponse} from 'next/server';
import {isValidNricFin} from "@/app/Utils";
import {insertData} from "@/app/Database";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json(); // Get the request body
        // Check if captcha is completed
        if (!formData.captcha) {
            return new NextResponse('Please complete the captcha.', {status: 400});
        }
        // Check if required fields are filled
        if (!formData.fullName || !formData.nric || !formData.podNo || !formData.bookingDate || !formData.bookingDuration) {
            return new NextResponse('Please fill in all the fields.', {status: 400});
        }
        // Check if NRIC/FIN is valid
        if (!isValidNricFin(formData.nric)) {
            return new NextResponse('Please enter a valid NRIC/FIN.', {status: 400});
        }
        insertData(formData);
        return new NextResponse('Registration Complete.', {status: 200});
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new NextResponse('Bad Request', {status: 400});
    }
}
