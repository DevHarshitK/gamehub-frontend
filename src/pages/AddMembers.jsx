import React from 'react'

const AddMembers = () => {
    return (
        <div className='h-[90vh] w-screen flex justify-center items-center'>
            <div className='h-[38vh] w-[30vw] flex justify-center items-center flex-col bg-amber-50/10 rounded-s-md shadow-md'>
                <div className='h-[20%] w-full flex justify-center items-center font-bold text-3xl text-purple-500 '>
                    Add Member
                </div>
                <form className='h-[75%] w-[80%] flex flex-col justify-center items-center gap-3'>
                    <input type="text" name="name" id="name" placeholder='Name' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <input type="number" name="phone" id="price" placeholder='Phone' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <input type="number" name="fee" id="fee" placeholder='Amount' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <button type='submit' className='p-2 w-full bg-purple-600 hover:bg-purple-400 text-white rounded-sm font-semibold'> Add Member </button>
                </form>
            </div>
        </div>
    )
}

export default AddMembers