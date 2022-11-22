import React, { useContext, useState } from 'react'
import { useFormik } from "formik"
import * as yup from 'yup';

import { FirebaseContext } from '../../firebase';
import FileUploader from "react-firebase-file-uploader";
import { useNavigate } from 'react-router';
import { async } from '@firebase/util';


const NewPlate = () => {

  const [ uploading, segUploading ] = useState(false)
  const [ progress, setProgress ] = useState(0)
  const [ urlImage, setUrlImage ] = useState("")

  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: ""
    },
    validationSchema: yup.object({
      nombre: yup.string()
                  .min(3, "Los platos deben tener al menos 3 caracteres")
                  .required("El nombre del plato es obligatorio"),
      precio: yup.number()
                  .min(1, "Debes agregar un número")
                  .required("El precio es obligatorio"),
      categoria: yup.string()
                  .required("La categoría del plato es obligatorio"),
      descripcion: yup.string()
                  .min(5, "La descripción debe ser más larga")
                  .required("La descripción del plato es obligatorio")
    }),
    onSubmit: plate => {
      try {
        plate.existencia = true
        plate.imagen = urlImage
        firebase.db.collection('productos').add(plate)
        navigate("/menu")
      } catch (error) {
        console.log(error)
      }
    }
  })

  // Function about image

  const handleUploadStart = () => {
    setProgress(0)
    segUploading(true)
  }

  const handleUploadError = error => {
    segUploading(false)
    console.log(error);
  }

  const handleUploadSuccess = async nombre => {
    setProgress(100)

    setTimeout(() => {
      segUploading(false)
    },2000)
   

    const url = await firebase.storage.ref("productos").child(nombre).getDownloadURL()
    setUrlImage(url)
  }

  const handleProgress = progress => {
    setProgress(progress)
  }

  return (
    <>
    <h1 className='text-3xl font-light mb-4'>Agregar plato</h1>
    <div className='flex justify-center mt-10'>
      <div className="w-full max-w-3xl">
        <form
          onSubmit={formik.handleSubmit}
        >
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre' >Nombre</label>
            <input className='w-full py-2 px-3 shadow appearance-none border rounded text-gray-700 leading-right ffocus:outline-none focus:shadow-outline '
            id="nombre"
            type="text"
            placeholder="Nombre del Plato"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
          </div>

          { formik.touched.nombre && formik.errors.nombre ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role="alert">
              <p className='font-bold'>Hubo un error:</p>
              <p>{formik.errors.nombre}</p>
            </div>
          ) : null }

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio' >Precio</label>
            <input className='w-full py-2 px-3 shadow appearance-none border rounded text-gray-700 leading-right ffocus:outline-none focus:shadow-outline '
            id="precio"
            type="number"
            placeholder="€"
            min="0"
            value={formik.values.precio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
          </div>

          { formik.touched.precio && formik.errors.precio ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role="alert">
              <p className='font-bold'>Hubo un error:</p>
              <p>{formik.errors.precio}</p>
            </div>
          ) : null }

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='categoria' >Categoría</label>
            <select
              className='w-full py-2 px-3 shadow appearance-none border rounded text-gray-700 leading-right ffocus:outline-none focus:shadow-outline '
              id="categoria"
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
              <option value="">--Seleccione--</option>
              <option value="desayuno">--Desayuno--</option>
              <option value="almuerzo">--Almuerzo--</option>
              <option value="cena">--Cena--</option>
              <option value="bebida">--Bebida--</option>
              <option value="postre">--Postre--</option>
              <option value="ensalada">--Ensalada--</option>
            </select>
          </div>

          { formik.touched.categoria && formik.errors.categoria ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role="alert">
              <p className='font-bold'>Hubo un error:</p>
              <p>{formik.errors.categoria}</p>
            </div>
          ) : null }

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='imagen' >Imagen</label>
            <FileUploader 
              accept="image/*"
              id="imagen"
              name="imagen"
              randomizeFilename
              storageRef={firebase.storage.ref("productos")}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
            />
          </div>

          {uploading && (
            <div className='h-12 relative w-full border'>
              <div className='absolute bg-green-500 left-0 top-0 text-white px-2 text-sm h-12 flex items-center' style={{width: `${progress}%`}}> 
                {progress} %
              </div>
            </div>
          )}

          {urlImage && (
            <p className='bg-green-500 text-center text-white p-3 my-5'>La imagen se subió correctamente</p>
          )}

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='descripcion' >Descripción</label>
            <textarea className='w-full py-2 px-3 shadow appearance-none border rounded text-gray-700 leading-right ffocus:outline-none focus:shadow-outline h-40'
            id="descripcion"
            placeholder="Descripción del plato"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
            </textarea>
          </div>

          { formik.touched.descripcion && formik.errors.descripcion ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role="alert">
              <p className='font-bold'>Hubo un error:</p>
              <p>{formik.errors.descripcion}</p>
            </div>
          ) : null }

          <input 
            type="submit"
            className='w-full mt-5 p-2 bg-gray-800 hover:bg-gray-900 text-white font-bold uppercase'
            value="agregar plato"
          />
        </form>

      </div>

    </div>
    </>
  )
}

export default NewPlate