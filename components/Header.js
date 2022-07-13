import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import AuthContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';


const Header = () => {

    // Routing
    const router = useRouter();

    // Extraer el usuario autenticado del Storage
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    // Context de la aplicación
    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }


    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img 
                onClick={ () => redireccionar() }
                className="lg:w-20 cursor-pointer mb-8 md:mb-0"
                src="/logo.png" 
            />
            


            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hola {usuario.nombre}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={ () => cerrarSesion() }
                            >Cerrar Sesión</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-green-300 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                            </Link>
                            <Link href="/crear-cuenta">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
    );
}

export default Header;








// NOTES
// <img className="w-64 mb-8 md:mb-0" src="logo.png" />
// <img className="lg:w-20 cursor-pointer mb-8 md:mb-0" src="logo.png" />