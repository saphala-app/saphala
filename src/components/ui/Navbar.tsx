import React from 'react'
import { ModeToggle } from '../common/mode-toggle'

const Navbar = () => {
  return (
    <div className="flex justify-between m-5 px-12">
        <h1 className="text-xl ">Saphala App</h1>
        <ModeToggle/>
    </div>
  )
}

export default Navbar
