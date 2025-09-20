import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-screen h-16 bg-purple-600 text-white flex flex-row justify-center items-center mt-1'>
            <div className='w-[30%] h-full flex justify-center items-center font-bold text-2xl'>
                Game Club
            </div>
            <div className='w-[70%] h-full flex justify-center items-center flex-row gap-4 font-semibold'>
                <NavLink to='/' className='h-full border-b-2 border-t-2 border-transparent flex justify-center items-center'> Games </NavLink>
                <NavLink to='/addgame' className='h-full border-b-2 border-t-2 border-transparent  flex justify-center items-center'> Add Games </NavLink>
                <NavLink to='/members' className='h-full border-b-2 border-t-2 border-transparent  flex justify-center items-center'> Members </NavLink>
                <NavLink to='/addmember' className='h-full border-b-2 border-t-2 border-transparent  flex justify-center items-center'> Add Member </NavLink>
            </div>
        </div>
    )
}

export default Navbar