import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaHome } from "react-icons/fa"

function NotFound() {
    return (
        <div>
            <h1 className='display-1 text-center mt-5'>Oops!</h1>
            <h3 className='display-4 text-center mt-5'>Page not found!</h3>
            <div className='d-flex justify-content-center'><Link className='btn btn-info btn-lg' to='/'> <FaHome /> Go back to Home <AiOutlineArrowRight /></Link></div>
        </div>
    )
}

export default NotFound
