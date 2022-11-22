import { Routes, Route } from "react-router"

import firebase, { FirebaseContext } from './firebase';

import Sidebar from "./components/UI/Sidebar";
import Menu from "./components/views/Menu";
import NewPlate from "./components/views/NewPlate";
import Ordens from "./components/views/Ordens";
import { useEffect } from "react";



function App() {

  return (
    <FirebaseContext.Provider
    value={{
      firebase
    }}
    >
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Ordens />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/new-plate" element={<NewPlate />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>

  )
}

export default App;
