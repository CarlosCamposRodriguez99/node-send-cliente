import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Alerta = () => {

    // Extraer mensaje de error para usuarios
    const authContext = useContext(AuthContext);
    const { mensaje } = authContext;

    // Extraer el mensaje de error de archivos
    const AppContext = useContext(appContext);
    const { mensaje_archivo } = AppContext;
    
    return ( 
        <div className="bg-green-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            { mensaje || mensaje_archivo }
        </div>
    );
}

export default Alerta;