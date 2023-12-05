import Image from "next/image";

/**
 * Renders the home page of the CoDriver application.
 *
 * @returns {JSX.Element} The rendered HTML code for the home page.
 */
export default function Home(): JSX.Element {
    return (
        <div className='hero min-h-screen bg-neutral-content'>
            <div className='hero-content flex-col lg:flex-row'>
                <Image
                    src='/img/library.jpg'
                    alt='Image'
                    className='max-w-sm rounded-lg shadow-2xl'
                    width={200} height={200}
                />
                <div className='text-center lg:text-left'>
                    <h1 className='text-5xl font-bold'>Welcome to Library XYZ!</h1>
                    <p className='py-6'>Your destination for reserving pod spaces.</p>
                    <a className='btn btn-primary' href='/book'>
                        Book Now!
                    </a>
                </div>
            </div>
        </div>
    );
}
