import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';

const CrearCuenta = () => {

  // Acceder al state
  const authContext = useContext(AuthContext);
  const { mensaje, registrarUsuario } = AuthContext;

  // Formulario y validacion con formik y yup
  const formik = useFormik({
      initialValues: {
        nombre: '',
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
          nombre: Yup.string().required('El nombre es obligatorio'),
          email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
          password: Yup.string().required('El password no puede ir vacío').min(6, 'El password debe contener al menos 6 caracteres')
      }),
      onSubmit: valores => {
          registrarUsuario(valores);
      }
  });


  return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>

            { mensaje && <Alerta /> }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                      className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                      onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                              className="block text-black text-sm font-bold mb-2"
                              htmlFor="nombre"
                            >Nombre</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                placeholder="Nombre del usuario"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.nombre && formik.errors.nombre ? (
                              <div className="my-2 bg-gray-200 border-l-4 border-green-500 text-green-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.nombre} </p>
                              </div>
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label
                              className="block text-black text-sm font-bold mb-2"
                              htmlFor="email"
                            >Email</label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Email del usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.email && formik.errors.email ? (
                              <div className="my-2 bg-gray-200 border-l-4 border-green-500 text-green-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.email} </p>
                              </div>
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label
                              className="block text-black text-sm font-bold mb-2"
                              htmlFor="password"
                            >Password</label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Password del usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.password && formik.errors.password ? (
                              <div className="my-2 bg-gray-200 border-l-4 border-green-500 text-green-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.password} </p>
                              </div>
                            ) : null }
                        </div>

                        <input 
                          type="submit"
                          className="bg-green-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
                          value="Crear tu cuenta"
                        />
                    </form>
                </div>
            </div>
          </div>
      </Layout>
  );
}

export default CrearCuenta;





// NOTES
// npm i formik yup
// npm i formik, y resolvimos el bug porque el package.json no lo leia e instalaba asi que solo puse npm i formik en el cmd
// "formik": "^2.2.9"
// Este archivo no esta en orden con el archivo crear-cuenta de udemy ya que hace saltos inecesarios en el codigo que solamente confunde
// useEffect(() => {
//   setTimeout(() => {
//    usuarioAutenticado('Carlos');
//   }, 3000);
// }, []);
// const { usuarioAutenticado, token } = authContext;
// 