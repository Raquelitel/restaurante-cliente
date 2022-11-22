import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase';
import Plate from '../UI/Plate';


const Menu = () => {

  const [plates, setPlates] = useState([])
  const { firebase } = useContext(FirebaseContext);


  useEffect(() => {
    const getPlate = () => {
      // .onSnapshot() para ver los cambios en tiempo real y .get() para no tiempo real
      firebase.db.collection("productos").onSnapshot(handleSnapshot)
    }
    getPlate()
  }, [])

  function handleSnapshot(snapshot) {
    const plates = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }

    });
    setPlates(plates)
  }

  return (
    <>
      <div>Menu</div>
      <Link to="/new-plate" className='bg-sky-800 hover:bg-sky-700, inline-block mb-5 p-2 text-white uppercase font-bold '>
        Agregar Plato
      </Link>

      {plates.map(plate => (
      
      <Plate
        key={plate.id}
        plate={plate}
      /> 
      ))}
    </>

  )
}

export default Menu