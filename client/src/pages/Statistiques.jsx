import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import SpeedDialComponent from '../components/SpeedDial'

const Statistiques = () => {
  return (
    <div className="h-screen w-screen">
    <NavBar />
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full mx-8 my-2 ">
      </div>
    </div>
    <SpeedDialComponent />
  </div>
  )
}

export default Statistiques
