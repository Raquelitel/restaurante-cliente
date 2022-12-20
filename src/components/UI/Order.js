import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase'

const Order = ({orden}) => {

    const  [ timeSend, settimeSend ] = useState(0)
    const {firebase} = useContext(FirebaseContext)

    const defineTime = id => {
        try {
            firebase.db.collection("ordenes")
                .doc(id)
                .update({
                    tiempoentrega: timeSend
                })
        } catch (error) {
            console.log(error)
        }
    }

    const completeOrder = id => {
        try {
            firebase.db.collection("ordenes")
            .doc(id)
            .update({
                completado: true
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-1/2 px-2 mb-4'>
        <div className='p-3 shadow-md bg-white'>
            <h1 className='text-yellow-600 text-lg font-bold'>{orden.id}</h1>
            {orden.orden.map(plate => (
                <p className='text-gray-600'>{plate.cuantity} {plate.nombre}</p>
            ))}
            <p className='text-gray-700 font-bold'>Total a pagar: {orden.total} € </p>

            {orden.tiempoentrega === 0 && (
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Tiempo de entrega</label>
                    <input 
                        type="number"
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight text-gray-700 focus:outline-none focus:shadow-outline'
                        min="1"
                        max="60"
                        placeholder="60"
                        value={timeSend}
                        onChange={ e => settimeSend(parseInt(e.target.value))}
                    />
                    <button 
                        type='submit'
                        className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
                        onClick={ () => defineTime(orden.id) }
                        
                        >
                            Definir Tiempo
                    </button>
                </div>
            )}
            {orden.tiempoentrega > 0 && (
                <p className='text-gray-700'>Tiempo de entrega:
                    <span className='font-bold'> {orden.tiempoentrega} minutos</span>
                </p>
            )}
            {!orden.completado &&  orden.tiempoentrega > 0 && (
                <button
                    type='button'
                    className='bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold'
                    onClick={() => completeOrder(orden.id)}
                >
                    Marcar como lista
                </button>
            ) }
        </div>
    </div>
  )
}

export default Order