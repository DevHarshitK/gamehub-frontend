import { Loader, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { deleteGames, getGames } from '../api/api'
import { toast } from 'sonner'

const Games = () => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchGames() {
        try {
            const response = await getGames()
            if (response.status === 200) {
                setGames(response.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteGames(id)
            if (response.status === 200) {
                toast.success("Game Deleted !")
                fetchGames()
            }
        } catch (error) {
            toast.error("failed to delete !")
        }

    }
    useEffect(() => {
        fetchGames()
    }, [])


    if (loading) {
        return (
            <div className='h-[90vh] w-screen flex justify-center items-center'>
                <Loader className='h-8 w-8 animate-spin' />
            </div>
        )
    }
    return (
        <div className='h-[90vh] w-screen flex justify-start items-center flex-col'>
            <div className='w-[90%] p-1 h-10 mt-2  border-2 border-purple-500 shadow-lg font-bild text-2xl text-center text-purple-600'>
                Games Table
            </div>
            {games.length === 0 ?
                (
                    <p className=' w-full mt-6 text-center'> No games available</p>
                ) : (

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
                            {games.map((game, index) => (
                                <tr className='p-2' key={index}>
                                    <td>{game.name}</td>
                                    <td> {game.price} </td>
                                    <td>{game.description}</td>
                                    <td>
                                        <button onClick={() => handleDelete(game.id)}>
                                            <Trash2 className='text-red-500' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                )

            }
        </div>
    )
}

export default Games