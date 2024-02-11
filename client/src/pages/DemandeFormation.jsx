import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import SpeedDialComponent from '../components/SpeedDial'

const DemandeFormation = () => {
  return (
    <div className="h-screen w-screen">
    <NavBar />
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full mx-8 my-2 ">
        <div className="flex flex-col justify-center p-4">
        <Footer
            message=' Nous vous invitons à nous contacter pour commander une formation'
            />
        </div>
      </div>
    </div>
    <SpeedDialComponent/>
  </div>
  )
}

export default DemandeFormation
