import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: null
    }

    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }
        // Limpia la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Autenticar usuarios
    const iniciarSesion = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
            });
        }

        // Limpia la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Retorne el usuario autenticado en base al jwt
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    // Cerrar la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return (
        <AuthContext.Provider
            value={{ 
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion        
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;





// NOTES
// console.log(datos);
// USUARIO_AUTENTICADO,
// no sale las alertas de "usuario creado correctamente" ni "el usuario ya esta registrado", etc..
// localStorage.getItem('token'),
// // Usuario autenticado
// const usuarioAutenticado = nombre => {
//    dispatch({
//        type: USUARIO_AUTENTICADO,
//        payload: nombre
//    })
// }
// console.log('Cerrando sesión...');
// console.log(respuesta);
// console.log(respuesta.data.usuario);
// console.log('Revisando...');
/*
    Este archivo no esta en orden al de udemy por saltos inecesarios del codigo
    payload: error.response.data.msg    Me pregunto como mejorar este bloque de codigo en un trycatch, a veces no pongo payload en todos los types
*/