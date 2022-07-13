import React from 'react';
import Head from 'next/head';
import Header from './Header';


const Layout = ({children}) => {
    return ( 
        <>
            <Head>
                <title>GaiaSend</title>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}
                    </main>
                </div>
            </div>
            
        </>
    );
}

export default Layout;






// NOTES
// {children}
// <img src="logo.png" alt="logo" />
// <Image 
//     width={100}
//     height={100}
//     alt="logo"
//     layout="fixed"
//     src="/logo.png"
// />
// import Image from 'next/image';
//