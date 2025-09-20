import { Trash2 } from 'lucide-react'
import React from 'react'

const Members = () => {
    return (

        <div className='h-[90vh] w-screen flex justify-start items-center flex-col'>
            <div className='w-[90%] p-1 h-10 mt-2  border-2 border-purple-500 shadow-lg font-bild text-2xl text-center text-purple-600'>
                Members Table
            </div>

            <table className='w-[90%] border-2 border-purple-500 shadow-lg mt-4'>
                <thead className='bg-purple-600 font-semibold text-white text-left'>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='p-2'>
                        <td>Test Game 2</td>
                        <td> 100 </td>
                        <td>Test Game</td>
                        <td>
                            <Trash2 className='text-red-500' />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Members