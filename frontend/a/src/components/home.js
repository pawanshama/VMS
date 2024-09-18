import React,{Component} from 'react'
import Navbar from '../navbar/navbar'
// import ownerStaff from '../homeFolder/ownerStaff'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
        <Link to="Lead">Lead / Owner </Link>
        <Link to="Staff">Staff / Employee </Link>
    </div>
  )
}

export default Home
