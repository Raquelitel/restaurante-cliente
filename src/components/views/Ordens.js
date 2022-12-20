import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import Order from '../UI/Order';

const Ordens = () => {

  const { firebase } = useContext(FirebaseContext);
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    const getOrders = () => {
      firebase.db.collection("ordenes").where("completado", "==", false).onSnapshot(handleSnapshot);
    }


    getOrders();
  }, []);

  function handleSnapshot(snapshot) {
    const ordenes = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setOrdenes(ordenes)
  }


  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Ordens</h1>
      <div className='sm:flex sm:flex-wrap -mx-3'>
        {ordenes.map(orden => (
          <Order
            key={orden.id}
            orden={orden}
          />
        ))}
      </div>

    </>

  )
}

export default Ordens