import React, { useRef } from 'react'
import { addGames } from '../api/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const AddGame = () => {
    const nameRef = useRef('')
    const priceRef = useRef(0)
    const descriptionRef = useRef('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let game = {
            name: nameRef.current.value,
            price: parseInt(priceRef.current.value,10),
            description: descriptionRef.current.value
        }
        console.log(game)
        try {
            const response = await addGames(game)
            if (response.status === 200) {
                navigate('/')
                toast.success("Game Added !")
            }

        } catch (error) {
            toast.error("Game Add failed !")
        }

    }

    return (
        <div className='h-[90vh] w-screen flex justify-center items-center'>
            <div className='h-[38vh] w-[30vw] flex justify-center items-center flex-col bg-amber-50/10 rounded-s-md shadow-md'>
                <div className='h-[20%] w-full flex justify-center items-center font-bold text-3xl text-purple-500 '>
                    Add Game
                </div>
                <form className='h-[75%] w-[80%] flex flex-col justify-center items-center gap-3' onSubmit={handleSubmit}>
                    <input ref={nameRef} type="text" name="title" id="title" placeholder='Title' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <input ref={priceRef} type="number" name="price" id="price" placeholder='Price' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <input ref={descriptionRef} type="text" name="description" id="description" placeholder='Description' className=' bg-white p-2 w-full border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-purple-600 shadow-sm focus:shadow-lg' />
                    <button type='submit' className='p-2 w-full bg-purple-600 hover:bg-purple-400 text-white rounded-sm font-semibold'> Add Game </button>
                </form>
            </div>
        </div>
    )
}

export default AddGame