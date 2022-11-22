import React from 'react'
import { NavLink } from 'react-router-dom'

const activeClassName=({isActive}) => (isActive ? "text-yellow-500 p-1 block hover:bg-yellow-500 hover:text-gray-800" : "text-gray-400 p-1 block hover:bg-yellow-500 hover:text-gray-800 ")

const Sidebar = () => {

  return (
    <div className="md:w-2/5 xl:w-1/5 bg-slate-700">
        <div className='p-6'>
          <p className='uppercase text-white text-2xl text-center tracking-wide font-bold'>RestauranteAPP</p>
            <p className='mt-3 text-slate-400'>Administra tu restaurante en las siguientes opciones:</p>
        </div>
        <nav className='mt-5'>
          <NavLink className={activeClassName} to="/">Órdenes</NavLink>
          <NavLink className={activeClassName} to="/menu">Menú</NavLink>
        </nav>
    </div>
  )
}

export default Sidebar