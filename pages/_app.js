import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthState>
            <AppState>
                <Component {...pageProps} />
            </AppState>
        </AuthState>
    )
}
export default MyApp;



// NOTES file before:
// import '../styles/globals.css'
//
// function MyApp({ Component, pageProps }) {
//  return <Component {...pageProps} />
// }
//
// export default MyApp
// 