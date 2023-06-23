import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./navbar.css"
import { useAppContext } from '../../contexts/AppContext'

export const Navbar = () => {

  const {state, dispatch} = useAppContext()

  const [ input, setInput] = useState("");
 
  return (
    <nav className='navbar'>
        <div className='nav-links'>
        <label>
          {" "}
          Search:
          <input onChange={(e) => setInput(e.target.value)} />
          <button onClick={() => dispatch({ type: "SEARCH", payload: input })}>
            {" "}
            Search
          </button>
        </label>
        </div>

      

    </nav>
  )
}
